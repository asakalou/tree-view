import { useCallback, useEffect, useState } from 'react'
import { DataState, TreeNode } from '../types'
import { useTreeViewContext } from '../TreeViewContext'

type UseDataSourceResult = {
  dataState: DataState
  loadMore: () => void
}

export function useDataSource(item: TreeNode): UseDataSourceResult {
  const { dataSource } = useTreeViewContext()
  const [dataState, setDataState] = useState<DataState>(() => ({
    type: 'loaded',
    data: {
      content: item.children || [],
      page: item.children?.length ? 0 : -1,
      last: !item.hasMoreItems,
      pageSize: dataSource.getPageSize(),
      totalSize: 0,
    },
  }))

  const loadMore = useCallback(async () => {
    try {
      setDataState((currentData) => ({
        ...currentData,
        type: 'loading',
      }))

      const result = await dataSource.getData({
        item,
        page: dataState.data.page + 1,
        size: dataSource.getPageSize(),
      })

      setDataState((state) => ({
        type: 'loaded',
        data: {
          content: state.data.content.concat(result.content),
          pageSize: state.data.pageSize,
          page: result.page,
          totalSize: result.totalSize,
          last: result.last,
        },
      }))
    } catch (e) {
      setDataState((currentData) => ({
        ...currentData,
        type: 'error',
      }))
    }
  }, [item, dataSource, dataState])

  useEffect(() => {
    if (item.hasMoreItems) {
      loadMore()
    }
  }, [item])

  return {
    dataState,
    loadMore,
  }
}
