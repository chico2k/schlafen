import React from 'react';
import { ExtendedPost, RelatedPost } from '../../lib/types/Post';
import PostCard from './PostCard';

interface IProps {
  posts?: ExtendedPost[] | RelatedPost[];
}

const Posts: React.FunctionComponent<IProps> = ({ posts }) => {
  return (
    <>
      <div className='grid gap-10 lg:gap-10 md:grid-cols-2 '>
        {posts &&
          posts?.length > 0 &&
          posts
            .slice(0, 2)
            .map((post) => (
              <PostCard key={post._id} post={post} aspect='landscape' />
            ))}
      </div>
      <div className='grid gap-10 mt-10 lg:gap-10 grid-cols-2 md:grid-cols-3  '>
        {posts &&
          posts?.length > 0 &&
          posts
            .slice(2)
            .map((post) => (
              <PostCard key={post._id} post={post} aspect='square' />
            ))}
      </div>
    </>
  );
};

export default Posts;
