import faker from '@faker-js/faker'
import { TreeNode } from '../components/TreeView'

export const treeNodeFactory = (data?: Partial<TreeNode>): TreeNode => ({
  label: faker.name.title(),
  value: faker.datatype.uuid(),
  children: [],
  hasMoreItems: false,
  ...data,
})
