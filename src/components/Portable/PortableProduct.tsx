import Image from 'next/image';
import { GetImage } from '../../../sanity';

const PortableProduct = (props: any) => {
  const {
    reference: {
      title,
      description,
      mainImage,
      link: { href },
    },
  } = props;

  const imageProps = GetImage(mainImage);

  // return <pre>{JSON.stringify(props, null, 2)}</pre>;
  return (
    <>
      <a href={href} target='_blank'>
        <div className='flex my-8 cursor-pointer rounded-lg border p-4'>
          <div className='w-36 rounded-l-lg overflow-hidden'>
            {imageProps && imageProps.src && (
              <Image
                width={144}
                height={144}
                objectFit='contain'
                className='w-full h-56 object-cover'
                src={imageProps.src}
                alt={title + 'Bild'}
              />
            )}
          </div>
          <div className='flex ml-4 justify-center flex-col  flex-1'>
            <div className='ml-4 text-3xl font-bold pt-2'>{title}</div>
            <div className='ml-4 mt-2 text-sm'>{description}</div>
          </div>
        </div>
      </a>
    </>
  );
};

export default PortableProduct;
