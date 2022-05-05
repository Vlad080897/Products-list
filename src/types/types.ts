export type ProductType = {
    id: number
    imageUrl: string
    name: string
    count: number
    size: SizeType
    weight: string
    comments: CommentType[]
    description: string
    isSorted: number
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

