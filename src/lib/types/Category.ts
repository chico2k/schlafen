import { Image } from "./Image";
import { Category, } from "./sanity";

export type ExtendedCategory = Category & {
    mainImage: Image
};