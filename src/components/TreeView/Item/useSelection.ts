import { useCallback, useMemo } from 'react'
import { TreeNode } from '../types'
import { useTreeViewContext } from '../TreeViewContext'

type UseSelectionResult = {
  selected: boolean
  toggleSelection: () => void
}

/**
 * Handles the selection feature of the Tree
 *
 * @param item - tree node
 */
export function useSelection(item: TreeNode): UseSelectionResult {
  const { value, onSelect, onDeselect } = useTreeViewContext()
  const selected = useMemo(() => value.includes(item.value), [item, value])

  const toggleSelection = useCallback(() => {
    if (selected) {
      onDeselect(item)
    } else {
      onSelect(item)
    }
  }, [item, selected, onSelect, onDeselect])

  return { selected, toggleSelection }
}
