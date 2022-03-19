import { useMemo } from 'react'
import { DataSource, RenderItem, TreeNode } from './types'
import { ItemList } from './ItemList'
import { TreeViewContext, TreeViewContextValue } from './TreeViewContext'
import styles from './styles.css'

export type TreeViewProps = {
  /**
   * Initial data for tree view
   */
  data: TreeNode[]

  /**
   * Define whether tree nodes are able to expand/collapse its content
   */
  collapsible?: boolean

  /**
   * Selected items
   */
  value: string[]

  /**
   * Tree data source
   */
  dataSource: DataSource

  /**
   * Callback for an item select event
   *
   * @param node
   */
  onSelect: (node: TreeNode) => void

  /**
   * Callback for an item deselect event
   *
   * @param node
   */
  onDeselect: (node: TreeNode) => void

  /**
   * Custom render item
   */
  renderItem?: RenderItem
}

export function TreeView({
  value,
  onSelect,
  onDeselect,
  data,
  dataSource,
  renderItem,
  collapsible,
}: TreeViewProps) {
  const contextValue = useMemo<TreeViewContextValue>(
    () => ({
      renderItem,
      collapsible,
      value,
      dataSource,
      onSelect,
      onDeselect,
    }),
    [renderItem, collapsible, value, onSelect, onDeselect]
  )

  const rootItem = useMemo<TreeNode>(
    () => ({
      label: '',
      value: '',
      children: data,
    }),
    [data]
  )

  return (
    <TreeViewContext.Provider value={contextValue}>
      <div className={styles.root}>
        <ItemList item={rootItem} />
      </div>
    </TreeViewContext.Provider>
  )
}
