import {
    addNewProduct,
    getProducts,
    getComments,
    deleteProduct,
    updateProduct,
    updateComment,
    deleteComment,
    addNewComment,
    toggleEdit
} from "../app/ProductsList"
jest.mock("../api/products-api")

describe('ProductListThunk; Each thunk should call dispatch func relevant amount of times', () => {
    test('getProductsThunk', async () => {
        const getProductsThunk = getProducts();
        const dispatch = jest.fn()
        const getState = jest.fn()
        await getProductsThunk(dispatch, getState, {})
        expect(dispatch).toBeCalledTimes(1)
    })
    test('getCommentsThunk', async () => {
        const getCommentsThunk = getComments();
        const dispatch = jest.fn()
        const getState = jest.fn()
        await getCommentsThunk(dispatch, getState, {})
        expect(dispatch).toBeCalledTimes(1)
    })
    test('addNewProductThunk', async () => {
        let product = {
            name: 'Product',
            imageURL: 'test',
            count: '2',
            description: 'Product_description',
        }
        const addNewProductThunk = addNewProduct(product);
        const dispatch = jest.fn()
        const getState = jest.fn()
        await addNewProductThunk(dispatch, getState, {})
        expect(dispatch).toBeCalledTimes(2)
    })
    test('deleteProductThunk', async () => {
        const deleteProductThunk = deleteProduct(1);
        const dispatch = jest.fn()
        const getState = jest.fn()
        await deleteProductThunk(dispatch, getState, {})
        expect(dispatch).toBeCalledTimes(2)
    })
    test('updateProduct', async () => {
        let product = {
            id: 1,
            imageUrl: 'testUrl',
            name: 'Test',
            description: "Product_description",
            count: 1,
        }
        const updateProductThunk = updateProduct(product.id, product.imageUrl, product.name, product.description, product.count);
        const dispatch = jest.fn()
        const getState = jest.fn()
        await updateProductThunk(dispatch, getState, {})
        expect(dispatch).toBeCalledTimes(1)
    })
    test('updateComment', async () => {
        let comment = {
            id: 1,
            productId: 1,
            description: "Comment_description",
            date: "comment_date",
        }
        const updateCommentThunk = updateComment(comment.id, comment.productId, comment.description, comment.date);
        const dispatch = jest.fn()
        const getState = jest.fn()
        await updateCommentThunk(dispatch, getState, {})
        expect(dispatch).toBeCalledTimes(1)
    })
    test('deleteComment', async () => {
        const deleteCommentThunk = deleteComment(1);
        const dispatch = jest.fn()
        const getState = jest.fn()
        await deleteCommentThunk(dispatch, getState, {})
        expect(dispatch).toBeCalledTimes(1)
    })
    test('addNewComment', async () => {
        let comment = {
            productId: 1,
            description: 'Comment_description',
            date: 'comment_date'
        }
        const addNewCommentThunk = addNewComment(comment.productId, comment.description, comment.date);
        const dispatch = jest.fn()
        const getState = jest.fn()
        await addNewCommentThunk(dispatch, getState, {})
        expect(dispatch).toBeCalledTimes(1)
    })
    test('toggleEdit', async () => {
        const toggleEditThunk = toggleEdit(1, 1);
        const dispatch = jest.fn()
        const getState = jest.fn()
        await toggleEditThunk(dispatch, getState, {})
        expect(dispatch).toBeCalledTimes(1)
    })
})