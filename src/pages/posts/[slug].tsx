import { GetStaticProps } from 'next';
import { sanityClient } from '../../../sanity';
import { Post } from '../../../typings';
import { ExtendedPost } from '../../lib/types/Post';
import PostDetail from '../../components/Post/PostDetail';

interface Props {
  post: ExtendedPost;
}

const Post = ({ post }: Props) => {
  return <PostDetail post={post} />;
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

export const getStaticProps: GetStaticProps<{
  post: ExtendedPost;
}> = async ({ params }) => {
  const query = `
  *[_type == 'post' && slug.current == $slug][0]{
    ...,
    author->,
    categories[]->,
    relatedPosts[]-> {..., categories[]->},
    mainImage {
      asset->
    },
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          ...,
          reference-> {
          ...,
          categories[]->
        }
       }
      }
     },
    }
    `;
  const post = await sanityClient.fetch<ExtendedPost>(query, {
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
