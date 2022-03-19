import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TreeView } from '../TreeView'
import { DataSource } from '../types'
import { treeNodeFactory } from '../../../__mocks__/treeNode'

const dataSource: DataSource = {
  getPageSize: () => 10,
  getData: () =>
    Promise.resolve({
      totalSize: 10,
      last: true,
      content: [],
      pageSize: 10,
      page: 0,
    }),
}

describe('<TreeView />', () => {
  it('SHOULD display items and its children WHEN tree is not collapsible', () => {
    const data = [
      treeNodeFactory({
        label: 'Item 1',
        children: [
          treeNodeFactory({ label: 'Item 1-1' }),
          treeNodeFactory({ label: 'Item 1-2' }),
        ],
      }),
      treeNodeFactory({ label: 'Item 2' }),
      treeNodeFactory({
        label: 'Item 3',
        children: [
          treeNodeFactory({ label: 'Item 3-1' }),
          treeNodeFactory({ label: 'Item 3-2' }),
        ],
      }),
    ]

    render(
      <TreeView
        data={data}
        dataSource={dataSource}
        value={[]}
        onSelect={jest.fn()}
        onDeselect={jest.fn()}
      />
    )

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 1-1')).toBeInTheDocument()
    expect(screen.getByText('Item 1-2')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
    expect(screen.getByText('Item 3-1')).toBeInTheDocument()
    expect(screen.getByText('Item 3-2')).toBeInTheDocument()
  })

  it('SHOULD display children WHEN user clicks on an expand button', () => {
    const data = [
      treeNodeFactory({
        label: 'Item 1',
        children: [
          treeNodeFactory({ label: 'Item 1-1' }),
          treeNodeFactory({ label: 'Item 1-2' }),
        ],
      }),
    ]

    render(
      <TreeView
        data={data}
        dataSource={dataSource}
        value={[]}
        collapsible
        onSelect={jest.fn()}
        onDeselect={jest.fn()}
      />
    )

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.queryByText('Item 1-1')).not.toBeInTheDocument()
    expect(screen.queryByText('Item 1-2')).not.toBeInTheDocument()

    userEvent.click(screen.getByTestId('expand-node'))

    expect(screen.getByText('Item 1-1')).toBeInTheDocument()
    expect(screen.getByText('Item 1-2')).toBeInTheDocument()
  })

  it('SHOULD hide children WHEN children are displayed and user clicks on an expand button', () => {
    const data = [
      treeNodeFactory({
        label: 'Item 1',
        children: [
          treeNodeFactory({ label: 'Item 1-1' }),
          treeNodeFactory({ label: 'Item 1-2' }),
        ],
      }),
    ]

    render(
      <TreeView
        data={data}
        dataSource={dataSource}
        value={[]}
        collapsible
        onSelect={jest.fn()}
        onDeselect={jest.fn()}
      />
    )

    userEvent.click(screen.getByTestId('expand-node'))

    expect(screen.getByText('Item 1-1')).toBeInTheDocument()
    expect(screen.getByText('Item 1-2')).toBeInTheDocument()

    userEvent.click(screen.getByTestId('expand-node'))

    expect(screen.queryByText('Item 1-1')).not.toBeInTheDocument()
    expect(screen.queryByText('Item 1-2')).not.toBeInTheDocument()
  })
})
