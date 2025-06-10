'use server';

/**
 * @fileOverview AI-powered essay grading flow.
 *
 * - gradeEssay - A function that grades student essays and provides feedback.
 * - GradeEssayInput - The input type for the gradeEssay function.
 * - GradeEssayOutput - The return type for the gradeEssay function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GradeEssayInputSchema = z.object({
  essay: z.string().describe('The essay text to be graded.'),
  prompt: z.string().describe('The essay prompt or question.'),
  rubric: z.string().optional().describe('Grading rubric to be used.'),
});
export type GradeEssayInput = z.infer<typeof GradeEssayInputSchema>;

const GradeEssayOutputSchema = z.object({
  grade: z.string().describe('The grade assigned to the essay.'),
  feedback: z.string().describe('Feedback on the essay.'),
});
export type GradeEssayOutput = z.infer<typeof GradeEssayOutputSchema>;

export async function gradeEssay(input: GradeEssayInput): Promise<GradeEssayOutput> {
  return gradeEssayFlow(input);
}

const gradeEssayPrompt = ai.definePrompt({
  name: 'gradeEssayPrompt',
  input: {schema: GradeEssayInputSchema},
  output: {schema: GradeEssayOutputSchema},
  prompt: `You are an AI expert in grading essays. Please provide a grade and feedback based on the essay and prompt below.

Essay Prompt: {{{prompt}}}

Essay:
{{{essay}}}

{{~#if rubric}}
Rubric:
{{rubric}}
{{~/if}}
`,
});

const gradeEssayFlow = ai.defineFlow(
  {
    name: 'gradeEssayFlow',
    inputSchema: GradeEssayInputSchema,
    outputSchema: GradeEssayOutputSchema,
  },
  async input => {
    const {output} = await gradeEssayPrompt(input);
    return output!;
  }
);
