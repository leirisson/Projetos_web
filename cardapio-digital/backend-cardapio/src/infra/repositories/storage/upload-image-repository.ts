import { ParamsUpload, StorageProvider } from "../storage-provider";
import { supabaseClient } from "@/infra/supabse";
import { Buffer } from "buffer";

export class UploaddImageRepository implements StorageProvider {
    async upload(params: ParamsUpload): Promise<{ url: string; }> {
        
        const { fileName, fileBuffer, contentType } = params



        const nomeUnico = `${Date.now()}-${fileName}`


        
        const { data, error } = await supabaseClient
        .storage
        .from('imagens_products')
        .upload(nomeUnico, fileBuffer, {
            contentType,
            cacheControl: '3600',
            upsert: false,
        })
        if (error) {
            throw new Error(error.message)
        }

        // recuperam a url publica da imagem
        const { data: publicUrlData } = await supabaseClient
        .storage
        .from('imagens_products')
        .getPublicUrl(nomeUnico)

  
        return {
            url: publicUrlData.publicUrl,
        }
    }
    
}
