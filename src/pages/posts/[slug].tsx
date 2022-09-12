import { GetStaticProps } from 'next';
import PortableText from 'react-portable-text';
import Header from '../../components/Layout/Header';
import { sanityClient, urlFor } from '../../../sanity';
import { Post } from '../../../typings';
import NextLink from 'next/link';
import Image from 'next/future/image';
import PortablePost from '../../components/Portable/PortablePost';
import PortableProduct from '../../components/Portable/PortableProduct';

interface Props {
  post: Post;
}
const Post = ({ post }: Props) => {
  return (
    <>
      <div>
        <Image
          width={2000}
          height={3000}
          className='w-full h-56 object-cover'
          src={urlFor(post.mainImage).url()!}
          alt=''
        />
      </div>

      <article className='max-w-3xl mx-auto p-5'>
        <h1 className='text-3xl font-bold my-5'>{post.title}</h1>
        <h2 className='font-light text-xl mb-2 text-gray-500'>
          {post.description}
        </h2>

        <div className='mt-10'>
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
                  <a target='_blank' className='text-blue-500 hover:underline'>
                    {children}
                  </a>
                </NextLink>
              ),
              image: () => {
                return <div>2</div>;
              },
              internalLink: (props: any) => {
                if (props.reference._type === 'post')
                  return <PortablePost {...props} />;
                if (props.reference._type === 'product')
                  return <PortableProduct {...props} />;
              },
            }}
          />
        </div>
        <div className='mt-2 flex items-center space-x-2'>
          <p className='font-extralight text-sm'>
            Blog post by{' '}
            <span className='text-green-600'>{post.author.name}</span> -
            published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
      </article>
    </>
  );
};
export async function getStaticPaths() {
  const query = `*[_type == 'post']{
        _id,
        slug  {
        current
      }
      }`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type == 'post' && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        slug,
        author -> {
        name,
      }, 
      'comments': *[
        _type == 'comment' &&
        post._ref == ^._id &&
        approved == true
      ],
      mainImage,
      description,
      body[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            ...,
             "reference": @.reference-> {...}
    
          }
    
        }
      }
      }
    `;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
  };
};

export default Post;
