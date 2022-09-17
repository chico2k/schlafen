import Head from 'next/head';
import { sanityClient } from '../../sanity';
import Categories from '../components/Categories/Categories';
import Products from '../components/Products';
import Posts from '../components/Post/Posts';
import { Product, Category } from '../lib/types/sanity';
import { ExtendedPost } from '../lib/types/Post';
import { ExtendedProduct } from '../lib/types/Products';

type PostResponse = Omit<ExtendedPost, 'products' | 'author'>[];
interface Props {
  posts: PostResponse;
  products: ExtendedProduct[];
  categories: Category[];
}
export default function Home({ posts, products, categories }: Props) {
  return (
    <div>
      <Head>
        <title>Schlafen ist wichtig</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* posts */}
      <section className='container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg '>
        <Posts posts={posts} />
      </section>
      <Categories categories={categories} />
      <Products products={products} />
    </div>
  );
}

export async function getServerSideProps() {
  const query = `*[_type == 'post']{
    ...,
    categories[]->,
    }`;

  const queryProducts = `*[_type == 'product'] {
    ...,
    categories[]->
  }`;
  const queryCatgories = `*[_type == 'category']`;

  const posts = await sanityClient.fetch<PostResponse>(query);
  const products = await sanityClient.fetch<Product[]>(queryProducts);

  const categories = await sanityClient.fetch<Category[]>(queryCatgories);

  return {
    props: { posts, products, categories }, // will be passed to the page component as props
  };
}
