import { BaseLink } from '@repo/ui';
import { type MDXComponents } from 'mdx/types';

function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-');
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ children, href }) => (
      <BaseLink
        className="text-md text-primary-500 hover:text-primary-300 hover:underline"
        href={href as string}
        rel="noopener noreferrer"
      >
        {children}
      </BaseLink>
    ),
    blockquote: ({ children }) => (
      <blockquote className="text-md border-secondary-500 mb-4 border p-4 text-left">
        {children}
      </blockquote>
    ),
    h1: ({ children }) => (
      <h1 className="text-secondary-500 mx-8 mb-4 text-4xl font-bold">
        {children}
      </h1>
    ),
    h2: ({ children }) => {
      const anchor = getAnchor(children as string);
      return (
        <h2
          id={anchor}
          className="text-primary-500 mx-8 mb-4 text-center text-2xl font-bold"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => (
      <h3 className="text-surface-solid mx-8 mb-4 text-lg font-bold">
        {children}
      </h3>
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
  };
}
