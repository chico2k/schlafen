import Image from 'next/image';
import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import CategoryLabel from './CategoryLabel';
import { cx } from '../lib/helper';
import { GetImage } from '../../sanity';
import { CameraIcon } from '@heroicons/react/20/solid';
import { ExtendedPost } from '../lib/types/Post';

export default function PostList({
  post,
  aspect,
}: {
  post: Omit<ExtendedPost, 'products' | 'author'>;
  aspect: string;
}) {
  const imageProps = post?.mainImage ? GetImage(post.mainImage) : null;

  return (
    <>
      <div className='cursor-pointer link-effect'>
        <div
          className={cx(
            'relative overflow-hidden transition-all bg-gray-100 rounded-md dark:bg-gray-800   hover:scale-105',
            aspect === 'landscape' ? 'aspect-video' : 'aspect-square'
          )}
        >
          <Link href={`/posts/${post.slug.current}`}>
            <a>
              {imageProps ? (
                <Image
                  {...imageProps}
                  loader={imageProps.loader}
                  blurDataURL={imageProps.blurDataURL}
                  alt={post.mainImage.altText || 'Thumbnail'}
                  placeholder='blur'
                  layout='fill'
                  objectFit='cover'
                  className='transition-all object-cover'
                />
              ) : (
                <span className='absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                  <CameraIcon />
                </span>
              )}
            </a>
          </Link>
        </div>
        <CategoryLabel categories={post.categories} />

        <h2 className='mt-2 text-xl font-semibold tracking-normal text-brand-primary dark:text-white'>
          <Link href={`/post/${post.slug.current}`}>
            <span className='link-underline link-underline-blue'>
              {post.title}
            </span>
          </Link>
        </h2>

        {/* TODO implemt experpt */}
        {/* <div className='hidden'>
          {post.excerpt && (
            <p className='mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3'>
              <Link href={`/post/${post.slug.current}`}>{post.excerpt}</Link>
            </p>
          )}
        </div> */}
        <time
          className='text-sm mt-5 text-gray-500'
          dateTime={post?.publishedAt || post._createdAt}
        >
          {format(
            parseISO(post?.publishedAt || post._createdAt),
            'MMMM dd, yyyy'
          )}
        </time>
      </div>
    </>
  );
}
