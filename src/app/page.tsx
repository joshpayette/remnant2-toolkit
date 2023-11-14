import BuildContainer from '@/components/build-container'
import Armor from '@/components/armor'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <BuildContainer>
        <Armor variant="helm" />
        <Armor variant="torso" />
        <Armor variant="legs" />
        <Armor variant="gloves" />
        <Armor variant="relic" />
        <Armor variant="amulet" />
        <Armor variant="ring1" />
        <Armor variant="ring2" />
        <Armor variant="ring3" />
        <Armor variant="ring4" />
      </BuildContainer>
    </main>
  )
}
