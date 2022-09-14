import Image from 'next/future/image';
import { GetImage } from '../../../sanity';
import NextLink from 'next/link';

const PortablePost = (props: IProps) => {
  const {
    reference: { title, mainImage, slug, shortDescription },
  } = props;

  const imageProps = GetImage(mainImage);

  return (
    <>
      <NextLink href={slug.current}>
        <div className='flex my-8 cursor-pointer border  rounded-lg'>
          <div className='w-36 h-36 rounded-l-lg overflow-hidden'>
            {imageProps && imageProps.src && (
              <Image
                width={144}
                height={144}
                className='w-full h-56 object-cover'
                src={imageProps.src}
                alt={title + 'Bild'}
              />
            )}
          </div>
          <div className='ml-4 flex flex-col'>
            <div className=' text-3xl font-bold pt-2'>{title}</div>
            <div className='mt-3'>{shortDescription} </div>
          </div>
        </div>
      </NextLink>
    </>
  );
};

export default PortablePost;

export interface IProps {
  reference: Reference;
  children?: string[] | null;
}
export interface Reference {
  shortDescription: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  author: AssetOrAuthor;
  body?: BodyEntity[] | null;
  categories?: null[] | null;
  mainImage: MainImage;
  slug: Slug;
  title: string;
}
export interface AssetOrAuthor {
  _ref: string;
  _type: string;
}
export interface BodyEntity {
  _key: string;
  _type: string;
  children?: ChildrenEntity[] | null;
  markDefs?: null[] | null;
  style: string;
}
export interface ChildrenEntity {
  _key: string;
  _type: string;
  marks?: null[] | null;
  text: string;
}
export interface MainImage {
  _type: string;
  asset: AssetOrAuthor;
}
export interface Slug {
  _type: string;
  current: string;
}
