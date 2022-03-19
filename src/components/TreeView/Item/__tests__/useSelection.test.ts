import { renderHook } from '@testing-library/react-hooks'
import { useSelection } from '../useSelection'
import * as TreeViewContext from '../../TreeViewContext'
import { treeNodeFactory } from '../../../../__mocks__/treeNode'

const onSelectMock = jest.fn()
const onDeselectMock = jest.fn()
jest.spyOn(TreeViewContext, 'useTreeViewContext').mockReturnValue({
  dataSource: {
    getPageSize: jest.fn(),
    getData: jest.fn(),
  },
  collapsible: true,
  value: ['1', '2', '3'],
  onSelect: onSelectMock,
  onDeselect: onDeselectMock,
})

describe('useSelection', () => {
  it('SHOULD return selected = true WHEN item is selected', () => {
    const item = treeNodeFactory({
      value: '1',
    })

    const { result } = renderHook(() => useSelection(item))

    expect(result.current.selected).toBeTruthy()
  })

  it('SHOULD return selected = false WHEN item is not selected', () => {
    const item = treeNodeFactory({
      value: '1234',
    })

    const { result } = renderHook(() => useSelection(item))

    expect(result.current.selected).toBeFalsy()
  })

  it('SHOULD call onSelect WHEN item is not selected and toggleSelection is invoked', () => {
    const item = treeNodeFactory({
      value: '1234',
    })
    const { result } = renderHook(() => useSelection(item))

    result.current.toggleSelection()

    expect(onSelectMock).toHaveBeenCalledTimes(1)
    expect(onDeselectMock).not.toHaveBeenCalled()
  })

  it('SHOULD call onDeselect WHEN item is selected and toggleSelection is invoked', () => {
    const item = treeNodeFactory({
      value: '1',
    })
    const { result } = renderHook(() => useSelection(item))

    result.current.toggleSelection()

    expect(onDeselectMock).toHaveBeenCalledTimes(1)
    expect(onSelectMock).not.toHaveBeenCalled()
  })
})
