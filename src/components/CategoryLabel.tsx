import { cx } from '../lib/helper';
import { Category } from '../lib/types/sanity';

const CategoryLabel: React.FunctionComponent<{ categories?: Category[] }> = ({
  categories,
}) => {
  const color = {
    green: 'text-green-500',
    blue: 'text-blue-500',
    orange: 'text-orange-400',
    purple: 'text-purple-500',
    pink: 'text-pink-500',
  };

  if (categories && categories?.length < 1)
    return (
      <span
        className={cx(
          'inline-block mt-5 text-xs font-medium tracking-wider uppercase ',
          'text-pink-500'
        )}
      >
        Generell
      </span>
    );

  return (
    <div className='flex gap-x-3'>
      {categories?.length &&
        categories.slice(0, 3).map((category) => (
          <span
            key={category._id}
            className={cx(
              'inline-block mt-5 text-xs font-medium tracking-wider uppercase ',
              color[category.color] || 'text-pink-500'
            )}
          >
            {category.title}
          </span>
        ))}
    </div>
  );
};

export default CategoryLabel;
