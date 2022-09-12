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
        Rule.required()
          .max(100)
          .error('A Slug of max. 100 characters is required'),
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
      name: 'altText',
      validation: (Rule) => [
        Rule.required().error('A text for the image is required'),
      ],
      codegen: { required: true },
      title: 'Alt Text for Image',
      type: 'string',
    },
    {
      name: 'bannerImage',
      title: 'Banner image',
      type: 'image',
      codegen: { required: true },
      validation: (Rule) => [Rule.required().error('A Main Image is required')],
      options: {
        hotspot: true,
      },
    },
  ],
};
