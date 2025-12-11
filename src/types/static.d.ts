// src/types/static.d.ts
declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >
}

declare module '*.webp' {
  const content: string
  export default content
}
