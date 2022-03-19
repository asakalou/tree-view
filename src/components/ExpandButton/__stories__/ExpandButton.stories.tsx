import { useState } from 'react'
import { ExpandButton, ExpandButtonProps } from '../ExpandButton'

export default {
  title: 'Components/ExpandButton',
  component: ExpandButton,
  argTypes: {
    onClick: { action: 'click' },
  },
}

export function Primary(args: ExpandButtonProps) {
  return <ExpandButton {...args} />
}

export function Preview() {
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => setExpanded((state) => !state)

  return <ExpandButton expanded={expanded} onClick={handleClick} />
}
