import { CommentType } from './../types/types';
import { ProductType } from '../types/types';
import { productsAPI } from './../api/products-api';
import { newProductInfo } from '../components/ProductsList/ModalAddProduct';
import { AppThunk } from './store';

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_COMMENTS = 'GET_COMMENTS';
const TOGGLE_EDIT = 'TOGGLE_EDIT';

const initialState = {
  products: [] as ProductType[]
};

const ProductsList = (state: InitialState = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: [...action.products].sort((p1, p2) => p1.name.localeCompare(p2.name))
      }
    case GET_COMMENTS:
      return {
        ...state,
        products: [...state.products].map(product => {
          product = { ...product }
          const sortedComments = action.comments.filter(comment => comment.productId === product.id)
          product.comments = [...sortedComments]
          return product
        })
      }
    case TOGGLE_EDIT:
      return {
        ...state,
        products: [...state.products].map(product => {
          if (product.id === action.productId) {
            product = { ...product }
            product.comments = [...product.comments].map(comment => {
              if (comment.id === action.commentId) {
                return { ...comment, editMode: !comment.editMode }
              }
              return comment
            })
          }
          return product
        })
      }

    default: return initialState
  };
};

export const actions = {
  getProducts: (products: ProductType[]) => {
    return {
      type: GET_PRODUCTS,
      products
    } as const
  },
  getComments: (comments: CommentType[]) => {
    return {
      type: GET_COMMENTS,
      comments
    } as const
  },
  toggleEdit: (productId: number, commentId: number) => {
    return {
      type: TOGGLE_EDIT,
      productId,
      commentId,
    } as const
  }
};

export const getProducts = (): AppThunk => async (dispatch) => {
  const products = await productsAPI.getProducts();
  dispatch(actions.getProducts(products));
}

export const getComments = (): AppThunk => async (dispatch) => {
  const comments = await productsAPI.getComments();
  dispatch(actions.getComments(comments));
}

export const addNewProduct = (newProduct: newProductInfo): AppThunk => async (dispatch) => {
  await productsAPI.addNewProduct(newProduct.imageURL, newProduct.name, newProduct.description, Number(newProduct.count))
  dispatch(getProducts());
  dispatch(getComments());
}

export const deleteProduct = (id: number | undefined): AppThunk => async (dispatch) => {
  await productsAPI.deleteProduct(id);
  dispatch(getProducts());
  dispatch(getComments());
}

export const updateProduct = (id: number, imageUrl: string, name: string, description: string, count: number,): AppThunk => async (dispatch) => {
  await productsAPI.updateProduct(id, imageUrl, name, description, count)
  dispatch(getProducts());

}

export const updateComment = (id: number, productId: number, description: string, date: string): AppThunk => async (dispatch) => {
  await productsAPI.updateComment(id, productId, description, date);
  dispatch(getComments());
}

export const deleteComment = (id: number): AppThunk => async (dispatch) => {
  await productsAPI.deleteComment(id);
  dispatch(getComments());
}

export const addNewComment = (productId: number, description: string, date: string): AppThunk => async (dispatch) => {
  await productsAPI.addNewComment(productId, description, date)
  dispatch(getComments());
}

export const toggleEdit = (productId: number, commentId: number): AppThunk => async (dispatch) => {
  dispatch(actions.toggleEdit(productId, commentId));
}

export default ProductsList;

type InitialState = typeof initialState;

// infer type of each Action
type InferValueType<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionsTypes = ReturnType<InferValueType<typeof actions>>;
