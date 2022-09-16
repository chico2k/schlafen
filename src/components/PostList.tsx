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
  sideBySide = false,
}: {
  post: Omit<ExtendedPost, 'products' | 'author'>;
  aspect: string;
  sideBySide?: boolean;
}) {
  const imageProps = post?.mainImage ? GetImage(post.mainImage) : null;

  return (
    <>
      <div
        className={cx(
          'cursor-pointer link-effect',
          sideBySide ? ' grid grid-cols-2' : ''
        )}
      >
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
        <div className={cx('', sideBySide ? 'ml-6' : '')}>
          <CategoryLabel categories={post.categories} />

          <h2 className='mt-2 text-xl font-semibold tracking-normal text-brand-primary'>
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
          {!sideBySide && (
            <time
              className='text-sm mt-5 text-gray-500'
              dateTime={post?.publishedAt || post._createdAt}
            >
              {format(
                parseISO(post?.publishedAt || post._createdAt),
                'MMMM dd, yyyy'
              )}
            </time>
          )}
          {sideBySide && (
            <div>
              <Link href={`/posts/${post.slug.current}`}>
                <a className='mt-4 inline-flex w-16 justify-center items-center rounded border  border-green-600 px-2.5 py-1.5 text-xs font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>
                  Mehr
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
