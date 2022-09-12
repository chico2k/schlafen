import React from 'react';
import Image from 'next/future/image';

const CategoriesBanner: React.FunctionComponent<{
  image: string;
  blur: string;
  altText: string;
}> = ({ image, blur, altText }) => {
  return (
    <div className='flex justify-center bg-gray-50'>
      <div className='w-full h-56 overflow-hidden max-w-4xl'>
        <Image
          alt={altText}
          className='w-full opacity-75 object-cover'
          src={image}
          width={1000}
          height={200}
          blurDataURL={blur}
          placeholder={'blur'}
        />
      </div>
    </div>
  );
};

export default CategoriesBanner;
