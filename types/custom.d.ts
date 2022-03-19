declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.css' {
  const classNames: { [key: string]: string }
  export = classNames
}
