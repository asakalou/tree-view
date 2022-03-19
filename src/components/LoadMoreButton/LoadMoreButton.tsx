import { ReactNode } from 'react'
import styles from './styles.css'

export type LoadMoreButtonProps = {
  children?: ReactNode
  loading?: boolean
  onClick: () => void
}

export function LoadMoreButton({
  children,
  loading,
  onClick,
}: LoadMoreButtonProps) {
  return (
    <button
      className={styles.root}
      type="button"
      disabled={loading}
      onClick={onClick}
    >
      {children || 'Load more'}
    </button>
  )
}
