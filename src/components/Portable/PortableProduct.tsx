import Image from 'next/future/image';
import { urlFor } from '../../../sanity';

const PortableProduct = (props: IProps) => {
  const {
    reference: {
      name,
      mainImage,
      link: { href },
    },
  } = props;

  const imageUrl = urlFor(mainImage).url()!;

  // return <pre>{JSON.stringify(props, null, 2)}</pre>;
  return (
    <>
      <a href={href} target='_blank'>
        <div className='flex my-8 cursor-pointer border  rounded-lg'>
          <div className='w-36 h-36 rounded-l-lg overflow-hidden'>
            <Image
              width={144}
              height={144}
              className='w-full h-56 object-cover'
              src={imageUrl}
              alt={name + 'Bild'}
            />
          </div>
          <div className='flex flex-col justify-between flex-1'>
            <div className='ml-4 text-3xl font-bold pt-2'>{name}</div>
            <div className='ml-4 text-xs mb-1 pr-2 pt-2 flex justify-end text-red-200'>
              Affliate Link / Werbung{' '}
            </div>
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
  name: string;
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
