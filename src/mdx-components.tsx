import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mx-8 mb-4 text-center text-4xl font-bold text-purple-500">
        {children}
      </h1>
    ),
    p: ({ children }) => (
      <p className="mb-4 w-full pl-8 pr-8 text-left">{children}</p>
    ),
    ...components,
  }
}
