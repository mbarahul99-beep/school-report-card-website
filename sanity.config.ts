import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schema'

export default defineConfig({
  name: 'school-report-card-studio',
  title: 'School Report Card Admin',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ujk8xzn3', // Dummy project ID fallback
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [structureTool()],

  schema: schema,
})
