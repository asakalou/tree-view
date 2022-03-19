import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ExpandButton } from '../ExpandButton'

describe('<ExpandButton />', () => {
  it('SHOULD display button', () => {
    render(<ExpandButton expanded onClick={jest.fn()} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('SHOULD call onClick WHEN user clicks on the button', () => {
    const onClickMock = jest.fn()
    render(<ExpandButton expanded onClick={onClickMock} />)

    userEvent.click(screen.getByRole('button'))

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
