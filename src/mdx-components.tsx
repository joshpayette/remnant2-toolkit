import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ children, href }) => (
      <a
        className="text-md text-primary hover:text-primary hover:underline"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="text-md border-secondary mb-4 border p-4 text-left">
        {children}
      </blockquote>
    ),
    h1: ({ children }) => (
      <h1 className="text-secondary mx-8 mb-4 text-4xl font-bold">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-primary mx-8 mb-4 text-center text-2xl font-bold">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mx-8 mb-4 text-lg font-bold text-white">{children}</h3>
    ),
    img: ({ src, alt }) =>
      !src || !alt ? null : (
        <img
          className="mx-auto mb-4"
          src={src}
          alt={alt}
          style={{ maxWidth: '100%' }}
        />
      ),
    p: ({ children }) => (
      <p className="text-md mb-4 w-full pl-8 pr-8 text-left">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="text-md mb-4 list-disc">{children}</ul>
    ),
    li: ({ children }) => <li className="mb-2 ml-4">{children}</li>,
    ...components,
  }
}
