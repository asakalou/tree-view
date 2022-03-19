import { Item } from '../Item'
import { TreeNode } from '../types'
import styles from './styles.css'
import { useDataSource } from './useDataSource'
import { LoadMoreButton } from '../../LoadMoreButton'

type ItemListProps = {
  item: TreeNode
}

export function ItemList({ item }: ItemListProps) {
  const { dataState, loadMore } = useDataSource(item)

  return (
    <ul className={styles.root}>
      {dataState.data.content.map((row) => (
        <Item key={row.value} item={row} />
      ))}
      {!dataState.data.last && (
        <li className={styles.loadMore}>
          <LoadMoreButton
            loading={dataState.type === 'loading'}
            onClick={loadMore}
          />
        </li>
      )}
    </ul>
  )
}
