import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ children, href }) => (
      <a
        className="text-md text-green-400 hover:text-green-600 hover:underline"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="text-md mb-4 border border-purple-500 p-4">
        {children}
      </blockquote>
    ),
    h1: ({ children }) => (
      <h1 className="mx-8 mb-4 text-4xl font-bold text-purple-500">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mx-8 mb-4 text-2xl font-bold text-white">{children}</h2>
    ),
    img: ({ src, alt }) => (
      <img
        className="mx-auto mb-4"
        src={src}
        alt={alt}
        style={{ maxWidth: '100%' }}
      />
    ),
    p: ({ children }) => (
      <p className="text-md mb-4 w-full pl-8 pr-8 text-center">{children}</p>
    ),
    ...components,
  }
}
