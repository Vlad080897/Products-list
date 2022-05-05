import { CommentType } from './../types/types';
import { ProductType } from '../types/types';
import { productsAPI } from './../api/products-api';
import { newProductInfo } from '../components/ProductsList/ModalAddProduct';
import { AppThunk } from './store';

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_COMMENTS = 'GET_COMMENTS'
const UPDATE_COMMENT = 'UPDATE_COMMENT'
const TOGGLE_EDIT = 'TOGGLE_EDIT'

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
        products: [...state.products].map(p => {
          p = { ...p }
          const sortedComments = action.comments.filter(c => c.productId === p.id)
          p.comments = [...sortedComments]
          return p
        })
      }
    case TOGGLE_EDIT:
      return {
        ...state,
        products: [...state.products].map(p => {
          if (p.id === action.productId) {
            p = { ...p }
            p.comments = [...p.comments].map((c) => {
              if (c.id === action.commentId) {
                return { ...c, editMode: !c.editMode }
              }
              return c
            })
          }
          return p
        })
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
  },
  getComments: (comments: CommentType[]) => {
    return {
      type: GET_COMMENTS,
      comments
    } as const
  },
  updateComment: (comment: CommentType) => {
    return {
      type: UPDATE_COMMENT,
      comment
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
  const res = await productsAPI.updateProduct(id, imageUrl, name, description, count)
  console.log(res);
  dispatch(getProducts())

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
  dispatch(getComments())
}

export const toggleEdit = (productId: number, commentId: number): AppThunk => async (dispatch) => {
  dispatch(actions.toggleEdit(productId, commentId));
}

export default ProductsList;

type InitialState = typeof initialState;
type InferValueType<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionsTypes = ReturnType<InferValueType<typeof actions>>;
