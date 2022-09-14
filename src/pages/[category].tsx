import { GetStaticProps, NextPage } from 'next';
import { GetImage, sanityClient } from '../../sanity';
import Products from '../components/Products';
import Posts from '../components/Posts';
import CategoriesBanner from '../components/CategoriesBanner';
import { Post, Product, Category } from '../lib/types/sanity';
import Head from 'next/head';
import { ExtendedCategory } from '../lib/types/Category';
import { json } from 'stream/consumers';
import { ExtendedProduct } from '../lib/types/Products';
import { ExtendedPost } from '../lib/types/Post';

type IProps = {
  category: QueryCategoryExtended;
};

const CategoryPage: NextPage<IProps> = ({ category }) => {
  const imageProps = GetImage(category.mainImage);
  return (
    <>
      <Head>
        <title>{category.title}</title>
      </Head>
      <CategoriesBanner
        altText={category.mainImage.altText}
        image={imageProps!.src}
        blur={category.mainImage.asset.metadata.lqip}
      />
      <div className='max-w-4xl mx-auto'>
        <Posts posts={category.posts} />
        <Products products={category.products} />
      </div>
    </>
  );
};

export default CategoryPage;

export async function getStaticPaths() {
  const query = `*[_type == 'category']`;
  const categories = await sanityClient.fetch<Category[]>(query);

  const paths = categories.map((category) => {
    return {
      params: {
        category: category.slug.current,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export type QueryCategoryExtended = ExtendedCategory & {
  posts: Omit<ExtendedPost, 'products' | 'author' | 'categories'>[];
  products: ExtendedProduct[];
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == 'category' && slug.current == $slug][0] {
        ...,
        mainImage {
          ...,
          asset->
        },
        "products": *[ _type == "product" && references(^._id)] { 
          ...,
          mainImage {
            asset->           
          }  
        },
        "posts": *[ _type == "post" && references(^._id)] {
          ...,
          mainImage {
            asset->
          }
        },
        
      
  }`;

  const category = await sanityClient.fetch<QueryCategoryExtended>(query, {
    slug: params?.category,
  });

  if (!category) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      category,
    },
  };
};
