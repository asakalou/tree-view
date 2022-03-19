import { LoadMoreButton, LoadMoreButtonProps } from '../LoadMoreButton'

export default {
  title: 'Components/LoadMoreButton',
  component: LoadMoreButton,
  argTypes: {
    onClick: { action: 'click' },
  },
}

export function Primary(args: LoadMoreButtonProps) {
  return <LoadMoreButton {...args} />
}
