export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      codegen: { required: true },
      validation: (Rule) => [
        Rule.required().max(200).error('A Name is required'),
      ],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      codegen: { required: true },
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => [Rule.required().error('A Slug is required')],
    },
  ],
  // preview: {
  //   select: {
  //     title: 'name',
  //   },
  // },
};
