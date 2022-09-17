import { Image } from "./Image";
import { Author, Category, Post } from "./sanity";


export type RelatedPost = Post & {
    categories?: Category[]
}

export type ExtendedPost = Post & {
    categories?: Category[]
    author: Author
    products: ExtendedPost
    relatedPosts: RelatedPost[]

}