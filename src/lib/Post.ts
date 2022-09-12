
export interface Slug {
    _type: string;
    current: string;
}

export interface Author {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    name: string;
    slug: Slug;
}

export interface Child {
    _key: string;
    _type: string;
    marks: any[];
    text: string;
}

export interface Body {
    _key: string;
    _type: string;
    children: Child[];
    markDefs: any[];
    style: string;
}

export interface Asset {
    _ref: string;
    _type: string;
}

export interface MainImage {
    _type: string;
    asset: Asset;
}

export interface Slug2 {
    _type: string;
    current: string;
}

export interface Post {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    author: Author;
    body: Body[];
    mainImage: MainImage;
    shortDescription: string;
    slug: Slug2;
    title: string;
}


