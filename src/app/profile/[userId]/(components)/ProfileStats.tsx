'use server'

import { prisma } from '@/features/db'
import { cn } from '@/lib/classnames'

interface Props {
  userId: string
}

export async function ProfileStats({ userId }: Props) {
  // get a count of all the builds created by the current user
  const [buildsCreated, favoritesEarned, loadoutCounts, featuredBuilds] =
    await Promise.all([
      await prisma.build.count({
        where: { createdById: userId, isPublic: true },
      }),
      await prisma.buildVoteCounts.count({
        where: {
          build: {
            createdById: userId,
            isPublic: true,
          },
        },
      }),
      await prisma.userLoadouts.count({
        where: {
          build: {
            createdById: userId,
            isPublic: true,
          },
        },
      }),
      await prisma.build.count({
        where: {
          createdById: userId,
          isFeaturedBuild: true,
          isPublic: true,
        },
      }),
    ])

  return (
    <div className="grid grid-cols-2 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
      <StatBox
        stat={{ name: 'Builds Created', value: buildsCreated }}
        index={0}
      />
      <StatBox
        stat={{ name: 'Favorites Earned', value: favoritesEarned }}
        index={1}
      />
      <StatBox
        stat={{ name: 'Loadout Count', value: loadoutCounts }}
        index={2}
      />
      <StatBox
        stat={{ name: 'Featured Builds', value: featuredBuilds }}
        index={3}
      />
    </div>
  )
}

function StatBox({
  stat,
  index,
}: {
  stat: { name: string; value: number }
  index: number
}) {
  return (
    <div
      key={stat.name}
      className={cn(
        index % 2 === 1 ? 'sm:border-l' : index === 2 ? 'lg:border-l' : '',
        'border-t border-white/5 px-4 py-6 sm:px-6 lg:px-8',
      )}
    >
      <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
      <p className="mt-2 flex items-baseline gap-x-2">
        <span className="text-4xl font-semibold tracking-tight text-white">
          {stat.value}
        </span>
      </p>
    </div>
  )
}
