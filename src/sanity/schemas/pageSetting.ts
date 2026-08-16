export const pageSetting = {
  name: 'pageSetting',
  title: 'Page Settings',
  type: 'document',
  fields: [
    {
      name: 'page',
      title: 'Page Name',
      type: 'string',
      description: 'The page this setting applies to (e.g., home, pricing, about)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'section',
      title: 'Section Name',
      type: 'string',
      description: 'The section of the page (e.g., hero, cta, footer, testimonials)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'key',
      title: 'Setting Key',
      type: 'string',
      description: 'The unique identifier key (e.g., hero_title, hero_subtitle)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'value',
      title: 'Text Value',
      type: 'text',
      description: 'The actual text value displayed on the site',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'key',
      subtitle: 'page',
    },
  },
}
