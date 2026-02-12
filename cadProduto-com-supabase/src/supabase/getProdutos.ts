import { supabase } from "./client";


export async function resgatarTodosProdutos() {
    try {
        const { data } = await supabase.from('produtos').select('*')
        return data
    } catch (error) {
        console.log(error)
    }

}

