import { GetStaticProps } from 'next';
import { sanityClient } from '../../../sanity';
import { ExtendedPost } from '../../lib/types/Post';
import { ExtendedProduct } from '../../lib/types/Products';
import DetailProduktPage from '../../Produkt/Detail';

interface Props {
  product: ExtendedProduct;
  posts: ExtendedPost[];
}

export const ProductPage = ({ product, posts }: Props) => {
  return (
    <div>
      <DetailProduktPage product={product} posts={posts} />
    </div>
  );
};

export async function getStaticPaths() {
  const query = `*[_type == 'product']{
          _id,
          "slug" : slug.current
        }`;

  const products = await sanityClient.fetch(query);
  const paths = products.map((product: { _id: string; slug: string }) => ({
    params: {
      slug: product.slug,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const query = ` *[_type == 'product' && slug.current == $slug][] {
    "product" : {..., categories[]->},
    "posts" : *[ _type == 'post' && references(^._id)][] {
     ...,
     author->,
     categories[]->
    }
   }[0]
 
 `;

  const response = await sanityClient.fetch<{
    product: ExtendedProduct[];
    posts: ExtendedPost[];
  }>(query, {
    slug: params?.slug,
  });

  if (!response.product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: response.product,
      posts: response.posts,
    },
  };
};

export default ProductPage;
