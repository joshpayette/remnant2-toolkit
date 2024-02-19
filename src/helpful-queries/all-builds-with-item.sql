SELECT
  Build.*
FROM
  Build
  JOIN BuildItems ON Build.id = BuildItems.buildId
WHERE
  BuildItems.itemId = 'ITEM_ID';