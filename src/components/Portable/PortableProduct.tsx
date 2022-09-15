import Image from 'next/image';
import { GetImage } from '../../../sanity';

const PortableProduct = (props: IProps) => {
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
                alt={name + 'Bild'}
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

export interface IProps {
  reference: Reference;
  children?: string[] | null;
}
export interface Reference {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  link: Link;
  title: string;
  description: string;
  slug: Slug;
  mainImage: MainImage;
}
export interface Link {
  href: string;
}
export interface Slug {
  _type: string;
  current: string;
}

export interface MainImage {
  mainImage: MainImage1;
}
export interface MainImage1 {
  _type: string;
  asset: Asset;
}
export interface Asset {
  _ref: string;
  _type: string;
}
