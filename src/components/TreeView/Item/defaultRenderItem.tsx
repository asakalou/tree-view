import { Checkbox } from '../../Checkbox'
import styles from './styles.css'
import { ExpandButton } from '../../ExpandButton'
import { RenderItem } from '../types'

export const defaultRenderItem: RenderItem = ({
  selected,
  toggleSelection,
  item,
  collapsed,
  collapsible,
  toggleCollapse,
}) => (
  <div className={styles.item}>
    <Checkbox checked={selected} onChange={toggleSelection} />
    <div
      role="button"
      className={styles.labelContent}
      onClick={toggleSelection}
    >
      {item.label}
    </div>
    {collapsible && (
      <ExpandButton expanded={!collapsed} onClick={toggleCollapse} />
    )}
  </div>
)
