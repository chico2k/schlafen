import { createCurrentUserHook, createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';
import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image';
import Image, { ImageProps } from 'next/image';

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production' as string,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  apiVersion: '2021-03-25',

  userCdn: process.env.NEXT_PUBLIC_CDN || true,
};

export const sanityClient = createClient(config);
export const urlFor = (source: string) => createImageUrlBuilder(config).image(source);
export const useCurrentUser = createCurrentUserHook(config);

export const GetImage = (image: any, CustomImageBuilder = null) => {

  const imageProps = useNextSanityImage(sanityClient, image)
  if (!imageProps) {
    return null;
  }
  return imageProps as UseNextSanityImageProps
}