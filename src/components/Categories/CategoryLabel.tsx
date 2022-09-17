import { cx } from '../../lib/helper';
import { Category } from '../../lib/types/sanity';

const color = {
  green: 'text-green-500',
  blue: 'text-blue-500',
  orange: 'text-orange-400',
  purple: 'text-purple-500',
  pink: 'text-pink-500',
};

const CategoryLabel: React.FunctionComponent<{
  categories?: Category[];
  className?: string;
}> = ({ categories, className }) => {
  if (categories && categories?.length < 1)
    return (
      <span
        className={cx(
          'inline-block  font-medium tracking-wider uppercase ',
          'text-pink-500',
          className ? className : ''
        )}
      >
        Generell
      </span>
    );

  return (
    <div className='flex gap-x-3'>
      {categories &&
        categories.map((category) => (
          <span
            key={category._id}
            className={cx(
              'inline-block font-medium tracking-wider uppercase ',
              color[category.color] || 'text-pink-500',
              className ? className : ''
            )}
          >
            {category.title}
          </span>
        ))}
    </div>
  );
};

export default CategoryLabel;
