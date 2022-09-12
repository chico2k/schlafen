import { GetStaticProps, NextPage } from 'next';
import { Category } from '../lib';
import { sanityClient } from '../sanity';

const CategoryPage: NextPage<{ category: Category }> = ({ category }) => {
  return <pre>{JSON.stringify(category, null, 2)}</pre>;
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
  const query = `  *[_type == 'category' && slug.current == $slug][0]`;
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
