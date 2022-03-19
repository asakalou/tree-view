export const generateData = (
  labelPrefix: string,
  valuePrefix: string,
  count: number,
  startIndex: number,
  hasMoreItems: boolean
) =>
  Array(count)
    .fill('')
    .map((_, index) => ({
      label: `${labelPrefix} - ${startIndex + index + 1}`,
      value: `${valuePrefix} - ${startIndex + index + 1}`,
      children: [],
      hasMoreItems,
    }))
