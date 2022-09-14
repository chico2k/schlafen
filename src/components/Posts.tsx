import React from 'react';

import { ExtendedPost } from '../lib/types/Post';
import PostList from './PostList';

interface IProps {
  posts: Omit<ExtendedPost, 'products' | 'author'>[];
}

const Posts: React.FunctionComponent<IProps> = ({ posts }) => {
  return (
    <section className='container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg '>
      <div className='grid gap-10 lg:gap-10 md:grid-cols-2 '>
        {posts.slice(0, 2).map((post) => (
          <PostList key={post._id} post={post} aspect='landscape' />
        ))}
      </div>
      <div className='grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 '>
        {posts.slice(2).map((post) => (
          <PostList key={post._id} post={post} aspect='square' />
        ))}
      </div>
    </section>
  );
};

export default Posts;
