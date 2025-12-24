import {z} from 'zod'
import 'dotenv/config.js'

export const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    OPENAI_API_KEY: z.string()
})

export const env = envSchema.parse(process.env)