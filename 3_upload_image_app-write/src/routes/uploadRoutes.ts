import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import '@fastify/multipart'

import { Storage, ID } from 'node-appwrite'
import { InputFile } from 'node-appwrite/file'
import { client } from '../utils/appwrite';
import { env } from '../env';

const storage = new Storage(client);
const BUCKET_ID = env.APPWRITE_BUCKET_ID

export async function uploadRoutes(app: FastifyInstance) {

    app.post("/upload", async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            // 1. Pega o arquivo do form-data (campo "imagem")
            const data = await req.file()
            if (!data) {
                return reply.status(400).send({ message: 'Arquivo obrigatório' })
            }

            // 2. Lê o arquivo como Buffer
            const buffer = await data.toBuffer()

            // criando nome unico
            const uniqueFileName = `${ID.unique()}-${data.filename}`

            // 3. Cria o InputFile a partir do buffer
            const inputFile = InputFile.fromBuffer(buffer, uniqueFileName)

            // 4. Faz o upload para o Appwrite Storage
            const file = await storage.createFile(BUCKET_ID, ID.unique(), inputFile)

            return reply.status(201).send({
                fileId: file.$id,
                // URL pública para visualizar a imagem:
                url: `${env.APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${env.APPWRITE_PROJECT_ID}`
            }
            )
        } catch (error) {
            return reply.status(500).send({ message: 'Erro no upload' })
        }
    })

    app.get("/file/:fileId", async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const fileId = req.params.fileId as string
            if (!fileId) {
                return reply.status(400).send({ message: 'ID do arquivo obrigatório' })
            }
            const file = await storage.getFile(BUCKET_ID, fileId)
            return reply.status(200).send(file)
        } catch (error) {
            return reply.status(500).send({ message: 'Erro ao buscar arquivo' })
        }
    })


}
