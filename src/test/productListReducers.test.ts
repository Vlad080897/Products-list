import { actions } from '../app/ProductsList';
import { ProductType } from '../types/types';
import ProductsList from "../app/ProductsList";
import { CommentType } from '../types/types';

const state = {
    products: [] as ProductType[]
}

type initialState = typeof state

const newProduct: ProductType[] = [
    {
        id: 1,
        imageUrl: 'url',
        name: 'Test Product',
        count: 1,
        comments: [],
        description: 'Test description',
    },
    {
        id: 2,
        imageUrl: 'url',
        name: 'Test Product',
        count: 1,
        comments: [],
        description: 'Test description',
    },
]

const newComments: CommentType[] = [
    {
        productId: 1,
        description: "CommentForProduct1",
        date: "today at 4:26 PM",
        editMode: false,
        id: 1
    },
    {
        productId: 2,
        description: "CommentForProduct2",
        date: "today at 4:26 PM",
        editMode: false,
        id: 2
    },

]

describe('ProductListReducer', () => {
    let newState: initialState
    beforeEach(() => {
        newState = ProductsList(state, actions.getProducts(newProduct))
    })

    test('GET_PRODUCTS: should request products from API and set it in the state', () => {
        expect(newState.products.length).toBe(2)
        expect(state.products.length).toBeFalsy()
    })
    test('GET_COMMENTS: should request comment from API and set it in the relevant product', () => {
        newState = ProductsList(newState, actions.getComments(newComments))
        const productIdOne = newState.products.filter(p => p.id === 1)
        const productIdTwo = newState.products.filter(p => p.id === 2)
        expect(productIdOne[0].comments.length).toBe(1)
        expect(productIdTwo[0].comments.length).toBe(1)
    })
    test('TOGGLE_EDIT: should toggle editMode of the relevant comment', () => {
        newState = ProductsList(newState, actions.getComments(newComments))
        newState = ProductsList(newState, actions.toggleEdit(1, 1))
        newState = ProductsList(newState, actions.toggleEdit(2, 2))
        expect(newState.products[0].comments[0].editMode).toBeTruthy()
        expect(newState.products[1].comments[0].editMode).toBeTruthy()
        
        newState = ProductsList(newState, actions.toggleEdit(1, 1))
        newState = ProductsList(newState, actions.toggleEdit(2, 2))
        expect(newState.products[0].comments[0].editMode).toBeFalsy()
        expect(newState.products[1].comments[0].editMode).toBeFalsy()
    })
})
