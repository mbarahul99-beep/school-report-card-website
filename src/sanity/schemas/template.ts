export const template = {
  name: 'template',
  title: 'Report Card Template',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Template Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'imageUrl',
      title: 'Preview Image',
      type: 'image',
      description: 'Upload a screenshot preview of the marksheet/template',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'downloadUrl',
      title: 'CTA Redirection Link (to jids.in)',
      type: 'url',
      description: 'The link to open/create this template on jids.in',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isPremium',
      title: 'Premium Template?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g., CBSE, ICSE, Kindergarten, Primary, High School',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'imageUrl',
    },
  },
}
