
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



