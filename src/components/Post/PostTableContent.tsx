import slugify from 'slugify';
import { cx } from '../../lib/helper';
import { BlockContent, SanityBlock, SanityKeyed } from '../../lib/types/sanity';

const filter = (ast: any, match: any) =>
  ast.reduce((acc: any, node: any) => {
    if (match(node)) acc.push(node);
    if (node.children) acc.push(...filter(node.children, match));
    return acc;
  }, []);

const findHeadings = (
  ast: BlockContent | undefined
): Array<SanityKeyed<SanityBlock> & { text: string; slug: string }> => {
  // Get Headings Only
  const headingsOnly = filter(ast, (node: SanityKeyed<SanityBlock>) =>
    /h\d/.test(node.style)
  );

  // Generate Slug and add Text to Headings Object
  return headingsOnly.map(
    (
      node: SanityKeyed<SanityBlock>
    ): SanityKeyed<SanityBlock> & { text: string; slug: string } => {
      const text = getChildrenText(node);
      const slug = slugify(text);

      return { ...node, text, slug };
    }
  );
};

const get = (object: any, path: Array<string | number>) =>
  path.reduce((prev, curr) => prev[curr], object);

const getObjectPath = (path: Array<string | number>): Array<string | number> =>
  path.length === 0
    ? path
    : ['subheadings'].concat(path.join('.subheadings.').split('.'));

export const parseOutline = (ast: BlockContent | undefined) => {
  const outline = { subheadings: [] };
  const headings = findHeadings(ast);
  const path: Array<string | number> = [];

  let lastLevel = 0;

  headings.forEach((heading) => {
    const level = Number(heading.style.slice(1));
    heading.subheadings = [];

    if (level < lastLevel) for (let i = lastLevel; i >= level; i--) path.pop();
    else if (level === lastLevel) path.pop();

    const prop = get(outline, getObjectPath(path));
    prop.subheadings.push(heading);
    path.push(prop.subheadings.length - 1);
    lastLevel = level;
  });

  return outline.subheadings;
};

const getChildrenText = (node: SanityKeyed<SanityBlock>) =>
  node.children
    .map((node: SanityKeyed<SanityBlock>) =>
      typeof node === 'string' ? node : node.text || ''
    )
    .join('');

const TableOfContents = (props: any) => {
  const level = props.level;
  return (
    <div className='px-5'>
      {props.level === 1 ? (
        <div className='text-2xl mb-4 text-gray-600 border-b pb-2'>Inhalt</div>
      ) : null}
      <ol className={cx('', level !== 1 ? 'ml-2' : '')}>
        {props.outline.map((heading: any) => (
          <li
            className={cx(
              level === 1 ? 'pb-1 ' : '',
              level === 2 ? '-ml-4 uppercase' : '',
              level === 3 ? '-ml-2 normal-case' : ''
            )}
          >
            <a
              href={'#' + heading.slug}
              className={cx(
                'hover:text-green-500',
                level === 1 ? 'text-lg font-semibold ' : '',
                level === 2 ? 'text-base' : '',
                level === 3 ? 'text-sm' : ''
              )}
            >
              <span className='mb-1 block'>{getChildrenText(heading)} </span>
            </a>
            {heading.subheadings.length > 0 && (
              <TableOfContents
                outline={heading.subheadings}
                level={level + 1}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TableOfContents;
