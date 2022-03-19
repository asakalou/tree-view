import { createContext, useContext } from 'react'
import { DataSource, RenderItem, TreeNode } from './types'

export type TreeViewContextValue = {
  renderItem?: RenderItem
  collapsible?: boolean
  value: string[]
  dataSource: DataSource
  onSelect: (node: TreeNode) => void
  onDeselect: (node: TreeNode) => void
}

export const TreeViewContext = createContext<TreeViewContextValue>({
  value: [],
  dataSource: {
    getPageSize: () => 10,
    getData: () =>
      Promise.resolve({
        content: [],
        last: false,
        page: 0,
        pageSize: 10,
        totalSize: 0,
      }),
  },
  onSelect: () => {},
  onDeselect: () => {},
})

export const useTreeViewContext = () => useContext(TreeViewContext)
