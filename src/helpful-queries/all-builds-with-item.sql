SELECT
  Build.*
FROM
  Build
  JOIN BuildItems ON Build.id = BuildItems.buildId
WHERE
  BuildItems.itemId = 'ITEM_ID';

#-------------------------------------
SELECT
  COUNT(Build.id) AS buildCount
FROM
  Build
  JOIN BuildItems ON Build.id = BuildItems.buildId
WHERE
  BuildItems.itemId = 'ITEM_ID';