/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',

  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
              {
                title: 'Open in new window.',
                name: 'blank',
                type: 'boolean',
                initalValue: 'true',
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            options: {
              modal: {
                type: 'fold', // 'popover' (default) | 'fullscreen' | 'fold'
                width: 'large', // 'small' (default) | 'medium' | 'large' | 'full'
              },
            },
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'post' },
                  { type: 'product' },
                  // other types you may want to link to
                ],
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          title: 'Alternative Text',
          name: 'altText',
          type: 'string',
          codegen: { required: true },
          validation: (Rule) => [
            Rule.required().error('Alternative image text is required'),
          ],
        },
      ],
    },

    {
      type: 'object',
      name: 'bestProduct',
      title: 'Best Product',
      description: 'Added for the Best Product Section',
      preview: {
        select: {
          'title': 'title',
        },
      },
      fields: [{ name: 'street', type: 'string', title: 'Street name' }],
    },
  ],
};
