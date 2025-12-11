declare module '*.png' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '*.jpg' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '*.jpeg' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '*.gif' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '*.svg' {
  const content: import('next/image').StaticImageData
  export default content
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >
}

declare module '*.webp' {
  const content: import('next/image').StaticImageData
  export default content
}
