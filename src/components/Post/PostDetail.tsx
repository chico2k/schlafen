import Head from 'next/head';
import { GetImage } from '../../../sanity';
import { ExtendedPost } from '../../lib/types/Post';
import NextLink from 'next/link';
import Image from 'next/future/image';
import PortablePost from '../Portable/PortablePost';
import PortableProduct from '../Portable/PortableProduct';
import PortableText from 'react-portable-text';
import Posts from './Posts';

interface Props {
  post: ExtendedPost;
}

const PostDetail = ({ post }: Props) => {
  const imageProps = GetImage(post.mainImage);
  return (
    <>
      <Head>
        <title>{post.title} </title>
      </Head>

      <div className='flex justify-center bg-gray-50'>
        {imageProps && imageProps.src && (
          <Image
            width={2000}
            height={3000}
            className='w-full h-56 object-cover max-w-3xl'
            src={imageProps?.src}
            alt={post.mainImage.altText || `${post.title} Bild`}
            blurDataURL={imageProps.blurDataURL}
            placeholder='blur'
          />
        )}
      </div>
      <article className='max-w-3xl mx-auto p-5'>
        <h1 className='text-3xl font-bold my-5'>{post.title}</h1>

        <div className='mt-10'>
          {post.body && (
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1 className='text-3xl font-bold my-5' {...props} />
                ),
                h2: (props: any) => (
                  <h2 className='text-2xl font-semibold my-5' {...props} />
                ),
                li: ({ children }: any) => (
                  <li className='ml-12 list-disc'>{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <NextLink href={href}>
                    <a
                      target='_blank'
                      className='text-blue-500 hover:underline'
                    >
                      {children}
                    </a>
                  </NextLink>
                ),
                image: () => {
                  return <div>2</div>;
                },
                internalLink: (props: any) => {
                  if (!props.reference) return <></>;

                  if (props.reference._type === 'post')
                    return <PortablePost post={props.reference} />;
                  if (props.reference._type === 'product')
                    return <PortableProduct product={props.reference} />;
                  return <></>;
                },
              }}
            />
          )}
        </div>
        <div className='mt-2 flex items-center space-x-2'>
          <p className='font-extralight text-sm'>
            Blog post by
            <span className='text-green-600'>
              {/* {JSON.stringify(author.name)} */}
            </span>{' '}
            - published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        {/* Related Post Section */}
        <div className='mt-16 '>
          <h3 className='text-3xl mb-16 uppercase'>Weiterführende Einträge</h3>
          {post.relatedPosts && <Posts posts={post.relatedPosts} />}
        </div>
      </article>
    </>
  );
};

export default PostDetail;
