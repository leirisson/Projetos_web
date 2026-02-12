import { supabase } from "./client";

export  function sendImageToStorage(arquivo: File) {
    try {
        const nomeUnico = `${Date.now()}-${arquivo.name}`
            supabase
            .storage
            .from('imagens_products')
            .upload(nomeUnico, arquivo)
            .then(({data, error}) => {
                if (error || !data) {
                    console.error('Erro ao fazer upload da imagem:', error.message)
                    return null
                }
                console.log(data)
            })

        const { data: publicData } = supabase
            .storage
            .from('imagens_products')
            .getPublicUrl(nomeUnico)

        const url = publicData.publicUrl
        return url
    } catch (error) {
        console.log('Erro ao enviar imagem para o storage.',error)
        return null
    }
}
