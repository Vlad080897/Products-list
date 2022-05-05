import { ProductType } from '../types/types';
import { instance } from './api';

export const productsAPI = {
    getProducts() {
        return instance.get<ProductType[]>('/products').then(res => res.data);
    },
    getComments() {
        return instance.get('/comments').then(res => res.data);
    },
    updateComment(id: number, productId: number, description: string, date: string) {
        return instance.put(`/comments/${id}`, { productId, description, date, editMode: false }).then(res => res.data);
    },
    deleteComment(id: number) {
        return instance.delete(`/comments/${id}`).then(res => res.data);
    },
    addNewComment(productId: number, description: string, date: string) {
        return instance.post('/comments', { productId, description, date, editMode: false });
    },
    addNewProduct(imageUrl: string, name: string, description: string, count: number, comments = []) {
        return instance.post('/products', { imageUrl, name, description, count, comments }).then(res => res.data);
    },
    updateProduct(id: number, imageUrl: string, name: string, description: string, count: number) {
        return instance.put(`/products/${id}`, { imageUrl, name, description, count, comments: [] }).then(res => res.data);
    },
    deleteProduct(id: number | undefined) {
        return instance.delete(`/products/${id}`).then(res => res.data);
    }
}
