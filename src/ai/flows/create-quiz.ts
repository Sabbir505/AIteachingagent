'use server';

/**
 * @fileOverview Creates a quiz from a lesson plan.
 *
 * - createQuiz - A function that handles the quiz creation process.
 * - CreateQuizInput - The input type for the createQuiz function.
 * - CreateQuizOutput - The return type for the createQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateQuizInputSchema = z.object({
  lessonPlan: z.string().describe('The lesson plan to create a quiz from.'),
  numQuestions: z
    .number()
    .min(1)
    .max(20)
    .default(5) // Sensible default value
    .describe('The number of questions to generate for the quiz.'),
});
export type CreateQuizInput = z.infer<typeof CreateQuizInputSchema>;

const CreateQuizOutputSchema = z.object({
  quiz: z.string().describe('The generated quiz in JSON format.'),
});
export type CreateQuizOutput = z.infer<typeof CreateQuizOutputSchema>;

export async function createQuiz(input: CreateQuizInput): Promise<CreateQuizOutput> {
  return createQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createQuizPrompt',
  input: {schema: CreateQuizInputSchema},
  output: {schema: CreateQuizOutputSchema},
  prompt: `You are a quiz generator. You will be given a lesson plan and the number of questions to generate. Your job is to create a quiz based on the lesson plan, and return a JSON object of the following format:

{
  "questions": [
    {
      "question": "",
      "answers": [
        "",
        "",
        "",
        ""
      ],
      "correctAnswerIndex": 0
    }
  ]
}

The quiz should have the following number of questions: {{{numQuestions}}}

Here is the lesson plan:

{{{lessonPlan}}}`,
});

const createQuizFlow = ai.defineFlow(
  {
    name: 'createQuizFlow',
    inputSchema: CreateQuizInputSchema,
    outputSchema: CreateQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
