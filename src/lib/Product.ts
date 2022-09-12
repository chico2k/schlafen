export interface Link {
    href: string;
}

export interface Asset {
    _ref: string;
    _type: string;
}

export interface MainImage {
    _type: string;
    asset: Asset;
}

export interface Slug {
    _type: string;
    current: string;
}

export interface Product {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    link: Link;
    mainImage: MainImage;
    title: string;
    slug: Slug;
}
