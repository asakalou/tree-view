import { renderHook } from '@testing-library/react-hooks'
import { useCollapsible } from '../useCollapsible'

import * as TreeViewContext from '../../TreeViewContext'
import { treeNodeFactory } from '../../../../__mocks__/treeNode'
import { TreeViewContextValue } from '../../TreeViewContext'

const useTreeViewContextMock = jest.spyOn(TreeViewContext, 'useTreeViewContext')

const createTreeContextValue = (
  props: Partial<TreeViewContextValue>
): TreeViewContextValue => ({
  dataSource: {
    getPageSize: jest.fn(),
    getData: jest.fn(),
  },
  collapsible: true,
  value: ['1', '2', '3'],
  onSelect: jest.fn(),
  onDeselect: jest.fn(),
  ...props,
})

describe('useCollapsible', () => {
  it('SHOULD be collapsed WHEN collapsible is true and item has more items', () => {
    useTreeViewContextMock.mockReturnValue(
      createTreeContextValue({ collapsible: true })
    )
    const item = treeNodeFactory({
      value: '1',
      hasMoreItems: true,
    })

    const { result } = renderHook(() => useCollapsible(item))

    expect(result.current.collapsible).toBeTruthy()
    expect(result.current.collapsed).toBeTruthy()
  })

  it('SHOULD not be collapsed WHEN collapsible is true and item children has items', () => {
    useTreeViewContextMock.mockReturnValue(
      createTreeContextValue({ collapsible: true })
    )
    const item = treeNodeFactory({
      value: '1',
      children: [treeNodeFactory()],
      hasMoreItems: false,
    })

    const { result } = renderHook(() => useCollapsible(item))

    expect(result.current.collapsible).toBeTruthy()
    expect(result.current.collapsed).toBeTruthy()
  })

  it('SHOULD not be collapsed WHEN collapsible is true and item has no more items', () => {
    useTreeViewContextMock.mockReturnValue(
      createTreeContextValue({ collapsible: true })
    )
    const item = treeNodeFactory({
      value: '1',
      hasMoreItems: false,
    })

    const { result } = renderHook(() => useCollapsible(item))

    expect(result.current.collapsible).toBeFalsy()
    expect(result.current.collapsed).toBeFalsy()
  })

  it('SHOULD not be collapsed WHEN collapsible is false', () => {
    useTreeViewContextMock.mockReturnValue(
      createTreeContextValue({ collapsible: false })
    )
    const item = treeNodeFactory({
      value: '1',
      hasMoreItems: true,
    })

    const { result } = renderHook(() => useCollapsible(item))

    expect(result.current.collapsible).toBeFalsy()
    expect(result.current.collapsed).toBeFalsy()
  })
})
