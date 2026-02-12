import { useEffect } from 'react'
import './App.css'
import { createProduto } from './supabase/createProduto'
import { sendImageToStorage } from './supabase/sendImages'

import { resgatarTodosProdutos } from './supabase/getProdutos'
import type { ProdutoAntesDoSupabase } from './tipagem/tipo'

function App() {
  useEffect(() => {
    resgatarTodosProdutos().then((data) => {
      console.log(data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const produto: ProdutoAntesDoSupabase = {
      nome: formData.get('nome') as string,
      preco: Number(formData.get('preco')),
      descricao: formData.get('descricao') as string,
      imagem: formData.get('imagem') as File,
    }
    const data = await createProduto(produto)
    if(data){
      console.log('Produto cadastrado com sucesso!',data)
    }
  }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <input type="text" name="nome" placeholder="Nome do produto" />
            <input type="number" name="preco" placeholder="Preço do produto" />
            <input type="text" name="descricao" placeholder="Descrição do produto" />
            <input type="file" name="imagem" />
            <button type="submit">Cadastrar Produto</button>
        </form>
    </>
  )
}

export default App
