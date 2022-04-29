import { ProductType } from '../types/types';
import { productsAPI } from './../api/products-api';
import { newProductInfo } from './../components/ProductsList/Modal';
import { AppThunk } from './store';

const GET_PRODUCTS = 'GET_PRODUCTS'

const initialState = {
    products: [] as ProductType[]
};

const ProductsList = (state: InitialState = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: [...action.products]
            }
        default: return initialState
    };
};

const actions = {
    getProducts: (products: ProductType[]) => {
        return {
            type: GET_PRODUCTS,
            products
        } as const
    }
};

export const getProducts = (): AppThunk => async (dispatch) => {
    const response = await productsAPI.getProducts();
    dispatch(actions.getProducts(response))
}

export const addNewProduct = (newProduct: newProductInfo): AppThunk => async (dispatch) => {
    await productsAPI.addNewProduct(newProduct.imageURL, newProduct.name, newProduct.description, Number(newProduct.count))
    dispatch(getProducts())
}

export const deleteProduct = (id: number | undefined): AppThunk => async (dispatch) => {
    await productsAPI.deleteProduct(id);
    dispatch(getProducts())

}

export default ProductsList

type InitialState = typeof initialState
type InferValueType<T> = T extends { [key: string]: infer U } ? U : never;
type ActionsTypes = ReturnType<InferValueType<typeof actions>>; 