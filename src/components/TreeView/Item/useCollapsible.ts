import { useCallback, useState } from 'react'
import { useTreeViewContext } from '../TreeViewContext'
import { TreeNode } from '../types'

type UseCollapsibleResult = {
  collapsible: boolean
  collapsed: boolean
  toggleCollapse: () => void
}

/**
 * Handles the collapse/expand feature of the Tree
 *
 * @param item - tree node
 */
export function useCollapsible(item: TreeNode): UseCollapsibleResult {
  const { collapsible } = useTreeViewContext()
  const [collapsed, setCollapsed] = useState(true)
  const isNodeCollapsible =
    collapsible && (item.hasMoreItems || !!item.children?.length)

  const toggleCollapse = useCallback(() => {
    setCollapsed((state) => !state)
  }, [])

  return {
    collapsible: isNodeCollapsible,
    collapsed: isNodeCollapsible ? collapsed : false,
    toggleCollapse,
  }
}
