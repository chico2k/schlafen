import React from 'react';
import { Post } from '../lib';
import Link from 'next/link';
import Image from 'next/future/image';
import { urlFor } from '../../sanity';

interface IProps {
  posts: Post[];
}

const Posts: React.FunctionComponent<IProps> = ({ posts }) => {
  return (
    <section className=''>
      <h2 className='text-teal-600 mb-6 text-4xl'>Posts</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 '>
        {posts.map((post) => {
          return (
            <Link href={`/posts/${post.slug.current}`} key={post._id}>
              <div className='group cursor-pointer overflow-hidden border rounded-lg'>
                <Image
                  height={1000}
                  width={1000}
                  className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
                  src={urlFor(post.mainImage).url()!}
                  alt=''
                />
                <div className='flex justify-between p-5'>
                  <div>
                    <p className='text-lg font-bold'>{post.title}</p>
                    <p className='text-sm mt-1'>{post.shortDescription}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>{' '}
    </section>
  );
};

export default Posts;
