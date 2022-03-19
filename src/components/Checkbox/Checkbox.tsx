import { MixedCheckbox } from '@reach/checkbox'
import '@reach/checkbox/styles.css'

export type CheckboxProps = {
  /**
   * Checked / unchecked state
   */
  checked?: boolean

  /**
   * Indeterminate state, if true overrides the checked property
   */
  indeterminate?: boolean

  /**
   * On change
   */
  onChange: () => void
}

export function Checkbox({ checked, indeterminate, onChange }: CheckboxProps) {
  return (
    <MixedCheckbox
      checked={indeterminate ? 'mixed' : checked}
      onChange={onChange}
    />
  )
}
