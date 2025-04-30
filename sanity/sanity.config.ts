import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {documentInternationalization} from '@sanity/document-internationalization'

export default defineConfig({
  name: 'default',
  title: 'shopagolic',

  projectId: 'vheuz83x',
  dataset: 'dev',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'ja', title: 'Japanese'},
      ],
      schemaTypes: ['product', 'header'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
