
'use server';

/**
 * @fileOverview Generates a structured lesson plan based on a topic, grade level,
 * optional lesson type, and optional learning duration.
 *
 * - generateLessonPlan - A function that handles the lesson plan generation process.
 * - GenerateLessonPlanInput - The input type for the generateLessonPlan function.
 * - GenerateLessonPlanOutput - The return type for the generateLessonPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonPlanInputSchema = z.object({
  topic: z.string().describe('The topic of the lesson plan.'),
  gradeLevel: z.string().describe('The grade level for the lesson plan.'),
  lessonType: z.string().optional().describe('The desired structure of the lesson (e.g., Direct Instruction, Project-Based).'),
  learningDuration: z.string().optional().describe('The intended duration of the lesson (e.g., 15 min, 1 hour).')
});
export type GenerateLessonPlanInput = z.infer<typeof GenerateLessonPlanInputSchema>;

const LessonMaterialSchema = z.object({
  name: z.string().describe('Name of the material (e.g., Photosynthesis Diagram, Quick Quiz).'),
  type: z.string().describe('Type of material (e.g., diagram, quiz, worksheet, video, link).'),
  link: z.string().optional().describe('A URL link to the material, if applicable.'),
  description: z.string().optional().describe('Brief description or content of the material, if no direct link.')
});

const LessonPhaseSchema = z.object({
  phase: z.string().describe('The phase of the lesson (e.g., Engage, Explain, Explore, Assess, Extend).'),
  time: z.string().describe('Allocated time for this phase (e.g., 5 min, 10 min, — for homework).'),
  activityDescription: z.string().describe('Description of the activity for this phase.')
});

const GenerateLessonPlanOutputSchema = z.object({
  topic: z.string().describe('The main topic of the lesson plan, echoed from input.'),
  gradeLevel: z.string().describe('The target grade level for the lesson plan, echoed from input.'),
  lessonType: z.string().optional().describe('The chosen type/structure for the lesson, echoed or suggested.'),
  learningDuration: z.string().optional().describe('The chosen duration for the lesson, echoed or suggested.'),
  learningObjective: z.string().describe('The primary learning objective for the lesson. (e.g., "Students will be able to...")'),
  lessonBreakdown: z.array(LessonPhaseSchema).describe('A detailed breakdown of lesson activities, timings, and phases.'),
  accessibilitySuggestions: z.array(z.string()).describe('Suggestions to make the lesson more accessible (e.g., "Caption all videos.").'),
  materials: z.array(LessonMaterialSchema).describe('A list of materials required for the lesson, including links or descriptions.')
});
export type GenerateLessonPlanOutput = z.infer<typeof GenerateLessonPlanOutputSchema>;

export async function generateLessonPlan(input: GenerateLessonPlanInput): Promise<GenerateLessonPlanOutput> {
  return generateLessonPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLessonPlanPrompt',
  input: {schema: GenerateLessonPlanInputSchema},
  output: {schema: GenerateLessonPlanOutputSchema},
  prompt: `You are an expert curriculum designer. Generate a detailed lesson plan based on the provided information.
The output MUST be a valid JSON object adhering to the schema provided for the output.

Input:
Topic: {{{topic}}}
Grade Level: {{{gradeLevel}}}
{{#if lessonType}}Lesson Type: {{{lessonType}}}{{/if}}
{{#if learningDuration}}Learning Duration: {{{learningDuration}}}{{/if}}

Instructions for JSON output structure:
1.  **topic**: Echo the provided topic: "{{{topic}}}".
2.  **gradeLevel**: Echo the provided grade level: "{{{gradeLevel}}}".
3.  **lessonType**: Echo the provided lesson type "{{{lessonType}}}". If none was provided, you may suggest a suitable one (e.g., "Direct Instruction") or omit the field if not confident.
4.  **learningDuration**: Echo the provided learning duration "{{{learningDuration}}}". If none was provided, you may suggest a suitable one (e.g., "45 minutes") or omit the field if not confident.
5.  **learningObjective**: A clear and concise learning objective. Start with "Students will be able to..." or "Students will understand...".
6.  **lessonBreakdown**: An array of objects, each representing a phase. Each object must have "phase" (string, e.g., Engage, Explain, Explore, Assess, Extend), "time" (string, e.g., 5 min, 10 min, — for homework), and "activityDescription" (string).
    *   Include at least 3-5 distinct phases.
    *   If relevant, suggest AI-generated visuals or interactive elements within activity descriptions (e.g., "Teacher presents concept using AI-generated diagram of plant cell.").
7.  **accessibilitySuggestions**: An array of at least 2-3 practical string suggestions to make the lesson accessible (e.g., "Provide captions for all videos.", "Offer a simplified vocabulary list for key terms.").
8.  **materials**: An array of objects, each representing a material. Each object must have "name" (string), "type" (string, e.g., diagram, quiz, worksheet, video, link), "link" (optional string URL, use placeholders like "placeholder://ai-generated-diagram" if actual link generation isn't possible), and "description" (optional string).
    *   If a quiz is suggested, its type should be "quiz" and name could be "AI-Generated Quiz". Mention it should be "auto-grade compatible" in its description if applicable.
    *   If a worksheet is suggested, its type could be "worksheet" and description could be "Printable worksheet (.PDF)".

Ensure the entire output is a single, valid JSON object. Do not include any text outside of this JSON object.`,
});

const generateLessonPlanFlow = ai.defineFlow(
  {
    name: 'generateLessonPlanFlow',
    inputSchema: GenerateLessonPlanInputSchema,
    outputSchema: GenerateLessonPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI failed to generate a lesson plan.");
    }
    // Ensure the core fields from input are present in the output, as requested by the prompt
    return {
        ...output,
        topic: input.topic,
        gradeLevel: input.gradeLevel,
        lessonType: output.lessonType || input.lessonType,
        learningDuration: output.learningDuration || input.learningDuration,
    };
  }
);
