import Head from 'next/head';

import Header from '../components/Layout/Header';
import { sanityClient } from '../sanity';

import Categories from '../components/Categories';
import { Category, Post, Product } from '../lib';
import Products from '../components/Products';
import Posts from '../components/Posts';

interface Props {
  posts: Post[];
  products: Product[];
  categories: Category[];
}
export default function Home({ posts, products, categories }: Props) {
  return (
    <div className='max-w-7xl mx-auto'>
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
export async function getServerSideProps() {
  const query = `*[_type == 'post']`;
  const queryProducts = `*[_type == 'product']`;

  const queryCatgories = `*[_type == 'category']`;

  const posts = await sanityClient.fetch<Post[]>(query);
  const products = await sanityClient.fetch<Product[]>(queryProducts);

  const categories = await sanityClient.fetch<Category[]>(queryCatgories);

  return {
    props: { posts, products, categories }, // will be passed to the page component as props
  };
}
