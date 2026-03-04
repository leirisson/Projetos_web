import 'dotenv/config';
import z from 'zod';



export const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    APPWRITE_DATABASE_ID: z.string(),
    APPWRITE_COLLECTION_ID: z.string().optional(),
    APPWRITE_BUCKET_ID: z.string(),
    APPWRITE_PROJECT_ID: z.string(),
    APPWRITE_ENDPOINT: z.string(),
    APPWRITE_API_KEY: z.string(),
});

const _env = envSchema.safeParse(process.env);

if(_env.success === false){
    console.log(_env.error);
    throw new Error('Invalid environment variables');
}

export const env = _env.data;