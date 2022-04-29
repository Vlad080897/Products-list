export type ProductType = {
    id: number
    imageUrl: string
    name: string
    count: number
    size: SizeType
    weight: string
    comments: string[]
    description: string
    sorted: number
}

type SizeType = {
    width: number,
    height: number
}

