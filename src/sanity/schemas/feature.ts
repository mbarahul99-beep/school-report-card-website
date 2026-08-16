export const feature = {
  name: 'feature',
  title: 'SaaS Feature',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Feature Title',
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
      name: 'iconName',
      title: 'Icon Identifier',
      type: 'string',
      description: 'The Lucide icon key name (e.g. CheckCircle, Settings, FileSpreadsheet, Lock)',
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
      subtitle: 'iconName',
    },
  },
}
