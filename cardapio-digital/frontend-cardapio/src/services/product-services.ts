import { http } from './http'
import type { IProduct } from '../types/IProducts'

export async function getProducts() {
    const response = await http.get<IProduct[]>('/products')
    return response.data
}