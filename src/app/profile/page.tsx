import Tabs from './(components)/Tabs'

export default async function Page() {
  return (
    <>
      <div>Your profile</div>
      <div className="mb-8 flex w-full flex-col items-center">
        <Tabs />
      </div>
    </>
  )
}
