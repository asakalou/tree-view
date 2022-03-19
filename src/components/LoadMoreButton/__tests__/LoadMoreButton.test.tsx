import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoadMoreButton } from '../LoadMoreButton'

describe('<LoadMoreButton />', () => {
  it('SHOULD display button with "Load more" text by default', () => {
    render(<LoadMoreButton onClick={jest.fn()} />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Load more')
  })

  it('SHOULD call onClick WHEN user clicks on the button', () => {
    const onClickMock = jest.fn()
    render(<LoadMoreButton onClick={onClickMock} />)

    userEvent.click(screen.getByRole('button'))

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
