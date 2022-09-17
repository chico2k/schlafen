import Image from 'next/image';
import { GetImage, sanityImageOrPlaceHolder } from '../../sanity';
import PortableProductReview from '../components/Portable/PortableProductReview';
import PostCard from '../components/Post/PostCard';
import { ExtendedPost } from '../lib/types/Post';
import { ExtendedProduct } from '../lib/types/Products';

interface Props {
  product: ExtendedProduct;
  posts: ExtendedPost[];
}

const DetailProduktPage: React.FunctionComponent<Props> = ({
  product,
  posts,
}) => {
  const imageProps = product?.mainImage ? GetImage(product.mainImage) : null;

  return (
    <>
      <section className='container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg '>
        <h1 className='text-4xl mb-12 text-green-500'>{product.title}</h1>
        <div className='grid grid-cols-2 gap-6'>
          <Image
            src={sanityImageOrPlaceHolder(imageProps)}
            alt={product.mainImage.altText}
            {...imageProps}
            className='max-w-3xl object-contain'
          />
          <div>{product.description}</div>
        </div>
        <h2 className='text-3xl mb-4 border-b-4 border-green-500 text-green-500'>
          Bewertung
        </h2>
        <div className='grid grid-cols-2 mt-4'>
          <div>
            <h3>Good</h3>
            <PortableProductReview state='good' content={product.goodContent} />
          </div>
          <div>
            <h3>Bad</h3>
            <PortableProductReview state='bad' content={product.badContent} />
          </div>
        </div>
        <div className='mt-4'>
          <h2 className='text-3xl mb-4 border-b-4 border-green-500 text-green-500'>
            Posts zu dem Produkt{' '}
          </h2>
          <div className='grid grid-cols-4'>
            {posts.map((post) => {
              return (
                <div key={product._id} className=''>
                  <PostCard post={post} aspect='aspect-square' />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailProduktPage;
