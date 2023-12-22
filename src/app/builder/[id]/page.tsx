async function getBuild(id: string) {
  const res = await fetch(`/api/builds/${id}`)
  return res.json()
}

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const buildData = getBuild(id)
  const build = await buildData

  return (
    <div>
      <h1>Build {id}</h1>
      <pre>{JSON.stringify(getBuild(id), null, 2)}</pre>
    </div>
  )
}
