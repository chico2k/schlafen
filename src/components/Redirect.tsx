import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/future/image';

const RedirectComponent = () => {
  const [redirectSeconds, setRedirectSeconds] = useState<number>(3);
  const router = useRouter();
  const query = router.query;

  const { image, title, blur } = query;

  useEffect(() => {
    if (query.url) {
      if (redirectSeconds == 0) {
        window.location.href = query.url.toString();
        return;
      }

      setTimeout(() => {
        setRedirectSeconds((redirectSeconds) => redirectSeconds - 1);
      }, 1000);
    }
  }, [redirectSeconds, query]);

  return (
    <>
      <div className='flex justify-center items-center w-full '>
        <div className='text-center my-48 '>
          <h2 className='text-4xl mb-4'>{title}</h2>
          <div className='flex justify-center'>
            {image && (
              <Image
                height={250}
                width={500}
                className='aspect-video object-contain group-hover:scale-105 transition-transform duration-200 ease-in-out'
                src={image as string}
                alt=''
                blurDataURL={blur as string}
              />
            )}
          </div>
          <div></div>
          <div className='text-xl mb-4 mt-8'>
            Die Weiterleitung erfolgt in ..{' '}
            {redirectSeconds === 0 ? '' : redirectSeconds}
          </div>
          <div className='text-sm'>
            Es handelt sich um einen Werbelink / Affiliate Link
          </div>
          <div className='text-sm'>
            Für den Inhalt und die Richtigkeit ist der externe Anbieter
            verantwortlich{' '}
          </div>
        </div>
      </div>
      * ;
    </>
  );
};

export default RedirectComponent;
