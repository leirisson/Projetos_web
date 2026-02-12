import  'dotenv/config'
import z from 'zod'

 /**
  * lembrar de carregar as variáveis de ambiente no arquivo .env
  * com o import 'dotenv/config'
  */
export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.coerce.string(),
  DATABASE_URL: z.coerce.string(),
  SUPABASE_URL: z.coerce.string(),
  API_KEY:  z.coerce.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
