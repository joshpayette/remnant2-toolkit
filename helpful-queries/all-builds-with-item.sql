SELECT
  Build.*
FROM
  Build
  JOIN BuildItems ON Build.id = BuildItems.buildId
WHERE
  BuildItems.itemId IN ('ITEM_ID_1', 'ITEM_ID_2', 'ITEM_ID_3');

#-------------------------------------
SELECT
  COUNT(Build.id) AS buildCount
FROM
  Build
  JOIN BuildItems ON Build.id = BuildItems.buildId
WHERE
  BuildItems.itemId IN ('ITEM_ID_1', 'ITEM_ID_2', 'ITEM_ID_3');