import { Product } from '../lib';
import Link from 'next/link';
import Image from 'next/future/image';
import { urlFor } from '../../sanity';

interface IProps {
  products: Product[];
}

const Products: React.FunctionComponent<IProps> = ({ products }) => {
  return (
    <section className='mt-16'>
      <h2 className='text-teal-600 mb-6 text-4xl'>Produkte</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 md:gap-6 '>
        {products.map((product) => {
          return (
            <Link href={product.link.href} key={product._id}>
              <a
                target='_blank'
                className='group cursor-pointer overflow-hidden border rounded-lg'
              >
                <Image
                  height={1000}
                  width={1000}
                  className='h-36 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
                  src={urlFor(product.mainImage).url()!}
                  alt=''
                />
                <div className='flex flex-col p-5 justify-between '>
                  <p className='text-xs h-24 overflow-hidden'>
                    <span className=''> {product.title}</span>
                  </p>
                  <div className='mt-1'>
                    <button
                      type='button'
                      className='items-center rounded border border-transparent bg-orange-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      More
                    </button>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
      <div className='ml-4 text-xs mb-1 pr-2 pt-2 flex justify-end '>
        Affliate Links / Werbung{' '}
      </div>
    </section>
  );
};

export default Products;
