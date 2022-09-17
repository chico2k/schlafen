import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { SerachResponse } from '../lib/types/Search';
import { GetImage } from '../../sanity';
import Image from 'next/future/image';
import Router, { useRouter } from 'next/router';

const Search = ({
  searchOpen,
  setSearchOpen,
}: {
  searchOpen: boolean;
  setSearchOpen: (s: boolean) => void;
}) => {
  const [results, setResults] = useState<SerachResponse[] | undefined>(
    undefined
  );

  useEffect(() => {
    return () => {
      if (!searchOpen) setResults([]);
    };
  }, [searchOpen]);

  return (
    <>
      <Transition.Root show={searchOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setSearchOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6'>
                  <div>
                    <div className='w-full relative '>
                      <label htmlFor='search' className='sr-only'>
                        Search
                      </label>

                      <input
                        id='search'
                        name='search'
                        className='block w-full  ounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
                        placeholder='Search'
                        type='search'
                        onChange={async (e) => {
                          if (!e.target.value) return setResults(undefined);
                          if (e.target.value.length < 4)
                            return setResults(undefined);

                          const response = await fetch(
                            `/api/search/?q=${e.target.value}`
                          );
                          const result = await response.json();
                          setResults(result.result as SerachResponse[]);
                        }}
                      />
                      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                        <MagnifyingGlassIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </div>
                    </div>
                    <div className='z-20'>
                      {results && results?.length > 0 && (
                        <div className='bg-white w-full'>
                          {results.map((searchitem) => {
                            return (
                              <SearchResultItem
                                searchitem={searchitem}
                                setResults={setResults}
                                setSearchOpen={setSearchOpen}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6'>
                    <button
                      type='button'
                      className='inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm'
                      onClick={() => setSearchOpen(false)}
                    >
                      Suchen
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Search;

const SearchResultItem: React.FunctionComponent<{
  searchitem: SerachResponse;
  setResults: (searchResults: SerachResponse[]) => void;
  setSearchOpen: (s: boolean) => void;
}> = ({ searchitem, setResults, setSearchOpen }) => {
  const imageProps = GetImage(searchitem.mainImage);
  const router = useRouter();
  const url =
    searchitem._type == 'product'
      ? `/produkte/${searchitem.slug}`
      : searchitem._type === 'post'
      ? `/posts/${searchitem.slug}`
      : searchitem._type === 'category'
      ? `/kategorie/${searchitem.slug}`
      : '/';

  const onClickHandler = () => {
    setSearchOpen(false);
    return router.push(url);
  };

  return (
    <>
      <div className='px-2 hover:bg-gray-50 currsor-pointer py-4 cursor-pointer mt-4 '>
        <button
          className='w-full items-center flex'
          onClick={() => onClickHandler()}
        >
          {imageProps && imageProps.src && (
            <Image
              width={300}
              height={300}
              className=' w-16 h-16 rounded-sm object-contain'
              alt={`Bild von ${searchitem.title}`}
              src={imageProps.src}
            />
          )}
          <div className='ml-4 flex flex-col  gap-y-2'>
            <span className=' text-xl'>{searchitem.title}</span>
            <span className='max-w-min items-center rounded-full bg-green-50 px-3 py-0.5 text-sm font-medium text-green-800 '>
              {searchitem._type}
            </span>
          </div>
        </button>
      </div>

      <div className='relative mt-2'>
        <div className='absolute inset-0 flex items-center' aria-hidden='true'>
          <div className='w-full border-t border-gray-200' />
        </div>
      </div>
    </>
  );
};
