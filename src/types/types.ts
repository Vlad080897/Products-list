export type ProductType = {
    id: number
    imageUrl: string
    name: string
    count: number
    comments: CommentType[]
    description: string
}

type SizeType = {
    width: number,
    height: number
}

export type CommentType = {
    id: number
    productId: number
    description: string
    date: string
    editMode: boolean
}

