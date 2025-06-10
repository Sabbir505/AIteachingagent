import { config } from 'dotenv';
config();

import '@/ai/flows/grade-essay.ts';
import '@/ai/flows/generate-lesson-plan.ts';
import '@/ai/flows/summarize-text.ts';
import '@/ai/flows/create-quiz.ts';