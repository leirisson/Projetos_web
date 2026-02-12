import { supabase } from "./client";

import type { ProdutoAntesDoSupabase } from "../tipagem/tipo";
import { sendImageToStorage } from "./sendImages";

export async function createProduto(produto: ProdutoAntesDoSupabase) {
    try {
        if(produto.imagem){
            const url = await sendImageToStorage(produto.imagem)
            if(!url){
                console.error('Erro ao obter a url da imagem')
                return null
            }
            const ProdutoComimagem = {
                nome: produto.nome,
                valor: produto.preco,
                descricao: produto.descricao,
                imagem: url
            }

            const { data, error } = await supabase
                .from('produtos')
                .insert([ProdutoComimagem])
                .select()
            if (error) {
                console.error('Erro ao inserir produto:', error.message)
                return null
            }
            return data
        }
    } catch (error) {
        console.log('Erro ao cadastrar um produto.',error)
        return null
    }
}
