import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Landing pages',
  type: 'document',
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Document Title',
      type: 'string',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'internalTitle',
    }
  }
})
