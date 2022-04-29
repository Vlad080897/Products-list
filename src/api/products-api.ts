import { ProductType } from '../types/types';
import { instance } from './api';

export const productsAPI = {
    getProducts() {
        return instance.get<ProductType[]>('/products').then(res => res.data)
    },
    addNewProduct(imageUrl: string, name: string, description: string, count: number) {
        return instance.post('/products', { imageUrl, name, description, count }).then(res => res.data)
    },
    deleteProduct(id: number | undefined) {
        return instance.delete(`/products/${id}`).then(res => res.data)
    }
}
