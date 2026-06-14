import type {SchemaTypeDefinition} from 'sanity'

import {authorType} from './author'
import {blogPostType} from './blogPost'
import {categoryType} from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPostType, authorType, categoryType],
}
