import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import { clientWhatsapp } from '../src/configs/config-whatsapp'
import { clientOpenAI } from './configs/config-openai'



const messages: ChatCompletionMessageParam[] = [
    {
        role: "developer", 
        content: `
                você é um professor de inglês, é responsavel por realizar  um exame de 5 perguntas para saber o nivel de ingles do aluno
                se perguntagrem alguma coisa que não seja sobre aulas de ingles ou duvidas você de responder que não tem conhecimento sobre o tema.
                `}

]

const sendToLLM = async (prompt: string) => {
    messages.push({
        role: 'user',
        content: prompt
    })
    const completetion = await clientOpenAI.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: messages as ChatCompletionMessageParam[],
    })

    return completetion.choices[0].message.content
}


clientWhatsapp.on("message", async (msg) => {
    if (msg.type === "chat") {
                const response = await sendToLLM(msg.body) as string
        setTimeout(() => {
                    msg.reply(response)
        }, 500);


    }
})
