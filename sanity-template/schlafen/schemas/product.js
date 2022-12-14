export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    {
      name: 'review',
      title: 'Review',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      codegen: { required: true },
      validation: (Rule) => [Rule.required().error('A Slug is required')],
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      codegen: { required: true },
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: (Rule) => [Rule.required().error('A Category is required')],
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => [Rule.required().error('A main image is required')],
      codegen: { required: true },
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
      title: 'URL',
      name: 'link',
      codegen: { required: true },
      validation: (Rule) => [Rule.required().error('A Url is required')],
      type: 'object',
      fields: [
        {
          title: 'URL',
          name: 'href',
          type: 'url',
        },
      ],
    },
    {
      title: 'Good',
      name: 'goodContent',
      type: 'array',
      group: 'review',
      of: [
        {
          marks: { decorators: [], annotations: [] },
          styles: [],
          title: 'Block',
          type: 'block',

          lists: [{ title: 'Bullet', value: 'bullet' }],
        },
      ],
    },
    {
      title: 'Bad',
      name: 'badContent',
      type: 'array',
      group: 'review',
      of: [
        {
          marks: { decorators: [], annotations: [] },
          styles: [],
          title: 'Block',
          type: 'block',

          lists: [{ title: 'Bullet', value: 'bullet' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
};
