import { GetStaticProps, NextPage } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import Products from '../components/Products';
import Posts from '../components/Posts';
import CategoriesBanner from '../components/CategoriesBanner';
import { Post, Product, Category } from '../lib/types/sanity';

type IProps = {
  category: Category & {
    blur: string;
    altText: string;
    posts: Post[];
    products: Product[];
  };
};

const CategoryPage: NextPage<IProps> = ({ category }) => {
  return (
    <>
      <CategoriesBanner
        altText={category.altText}
        image={urlFor(category.bannerImage).url()!}
        blur={category.blur}
      />
      <div className='max-w-7xl mx-auto'>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == 'category' && slug.current == $slug][0] {
    ...,
    "blur" : bannerImage.asset->.metadata.lqip,
    "products": *[ _type == "product" && references(^._id)], 
    "posts" : *[ _type == "post" && references(^._id)]
  }`;

  const category = await sanityClient.fetch(query, {
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
