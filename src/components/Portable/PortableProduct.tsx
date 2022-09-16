import Image from 'next/image';
import { GetImage } from '../../../sanity';
import { ExtendedProduct } from '../../lib/types/Products';
import NextLink from 'next/link';

const PortableProduct: React.FunctionComponent<{
  product: ExtendedProduct;
}> = ({ product }) => {
  const { mainImage, title, description } = product;

  const imageProps = GetImage(mainImage);

  const params = new URLSearchParams();

  imageProps?.src && params.set('image', imageProps?.src);
  product.link.href && params.set('url', product.link.href);
  imageProps?.blurDataURL && params.set('blur', imageProps?.blurDataURL);

  return (
    <>
      <div className='flex my-12 cursor-pointer rounded-lg border-green-200 border p-4'>
        <div className='w-36 rounded-l-lg overflow-hidden'>
          {imageProps && imageProps.src && (
            <Image
              width={144}
              height={144}
              objectFit='contain'
              className='w-full h-56 object-cover'
              src={imageProps.src}
              alt={product.mainImage.altText}
            />
          )}
        </div>
        <div className='flex ml-4 justify-center flex-col  flex-1'>
          <div className='ml-4 text-3xl font-bold pt-2 '>{title}</div>
          <div className='ml-4 mt-2 text-sm'>{description}</div>
          <div className='ml-4  mt-2 flex'>
            <a
              href={'/redirect?' + params}
              target='_blank'
              className='inline-flex w-16 justify-center items-center rounded border border-transparent bg-green-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
            >
              Preis
            </a>
            <NextLink href={`/produkte/${product.slug.current}`}>
              <a className='ml-2 inline-flex w-16 justify-center items-center rounded border  border-green-600 px-2.5 py-1.5 text-xs font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>
                Mehr
              </a>
            </NextLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortableProduct;
