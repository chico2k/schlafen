import { SanityAssetDocument, SanityImageAssetDocument } from "@sanity/client";
import { Image } from "./Image";
import { Category, Product, SanityImageAsset } from "./sanity";

export type ExtendedProduct = Product & {
    categories: Category[],
}
