export function classname(...args: (string | undefined)[]): string | undefined {
  const classes = args.filter((cls) => Boolean(cls))

  return classes.length ? classes.join(' ') : undefined
}
