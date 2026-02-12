import { StorageProvider } from "../storage-provider";
import { supabaseClient } from "@/infra/supabse";

export class UploaddImageRepository implements StorageProvider {
    async upload(params: { fileName: string; fileBuffer: Buffer; contentType: string; }): Promise<{ url: string; }> {
        
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
        return {
            url: data.path,
        }
    }
    
}