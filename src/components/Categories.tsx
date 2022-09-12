import NextLink from 'next/link';
import { Category } from '../lib/types/sanity';

const Categories: React.FunctionComponent<{ categories: Category[] }> = ({
  categories,
}) => {
  return (
    <section className='mt-16'>
      <h2 className='text-teal-600 mb-6 text-4xl'>Kategorien</h2>
      <div className='flex gap-2 '>
        {categories.map((category) => {
          return (
            <NextLink href={category.slug.current}>
              <div>
                <h3 className='flex justify-center font-semibold w-32  bg-teal-600 rounded-md px-2 py-4 text-white cursor-pointer hover:bg-teal-700 transition-all '>
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
