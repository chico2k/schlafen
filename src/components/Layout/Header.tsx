import { Fragment, useState } from 'react';
import { Popover } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import NextLink from 'next/link';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Teams', href: '#', current: false },
  { name: 'Directory', href: '#', current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  const [results, setResults] = useState<any[] | undefined>(undefined);

  return (
    <>
      <Popover
        as='header'
        className={({ open }) =>
          classNames(
            open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
            'bg-white shadow-sm lg:static lg:overflow-y-visible'
          )
        }
      >
        {({ open }) => (
          <>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <div className='relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12'>
                <div className='flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2'>
                  <div className='flex flex-shrink-0 items-center'>
                    <NextLink href='/'>
                      <a>
                        <div className='bg-emerald-400 px-2 py-2 rounded-md'>
                          besser schlafen
                        </div>
                      </a>
                    </NextLink>
                  </div>
                </div>
                <div className='min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6'>
                  <div className='flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0'>
                    <div className='w-full relative bg-red-200'>
                      <label htmlFor='search' className='sr-only'>
                        Search
                      </label>
                      <div className=''>
                        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                          <MagnifyingGlassIcon
                            className='h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                        </div>
                        <input
                          id='search'
                          name='search'
                          className='block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
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
                            setResults(result.result as any[]);
                          }}
                        />
                        <div className='absolute z-20'>
                          {results && (
                            <div className='bg-white w-full'>
                              {results.map((r) => {
                                return (
                                  <div className='px-2 py-1 hover:bg-red-300 currsor-pointer'>
                                    {r._type} - {r.title}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden'>
                  {/* Mobile menu button */}
                  <Popover.Button className='-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='sr-only'>Open menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Popover.Button>
                </div>
              </div>
            </div>

            <Popover.Panel as='nav' className='lg:hidden' aria-label='Global'>
              <div className='mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current
                        ? 'bg-gray-100 text-gray-900'
                        : 'hover:bg-gray-50',
                      'block rounded-md py-2 px-3 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
};

export default Header;
