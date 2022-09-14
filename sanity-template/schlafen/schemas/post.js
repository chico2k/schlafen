export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
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
      codegen: { required: true },
      validation: (Rule) => [
        Rule.required()
          .max(100)
          .error('A Title of max. 100 characters is required'),
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      codegen: { required: true },
      validation: (Rule) => [
        Rule.required()
          .max(200)
          .error('A Description of max. 200 characters is required'),
      ],
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
      name: 'author',
      title: 'Author',
      codegen: { required: true },
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule) => [Rule.required().error('A Author is required')],
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      codegen: { required: true },
      validation: (Rule) => [Rule.required().error('A Main Image is required')],
      options: {
        hotspot: true,
      },
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
      title: 'published',
      name: 'Published',
      type: 'boolean',
      initalValue: 'true',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'product' } }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },

    {
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      codegen: { required: true },
      validation: (Rule) => [
        Rule.required()
          .max(200)
          .error('A SEO Title of max. 100 characters is required'),
      ],
    },
    {
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      codegen: { required: true },
      of: [{ type: 'string' }],
      validation: (Rule) => [
        Rule.required().max(3).error('Max three key words'),
      ],

      group: 'seo',
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
