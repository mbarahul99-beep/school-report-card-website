import { type SchemaTypeDefinition } from 'sanity'
import { pageSetting } from './schemas/pageSetting'
import { post } from './schemas/post'
import { template } from './schemas/template'
import { feature } from './schemas/feature'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pageSetting, post, template, feature],
}
