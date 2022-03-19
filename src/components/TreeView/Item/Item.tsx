import { TreeNode } from '../types'
import { ItemList } from '../ItemList'
import styles from './styles.css'
import { Checkbox } from '../../Checkbox'
import { useCollapsible } from './useCollapsible'
import { ExpandButton } from '../../ExpandButton'
import { useSelection } from './useSelection'
import { useTreeViewContext } from '../TreeViewContext'

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
        {renderItem ? (
          renderItem({
            item,
            selected,
            collapsible,
            collapsed,
            toggleSelection,
            toggleCollapse,
          })
        ) : (
          <>
            <Checkbox checked={selected} onChange={toggleSelection} />
            <span className={styles.labelContent} onClick={toggleSelection}>
              {item.label}
            </span>
            {collapsible && (
              <ExpandButton expanded={!collapsed} onClick={toggleCollapse} />
            )}
          </>
        )}
      </div>

      {!collapsed && <ItemList item={item} />}
    </li>
  )
}
