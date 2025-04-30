import {defineField, defineType} from 'sanity'
import {isUniqueOtherThanLanguage} from '../helpers/same-slug.helper';

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),

    defineField({
      name: 'navItem1',
      title: 'Nav Item 1',
      type: 'string',
    }),

    defineField({
      name: 'navItem2',
      title: 'Nav Item 2',
      type: 'string',
    }),

    defineField({
      name: 'navItem3',
      title: 'Nav Item 3',
      type: 'string',
    }),

  ],

  preview: {
    select: {
        lang: 'language',
    },
    prepare({lang}) {
      return {title: `Header - ${lang}`}
    },
  },
})
