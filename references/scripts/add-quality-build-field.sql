UPDATE
  Build
SET
  isQualityBuild = true
WHERE
  Build.id IN (
    SELECT
      buildId
    FROM
      (
        SELECT
          Build.id as buildId
        FROM
          Build
          LEFT JOIN (
            SELECT
              BuildItems.buildId,
              COUNT(
                CASE
                  WHEN BuildItems.category NOT IN (
                    'skill',
                    'prism',
                    'fusion',
                    'pylon',
                    'helm',
                    'torso',
                    'legs',
                    'gloves',
                    'concoction',
                    'consumable'
                  )
                  AND NOT (
                    BuildItems.category = 'relicfragment'
                    AND BuildItems.index = 8
                  ) THEN 1
                  ELSE NULL
                END
              ) as totalItems,
              SUM(
                CASE
                  WHEN BuildItems.category = 'archtype'
                  AND BuildItems.itemId <> '' THEN 1
                  ELSE 0
                END
              ) as archtypeCount,
              SUM(
                CASE
                  WHEN BuildItems.category = 'skill'
                  AND BuildItems.itemId <> '' THEN 1
                  ELSE 0
                END
              ) as skillCount,
              SUM(
                CASE
                  WHEN BuildItems.category = 'relic'
                  AND BuildItems.itemId <> '' THEN 1
                  ELSE 0
                END
              ) as relicCount,
              SUM(
                CASE
                  WHEN BuildItems.category = 'relicfragment'
                  AND BuildItems.itemId <> '' THEN 1
                  ELSE 0
                END
              ) as relicfragmentCount,
              SUM(
                CASE
                  WHEN BuildItems.category = 'weapon'
                  AND BuildItems.itemId <> '' THEN 1
                  ELSE 0
                END
              ) as weaponCount,
              SUM(
                CASE
                  WHEN BuildItems.category = 'mod'
                  AND BuildItems.itemId <> '' THEN 1
                  ELSE 0
                END
              ) as modCount,
              SUM(
                CASE
                  WHEN BuildItems.category = 'mutator'
                  AND BuildItems.itemId <> '' THEN 1
                  ELSE 0
                END
              ) as mutatorCount,
              SUM(
                CASE
                  WHEN BuildItems.category = 'amulet'
                  AND BuildItems.itemId <> '' THEN 1
                  ELSE 0
                END
              ) as amuletCount,
              SUM(
                CASE
                  WHEN BuildItems.category = 'ring'
                  AND BuildItems.itemId <> '' THEN 1
                  ELSE 0
                END
              ) as ringCount,
              SUM(
                CASE
                  WHEN BuildItems.category = 'trait'
                  AND BuildItems.itemId <> '' THEN BuildItems.amount
                  ELSE 0
                END
              ) as traitSum
            FROM
              BuildItems
            WHERE
              BuildItems.itemId <> ''
            GROUP BY
              BuildItems.buildId
          ) as ItemCounts ON Build.id = ItemCounts.buildId
        WHERE
          CHAR_LENGTH(Build.description) >= 200
          AND Build.name != 'My Build'
          AND Build.name NOT LIKE '%(copy)%'
          AND EXISTS (
            SELECT
              1
            FROM
              BuildTags
            WHERE
              BuildTags.BuildId = Build.Id
          )
          AND (ItemCounts.archtypeCount = 2)
          AND (ItemCounts.skillCount = 2)
          AND (ItemCounts.relicCount = 1)
          AND (ItemCounts.relicfragmentCount > 2)
          AND (ItemCounts.weaponCount = 3)
          AND (ItemCounts.modCount >= 2)
          AND (ItemCounts.mutatorCount >= 2)
          AND (ItemCounts.amuletCount = 1)
          AND (ItemCounts.ringCount = 4)
      ) as QualifiedBuilds
  );