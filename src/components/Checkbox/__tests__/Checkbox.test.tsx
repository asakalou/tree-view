import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../Checkbox'

describe('<Checkbox />', () => {
  it('SHOULD display button', () => {
    render(<Checkbox onChange={jest.fn()} />)

    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('SHOULD call onChange WHEN user clicks on the checkbox', () => {
    const onChangeMock = jest.fn()
    render(<Checkbox onChange={onChangeMock} />)

    userEvent.click(screen.getByRole('checkbox'))

    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })
})
