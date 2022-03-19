import { TreeNode } from '../types'
import { ItemList } from '../ItemList'
import styles from './styles.css'
import { useCollapsible } from './useCollapsible'
import { useSelection } from './useSelection'
import { useTreeViewContext } from '../TreeViewContext'
import { defaultRenderItem } from './defaultRenderItem'

type TreeViewItemProps = {
  item: TreeNode
}

export function Item({ item }: TreeViewItemProps) {
  const { renderItem } = useTreeViewContext()
  const { selected, toggleSelection } = useSelection(item)
  const { collapsed, collapsible, toggleCollapse } = useCollapsible(item)

  return (
    <li className={styles.root}>
      <div className={styles.label}>
        {(renderItem || defaultRenderItem)({
          item,
          selected,
          collapsible,
          collapsed,
          toggleSelection,
          toggleCollapse,
        })}
      </div>

      {!collapsed && <ItemList item={item} />}
    </li>
  )
}
