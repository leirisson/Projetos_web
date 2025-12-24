import OpenAI from "openai";
import { env } from '../env'

export const clientOpenAI = new OpenAI({ apiKey: env.OPENAI_API_KEY });


