import BuildContainer from '@/components/build-container'
import Armor from '@/components/armor'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <BuildContainer>
        <Armor slot="helm" />
        <Armor slot="torso" />
        <Armor slot="legs" />
        <Armor slot="gloves" />
        <Armor slot="relic" />
        <Armor slot="amulet" />
        <Armor slot="ring1" />
        <Armor slot="ring2" />
        <Armor slot="ring3" />
        <Armor slot="ring4" />
      </BuildContainer>
    </main>
  )
}
