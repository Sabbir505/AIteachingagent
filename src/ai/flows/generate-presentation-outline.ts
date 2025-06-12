'use server';

/**
 * @fileOverview Generates a structured outline for a PowerPoint presentation.
 *
 * - generatePresentationOutline - A function that handles the presentation outline generation process.
 * - GeneratePresentationOutlineInput - The input type for the generatePresentationOutline function.
 * - GeneratePresentationOutlineOutput - The return type for the generatePresentationOutline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SlideSchema = z.object({
  slideTitle: z.string().describe('The title of the individual slide.'),
  slideContent: z.array(z.string()).describe('An array of bullet points or short paragraphs for the slide content.'),
  notes: z.string().optional().describe('Optional speaker notes for the slide.'),
});

export const GeneratePresentationOutlineInputSchema = z.object({
  topic: z.string().describe('The main topic of the presentation.'),
  gradeLevel: z.string().optional().describe('The target grade level for the presentation (e.g., "Grade 5", "High School Physics").'),
  numSlides: z
    .number()
    .min(3)
    .max(15)
    .default(5)
    .describe('The desired number of content slides in the presentation (excluding title and thank you/Q&A slide).'),
});
export type GeneratePresentationOutlineInput = z.infer<typeof GeneratePresentationOutlineInputSchema>;

export const GeneratePresentationOutlineOutputSchema = z.object({
  presentationTitle: z.string().describe('The overall title for the presentation.'),
  slides: z.array(SlideSchema).describe('An array of slide objects, each containing a title and content points.'),
});
export type GeneratePresentationOutlineOutput = z.infer<typeof GeneratePresentationOutlineOutputSchema>;


export async function generatePresentationOutline(input: GeneratePresentationOutlineInput): Promise<GeneratePresentationOutlineOutput> {
  return generatePresentationOutlineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePresentationOutlinePrompt',
  input: {schema: GeneratePresentationOutlineInputSchema},
  output: {schema: GeneratePresentationOutlineOutputSchema},
  prompt: `You are an expert curriculum developer tasked with creating an outline for an informative PowerPoint presentation.
The presentation should be suitable for the specified topic and grade level.

Input:
Topic: {{{topic}}}
{{#if gradeLevel}}Grade Level: {{{gradeLevel}}}{{/if}}
Number of Content Slides: {{{numSlides}}}

Instructions for JSON output structure:
1.  **presentationTitle**: A concise and engaging title for the entire presentation based on the "{{{topic}}}".
2.  **slides**: An array of slide objects. Generate content for exactly {{{numSlides}}} slides.
    *   Each slide object in the array must have:
        *   **slideTitle**: A clear and descriptive title for that specific slide.
        *   **slideContent**: An array of 2-5 brief bullet points or short paragraphs summarizing the key information for that slide. Keep content concise and easy to understand for the target {{{gradeLevel}}}.
        *   **notes** (optional): Brief speaker notes or talking points for the presenter for this slide.

Structure the presentation logically:
*   Start with an introductory slide (covered by the first slide in the array).
*   Develop the topic across the subsequent slides.
*   Conclude with a summary or key takeaways on the last slide.

Example of a single slide object in the 'slides' array:
{
  "slideTitle": "What is Photosynthesis?",
  "slideContent": [
    "Process plants use to make food.",
    "Uses sunlight, water, and carbon dioxide.",
    "Releases oxygen."
  ],
  "notes": "Define each term clearly. Maybe ask students if they know where plants get these ingredients."
}

Ensure the entire output is a single, valid JSON object adhering to the schema. Do not include any text outside of this JSON object.
Aim for informative, clear, and engaging content.
`,
});

const generatePresentationOutlineFlow = ai.defineFlow(
  {
    name: 'generatePresentationOutlineFlow',
    inputSchema: GeneratePresentationOutlineInputSchema,
    outputSchema: GeneratePresentationOutlineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate a presentation outline.');
    }
    return output;
  }
);
