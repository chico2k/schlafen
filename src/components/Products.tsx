import { Product } from '../lib/types/sanity';
import Link from 'next/link';
import Image from 'next/image';
import { GetImage } from '../../sanity';
import { ExtendedProduct } from '../lib/types/Products';
import { CameraIcon } from '@heroicons/react/20/solid';
import { cx } from '../lib/helper';
import CategoryLabel from './Categories/CategoryLabel';

interface IProps {
  products: ExtendedProduct[];
}

const Products: React.FunctionComponent<IProps> = ({ products }) => {
  return (
    <section className='container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg '>
      <h2 className='text-teal-600 mb-6 text-4xl'>Produkte</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 md:gap-16 '>
        {products.map((product) => {
          const imageProps = GetImage(product.mainImage);
          return (
            <div className='cursor-pointer link-effect'>
              <div
                className={cx(
                  'relative overflow-hidden transition-all rounded-md   hover:scale-105',
                  // aspect === 'landscape' ? 'aspect-video' : 'aspect-square'
                  'aspect-square'
                )}
              >
                <Link
                  href={
                    '/redirect' +
                      `?url=${product.link.href}&image=${
                        imageProps?.src as string
                      }` || '/'
                  }
                >
                  <a target='_blank'>
                    {imageProps ? (
                      <Image
                        {...imageProps}
                        loader={imageProps.loader}
                        blurDataURL={imageProps.blurDataURL}
                        alt={product.mainImage.altText || 'Thumbnail'}
                        placeholder='blur'
                        layout='fill'
                        objectFit='contain'
                        className='transition-all object-contain'
                      />
                    ) : (
                      <span className='absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                        <CameraIcon />
                      </span>
                    )}
                  </a>
                </Link>
              </div>
              <Link
                href={
                  '/redirect' +
                    `?url=${product.link.href}&image=${
                      imageProps?.src as string
                    }` || '/'
                }
                key={product._id}
              >
                <a
                  target='_blank'
                  className='group cursor-pointer overflow-hidden rounded-lg'
                >
                  <CategoryLabel categories={product.categories} />
                  <h2 className='mt-2 text-base  tracking-normal text-brand-primary dark:text-white'>
                    <span className=''> {product.title}</span>
                  </h2>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
