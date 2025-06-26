
'use server';

/**
 * @fileOverview Generates a structured lesson plan based on a topic, grade level,
 * optional lesson type, and optional learning duration. Also fetches supporting visuals.
 *
 * - generateLessonPlan - A function that handles the lesson plan generation process.
 * - GenerateLessonPlanInput - The input type for the generateLessonPlan function.
 * - GenerateLessonPlanOutput - The return type for the generateLessonPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { searchImages } from '@/services/unsplash';
import { createChartUrl } from '@/services/quickchart';

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

// Internal schema for what the AI prompt will return
const AIPromptMediaSuggestionSchema = z.object({
    type: z.enum(['image', 'chart']).describe("The type of media to generate."),
    query: z.string().describe("For 'image', a search query for Unsplash (e.g., 'solar system'). For 'chart', a JSON string representing a QuickChart.io configuration (e.g., '{\"type\":\"bar\",\"data\":{\"labels\":[\"A\",\"B\"],\"datasets\":[{\"label\":\"Data\",\"data\":[10,20]}]}}')."),
    altText: z.string().describe("A descriptive alt text for the media.")
});

// Final output schema for the flow, with resolved URLs
const FinalMediaSuggestionSchema = z.object({
    type: z.enum(['image', 'chart']),
    url: z.string().url(),
    altText: z.string()
});

const AIPromptOutputSchema = z.object({
  topic: z.string().describe('The main topic of the lesson plan, echoed from input.'),
  gradeLevel: z.string().describe('The target grade level for the lesson plan, echoed from input.'),
  lessonType: z.string().optional().describe('The chosen type/structure for the lesson, echoed or suggested.'),
  learningDuration: z.string().optional().describe('The chosen duration for the lesson, echoed or suggested.'),
  learningObjective: z.string().describe('The primary learning objective for the lesson. (e.g., "Students will be able to...")'),
  lessonBreakdown: z.array(LessonPhaseSchema).describe('A detailed breakdown of lesson activities, timings, and phases.'),
  accessibilitySuggestions: z.array(z.string()).describe('Suggestions to make the lesson more accessible (e.g., "Caption all videos.").'),
  materials: z.array(LessonMaterialSchema).describe('A list of materials required for the lesson, including links or descriptions.'),
  mediaSuggestions: z.array(AIPromptMediaSuggestionSchema).optional().describe('A list of suggested media items. Generate 1-2 images and optionally one chart if the topic is data-heavy.')
});

export const GenerateLessonPlanOutputSchema = z.object({
  topic: z.string(),
  gradeLevel: z.string(),
  lessonType: z.string().optional(),
  learningDuration: z.string().optional(),
  learningObjective: z.string(),
  lessonBreakdown: z.array(LessonPhaseSchema),
  accessibilitySuggestions: z.array(z.string()),
  materials: z.array(LessonMaterialSchema),
  mediaSuggestions: z.array(FinalMediaSuggestionSchema).optional()
});
export type GenerateLessonPlanOutput = z.infer<typeof GenerateLessonPlanOutputSchema>;


export async function generateLessonPlan(input: GenerateLessonPlanInput): Promise<GenerateLessonPlanOutput> {
  return generateLessonPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLessonPlanPrompt',
  input: {schema: GenerateLessonPlanInputSchema},
  output: {schema: AIPromptOutputSchema},
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
9.  **mediaSuggestions**: An array of 1-2 media suggestions.
    *   For an 'image' type, provide a concise, effective search 'query' for Unsplash.
    *   For a 'chart' type (only if the topic is data-related), provide a valid JSON string for a QuickChart.io configuration in the 'query' field. Example: '{"type":"bar","data":{"labels":["2020","2021","2022"],"datasets":[{"label":"Population","data":[100,110,125]}]}}'.
    *   Always provide descriptive 'altText' for each item.

Ensure the entire output is a single, valid JSON object. Do not include any text outside of this JSON object.`,
});

const generateLessonPlanFlow = ai.defineFlow(
  {
    name: 'generateLessonPlanFlow',
    inputSchema: GenerateLessonPlanInputSchema,
    outputSchema: GenerateLessonPlanOutputSchema,
  },
  async (input) : Promise<GenerateLessonPlanOutput> => {
    const {output: aiOutput} = await prompt(input);
    if (!aiOutput) {
      throw new Error("AI failed to generate a lesson plan.");
    }

    const finalMediaSuggestions: z.infer<typeof FinalMediaSuggestionSchema>[] = [];
    if (aiOutput.mediaSuggestions) {
        for (const suggestion of aiOutput.mediaSuggestions) {
            let url = '';
            if (suggestion.type === 'image') {
                const imageUrls = await searchImages(suggestion.query);
                url = imageUrls[0]; // Use the first result
            } else if (suggestion.type === 'chart') {
                try {
                    const chartConfig = JSON.parse(suggestion.query);
                    url = createChartUrl(chartConfig);
                } catch (e) {
                    console.error('Failed to parse chart JSON:', e);
                    // Use a placeholder if JSON is invalid
                    url = `https://placehold.co/600x400.png?text=Invalid+Chart+Data`;
                }
            }

            if (url) {
                finalMediaSuggestions.push({
                    type: suggestion.type,
                    url: url,
                    altText: suggestion.altText,
                });
            }
        }
    }

    // Construct the final object that matches the exported output schema
    const finalOutput: GenerateLessonPlanOutput = {
        ...aiOutput,
        topic: input.topic,
        gradeLevel: input.gradeLevel,
        lessonType: aiOutput.lessonType || input.lessonType,
        learningDuration: aiOutput.learningDuration || input.learningDuration,
        mediaSuggestions: finalMediaSuggestions,
    };

    return finalOutput;
  }
);
