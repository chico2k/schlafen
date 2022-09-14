import { GetStaticProps } from 'next';
import { sanityClient } from '../../../sanity';
import { ExtendedProduct } from '../../lib/types/Products';

interface Props {
  product: ExtendedProduct;
}

export const ProductPage = ({ product }: Props) => {
  return <div>{JSON.stringify(product)}</div>;
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
  const query = `*[_type == 'product' && slug.current == $slug][0]{
        ...,
        mainImage {
            asset->
          }
        }`;

  const product = await sanityClient.fetch<ExtendedProduct[]>(query, {
    slug: params?.slug,
  });

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
