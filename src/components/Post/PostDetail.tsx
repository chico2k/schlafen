import Head from 'next/head';
import { GetImage } from '../../../sanity';
import { ExtendedPost } from '../../lib/types/Post';
import NextLink from 'next/link';
import Image from 'next/future/image';
import PortablePost from '../Portable/PortablePost';
import PortableProduct from '../Portable/PortableProduct';
import PortableText from 'react-portable-text';
import Posts from './Posts';
import TableOfContents, { parseOutline } from './PostTableContent';
import slugify from 'slugify';
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

      <div className='flex h-72 justify-center overflow-hidden  '>
        {imageProps && imageProps.src && (
          <Image
            width={imageProps.width}
            height={imageProps.height}
            className='w-full object-cover max-w-4xl '
            src={imageProps?.src}
            alt={post.mainImage.altText || `${post.title} Bild`}
            blurDataURL={imageProps.blurDataURL}
            placeholder='blur'
          />
        )}
      </div>
      <article className='max-w-3xl mx-auto z-10 bg-white text-gray-600'>
        <h1 className='text-5xl font-bold my-5 mb-8 p-5 text-gray-700 '>
          {post.title}
        </h1>
        <div className='py-6 bg-gray-50 rounded-2xl'>
          <TableOfContents outline={parseOutline(post.body)} level={1} />
        </div>

        <div className='p-5 '>
          {post.body && (
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              content={post.body}
              serializers={{
                h1: (props: { children: string[] }) => (
                  <h1 className='text-3xl font-bold my-5' {...props} />
                ),
                h2: (props: { children: string[] }) => {
                  return (
                    <h2
                      className='text-2xl font-semibold my-5'
                      {...props}
                      id={slugify(props.children[0])}
                    />
                  );
                },
                h3: (props: { children: string[] }) => {
                  return (
                    <h2
                      className='text-lg uppercase my-5'
                      {...props}
                      id={slugify(props.children[0])}
                    />
                  );
                },
                h4: (props: { children: string[] }) => {
                  return (
                    <h2
                      className='text-base font-semibold my-5'
                      {...props}
                      id={slugify(props.children[0])}
                    />
                  );
                },
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
