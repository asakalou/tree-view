import { useCallback, useMemo, useState } from 'react'
import { TreeView } from '../TreeView'
import { generateData } from './data/generator'
import { RenderItem, TreeNode } from '../types'
import { StoryLayout } from './StoryLayout'
import { lazyLoadDataSource, staticDataSource } from './data/dataSource'
import { Checkbox } from '../../Checkbox'
import { ExpandButton } from '../../ExpandButton'
import { staticData } from './data/staticTree.data'

export default {
  title: 'TreeView',
  component: TreeView,
}

export function Primary() {
  const [value, setValue] = useState<string[]>([])

  const handleSelect = (node: TreeNode) => {
    setValue((state) => state.concat([node.value]))
  }

  const handleDeselect = (node: TreeNode) => {
    setValue((state) => state.filter((v) => v !== node.value))
  }

  return (
    <StoryLayout
      title="Static Data"
      description="TreeView with static data."
      value={value}
    >
      <TreeView
        data={staticData}
        value={value}
        dataSource={staticDataSource}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
        collapsible={false}
      />
    </StoryLayout>
  )
}

export function LazyLoading() {
  const initialData = useMemo(
    () => generateData('Root', 'root', 10, 0, true),
    []
  )
  const [value, setValue] = useState<string[]>([])

  const handleSelect = useCallback((node: TreeNode) => {
    setValue((state) => state.concat([node.value]))
  }, [])

  const handleDeselect = useCallback((node: TreeNode) => {
    setValue((state) => state.filter((v) => v !== node.value))
  }, [])

  return (
    <StoryLayout
      title="Lazy Loading"
      description="TreeView with lazy loading dataSource."
      value={value}
    >
      <TreeView
        data={initialData}
        value={value}
        dataSource={lazyLoadDataSource}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
        collapsible
      />
    </StoryLayout>
  )
}

export function CustomRender() {
  const initialData = useMemo(
    () => generateData('Root', 'root', 10, 0, true),
    []
  )
  const [value, setValue] = useState<string[]>([])

  const handleSelect = useCallback((node: TreeNode) => {
    setValue((state) => state.concat([node.value]))
  }, [])

  const handleDeselect = useCallback((node: TreeNode) => {
    setValue((state) => state.filter((v) => v !== node.value))
  }, [])

  const renderItem = useCallback<RenderItem>(
    ({
      item,
      collapsed,
      collapsible,
      selected,
      toggleCollapse,
      toggleSelection,
    }) => (
      <div>
        <Checkbox checked={selected} onChange={toggleSelection} />
        <span>Custom {item.label} 🌟</span>
        {collapsible && (
          <ExpandButton expanded={!collapsed} onClick={toggleCollapse} />
        )}
      </div>
    ),
    []
  )

  return (
    <StoryLayout
      title="Custom renderItem"
      description="TreeView with lazy loading dataSource. Load more is displayed until there are no items left to load."
      value={value}
    >
      <TreeView
        data={initialData}
        value={value}
        dataSource={lazyLoadDataSource}
        renderItem={renderItem}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
        collapsible
      />
    </StoryLayout>
  )
}
