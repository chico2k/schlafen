import React from 'react';
import Image from 'next/future/image';

const CategoriesBanner: React.FunctionComponent<{
  image: string;
  blur: string;
  altText: string;
}> = ({ image, blur, altText }) => {
  return (
    <div className='w-full h-96 overflow-hidden mb-16'>
      <Image
        alt={altText}
        className='w-full opacity-75 object-cover'
        src={image}
        width={1000}
        height={200}
        blurDataURL={blur}
        placeholder={'blur'}
      />
      <pre>{blur}</pre>
    </div>
  );
};

export default CategoriesBanner;
