import { ReactNode } from 'react'

/**
 * That's a draft type for the node
 * can be extended with additional fields by request
 */
export type TreeNode = {
  /**
   * Label
   */
  label: string
  /**
   * Value
   */
  value: string
  /**
   * Children nodes
   */
  children?: TreeNode[]
  /**
   * Initially we don't know whether this node has child items to load
   * so this is helpful flag to understand that we should display show more or do lazy loading
   */
  hasMoreItems?: boolean
}

export type PaginatedResult<T> = {
  /**
   * List of paginated items
   */
  content: T[]
  /**
   * Current page
   */
  page: number
  /**
   * Requested page size
   */
  pageSize: number
  /**
   * Total amount of items in db
   */
  totalSize: number
  /**
   * Is current page last or there are more pages to request
   */
  last: boolean
}

export type RenderItem = (props: {
  item: TreeNode
  selected: boolean
  collapsible: boolean
  collapsed: boolean
  toggleCollapse: () => void
  toggleSelection: () => void
}) => ReactNode

export interface DataSource {
  /**
   * Requested page size
   */
  getPageSize: () => number
  /**
   * Request the data
   *
   * @param request
   */
  getData: (request: {
    page: number
    size: number
    item: TreeNode
  }) => Promise<PaginatedResult<TreeNode>>
}

export type TreeViewProps = {
  /**
   * Initial data for tree view
   */
  data: TreeNode[]
  /**
   * Custom render item function
   */
  renderItem: RenderItem
  /**
   * DataSource which is responsible for data loading
   */
  dataSource: DataSource
}

type DataSourceResult = {
  content: TreeNode[]
  page: number
  pageSize: number
  totalSize: number
  last: boolean
}

type LoadingState = {
  type: 'loading'
  data: DataSourceResult
}

type LoadedState = {
  type: 'loaded'
  data: DataSourceResult
}

type ErrorState = {
  type: 'error'
  data: DataSourceResult
  error?: string
}

export type DataState = LoadingState | LoadedState | ErrorState
