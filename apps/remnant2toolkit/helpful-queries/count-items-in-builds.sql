#--- This example counts all relic fragments, but you can use any item ids
SELECT
  itemId,
  COUNT(*) as count
FROM
  BuildItems
WHERE
  itemId IN (
    'j1aele',
    '3aqiq5',
    '7u1bma',
    '8q8xe3',
    '51y6ih',
    'fuikyq',
    'xqklut',
    'omefk5',
    '1pddio',
    'erp2mp',
    'j7k57r',
    'aci99s',
    'y52c32',
    'j87rzn',
    't8jgpe',
    'm16fn9',
    '77ch7i',
    'yu7d57',
    'w5jmys',
    'wlnbc1',
    'w8ruyt',
    'ygdexg',
    '0jam5w',
    'alp59n',
    '2bqp66',
    'fuhykd',
    '7c8uka',
    'yk8dng',
    '74x7jt',
    'qqmdc0',
    'lbtjq3',
    '0y36lm',
    'oszz4u',
    'oiiiu2',
    'h9e463'
  )
GROUP BY
  itemId
ORDER BY
  count DESC;