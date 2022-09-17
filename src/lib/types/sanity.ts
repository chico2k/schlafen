import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Post
 *
 *
 */
export interface Post extends SanityDocument {
  _type: "post";

  /**
   * Title — `string`
   *
   *
   */
  title: string;

  /**
   * Description — `text`
   *
   *
   */
  description: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: "slug"; current: string };

  /**
   * Author — `reference`
   *
   *
   */
  author?: SanityReference<Author>;

  /**
   * Main image — `image`
   *
   *
   */
  mainImage: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alternative Text — `string`
     *
     *
     */
    altText: string;
  };

  /**
   * published — `boolean`
   *
   *
   */
  Published?: boolean;

  /**
   * Categories — `array`
   *
   *
   */
  categories?: Array<SanityKeyedReference<Category>>;

  /**
   * Products — `array`
   *
   *
   */
  products?: Array<SanityKeyedReference<Product>>;

  /**
   * Related Posts — `array`
   *
   *
   */
  relatedPosts?: Array<SanityKeyedReference<Post>>;

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt?: string;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;

  /**
   * SEO title — `string`
   *
   *
   */
  seoTitle: string;

  /**
   * SEO Keywords — `array`
   *
   *
   */
  seoKeywords: Array<SanityKeyed<string>>;
}

/**
 * Author
 *
 *
 */
export interface Author extends SanityDocument {
  _type: "author";

  /**
   * Name — `string`
   *
   *
   */
  name: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: "slug"; current: string };
}

/**
 * Product
 *
 *
 */
export interface Product extends SanityDocument {
  _type: "product";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: "slug"; current: string };

  /**
   * Description — `text`
   *
   *
   */
  description?: string;

  /**
   * Categories — `array`
   *
   *
   */
  categories: Array<SanityKeyedReference<Category>>;

  /**
   * Main image — `image`
   *
   *
   */
  mainImage: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alternative Text — `string`
     *
     *
     */
    altText: string;
  };

  /**
   * URL — `object`
   *
   *
   */
  link: {
    _type: "link";
    /**
     * URL — `url`
     *
     *
     */
    href?: string;
  };

  /**
   * Good — `array`
   *
   *
   */
  goodContent?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Bad — `array`
   *
   *
   */
  badContent?: Array<SanityKeyed<SanityBlock>>;
}

/**
 * Category
 *
 *
 */
export interface Category extends SanityDocument {
  _type: "category";

  /**
   * Title — `string`
   *
   *
   */
  title: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: "slug"; current: string };

  /**
   * Description — `text`
   *
   *
   */
  description?: string;

  /**
   * Main image — `image`
   *
   *
   */
  mainImage: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alternative Text — `string`
     *
     *
     */
    altText: string;
  };

  /**
   * Color for the homepage — `string`
   *
   *
   */
  color: "green" | "blue" | "orange" | "purple" | "pink";
}

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;

      /**
       * Alternative Text — `string`
       *
       *
       */
      altText: string;
    }>
  | SanityKeyed<{
      _type: "bestProduct";
      /**
       * Street name — `string`
       *
       *
       */
      street?: string;
    }>
>;

export type Documents = Post | Author | Product | Category;
