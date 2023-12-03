import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/tracker')

  return <h1 className="text-4xl">Redirecting...</h1>
}
