import { RootState } from './../app/store';
export const getProductsSelector = (state: RootState) => {
    return state.productsList.products
}