import { BsChevronDown } from 'react-icons/bs'
import styles from './styles.css'
import { classname } from '../../utils/classname'

export type ExpandButtonProps = {
  expanded: boolean
  onClick: () => void
}

export function ExpandButton({ expanded, onClick }: ExpandButtonProps) {
  return (
    <button
      data-tv-id="expand-node"
      type="button"
      className={classname(styles.root, expanded && styles.expanded)}
      onClick={onClick}
    >
      <BsChevronDown className={styles.icon} />
    </button>
  )
}
