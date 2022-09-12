import Head from 'next/head';

import { sanityClient } from '../../sanity';

import Categories from '../components/Categories';
import Products from '../components/Products';
import Posts from '../components/Posts';
import { Post, Product, Category } from '../lib/types/sanity';
import { ExtendedPost } from '../lib/types/Post';
import { Image } from '../lib/types/Image';
import { ExtendedProduct } from '../lib/types/Products';

interface Props {
  posts: Array<ExtendedPost & { mainImage: Image }>;
  products: ExtendedProduct[];
  categories: Category[];
}
export default function Home({ posts, products, categories }: Props) {
  return (
    <div className='max-w-4xl mx-auto'>
      <Head>
        <title>Schlafen ist wichtig</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* posts */}
      <Posts posts={posts} />
      <Categories categories={categories} />
      <Products products={products} />
    </div>
  );
}

export type ExtendedPostData = Post & {
  extraFields: { blur: string };
};

export async function getServerSideProps() {
  const query = `*[_type == 'post']{
    ...,
    mainImage {
        asset->
      }
    }`;

  const queryProducts = `*[_type == 'product']`;
  const queryCatgories = `*[_type == 'category']`;

  const posts = await sanityClient.fetch<ExtendedPostData[]>(query);
  const products = await sanityClient.fetch<Product[]>(queryProducts);

  const categories = await sanityClient.fetch<Category[]>(queryCatgories);

  return {
    props: { posts, products, categories }, // will be passed to the page component as props
  };
}
