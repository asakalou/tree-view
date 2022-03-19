import { Checkbox, CheckboxProps } from '../Checkbox'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    onChange: { action: 'change' },
  },
}

export function Checked(args: CheckboxProps) {
  return <Checkbox checked {...args} />
}

export function Unchecked(args: CheckboxProps) {
  return <Checkbox checked={false} {...args} />
}

export function Indeterminate(args: CheckboxProps) {
  return <Checkbox indeterminate {...args} />
}
