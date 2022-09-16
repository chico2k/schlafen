const colorOptions = [
  { title: 'green', value: 'green' },
  { title: 'blue', value: 'blue' },
  { title: 'orange', value: 'orange' },
  { title: 'purple', value: 'purple' },
  { title: 'pink', value: 'pink' },
];

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      codegen: { required: true },
      validation: (Rule) => [
        Rule.required().error('A Slug of max. 100 characters is required'),
      ],
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
      name: 'color',
      title: 'Color for the homepage',
      type: 'string',
      codegen: { required: true },
      validation: (Rule) => [
        Rule.required().error('A color for the category is required'),
      ],
      options: {
        list: [...colorOptions],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
};
