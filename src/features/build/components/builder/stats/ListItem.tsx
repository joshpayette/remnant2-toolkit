import { ReactNode } from 'react'

export function ListItem({ children }: { children: ReactNode }) {
  return <li className="text-on-background-variant">{children}</li>
}
