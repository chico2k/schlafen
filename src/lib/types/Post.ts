import { Image } from "./Image";
import { Author, Category, Post } from "./sanity";


export type ExtendedPost = Post & {
    categories?: Category[]
    author: Author
    mainImage: Image
    products: ExtendedPost
}