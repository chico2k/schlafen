import NextLink from 'next/link';
import { Category } from '../lib/types/sanity';

const Categories: React.FunctionComponent<{ categories: Category[] }> = ({
  categories,
}) => {
  return (
    <section className='container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg g'>
      <h2 className='text-teal-600 mb-6 text-4xl'>Kategorien</h2>
      <div className='grid grid-cols-4 md:grid-cols-6 gap-2 '>
        {categories.map((category) => {
          return (
            <NextLink href={category.slug.current} key={category._id}>
              <div>
                <h3 className='flex justify-center font-semibold text-sm w-24 md:w-32 md:text-base  bg-teal-600 rounded-md px-3 py-2 text-white cursor-pointer hover:bg-teal-700 transition-all '>
                  {category.title}
                </h3>
              </div>
            </NextLink>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
