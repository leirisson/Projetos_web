import 'dotenv/config'
import {z} from 'zod'


const envSchema = z.object({
    NODE_ENV : z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333)
})


const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.error("Erro nas variaveis de ambiente ❌ 🧮")
    throw new Error("Erro nas variaveis de ambiente ❌ 🧮")
}

export const env = _env.data