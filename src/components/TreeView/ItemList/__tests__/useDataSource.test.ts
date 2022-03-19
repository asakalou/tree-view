import { act, renderHook } from '@testing-library/react-hooks'
import { useDataSource } from '../useDataSource'
import { DataSource } from '../../types'
import * as TreeViewContext from '../../TreeViewContext'
import { treeNodeFactory } from '../../../../__mocks__/treeNode'

const getDataMock = jest.fn()
const getPageSizeMock = jest.fn()
const dataSource: DataSource = {
  getPageSize: getPageSizeMock,
  getData: getDataMock,
}

jest.spyOn(TreeViewContext, 'useTreeViewContext').mockReturnValue({
  dataSource,
  collapsible: true,
  value: [],
  onSelect: jest.fn(),
  onDeselect: jest.fn(),
})

describe('useDataSource', () => {
  it('SHOULD return default state with last = false WHEN node has more child nodes', async () => {
    getPageSizeMock.mockReturnValue(3)
    const item = treeNodeFactory({
      children: [treeNodeFactory(), treeNodeFactory(), treeNodeFactory()],
      hasMoreItems: true,
    })

    const { result } = renderHook(() => useDataSource(item))

    expect(result.current.dataState).toEqual({
      type: 'loading',
      data: {
        content: item.children,
        page: 0,
        last: false,
        pageSize: 3,
        totalSize: 0,
      },
    })

    await act(() => Promise.resolve())
  })

  it('SHOULD return default state with last = true WHEN node has no more child nodes', async () => {
    getPageSizeMock.mockReturnValue(3)
    const item = treeNodeFactory({
      children: [],
      hasMoreItems: false,
    })

    const { result } = renderHook(() => useDataSource(item))

    expect(result.current.dataState).toEqual({
      type: 'loaded',
      data: {
        content: item.children,
        page: -1,
        last: true,
        pageSize: 3,
        totalSize: 0,
      },
    })

    await act(() => Promise.resolve())
  })

  it('SHOULD switch to loading and then to loaded state WHEN loadMode is requested and finished', async () => {
    getPageSizeMock.mockReturnValue(2)
    const requestedContent = [treeNodeFactory(), treeNodeFactory()]
    getDataMock.mockReturnValue({
      content: requestedContent,
      page: 1,
      pageSize: 2,
      totalSize: 4,
      last: true,
    })

    const item = treeNodeFactory({
      children: [treeNodeFactory(), treeNodeFactory()],
      hasMoreItems: true,
    })

    const { result } = renderHook(() => useDataSource(item))

    act(() => {
      result.current.loadMore()
    })

    expect(result.current.dataState).toEqual({
      type: 'loading',
      data: {
        content: item.children,
        last: false,
        page: 0,
        pageSize: 2,
        totalSize: 0,
      },
    })

    await act(() => Promise.resolve())

    expect(result.current.dataState).toEqual({
      type: 'loaded',
      data: {
        content: item.children
          .concat(requestedContent)
          .concat(requestedContent),
        last: true,
        page: 1,
        pageSize: 2,
        totalSize: 4,
      },
    })
  })

  it('SHOULD switch to loading and then to error state WHEN loadMode is requested and failed', async () => {
    getPageSizeMock.mockReturnValue(2)
    getDataMock.mockRejectedValue({})

    const item = treeNodeFactory({
      children: [treeNodeFactory(), treeNodeFactory()],
      hasMoreItems: true,
    })

    const { result } = renderHook(() => useDataSource(item))

    act(() => {
      result.current.loadMore()
    })

    expect(result.current.dataState).toEqual({
      type: 'loading',
      data: {
        content: item.children,
        last: false,
        page: 0,
        pageSize: 2,
        totalSize: 0,
      },
    })

    await act(() => Promise.resolve())

    expect(result.current.dataState).toEqual({
      type: 'error',
      data: {
        content: item.children,
        last: false,
        page: 0,
        pageSize: 2,
        totalSize: 0,
      },
    })
  })
})
