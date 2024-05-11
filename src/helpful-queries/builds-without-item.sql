SELECT
  COUNT(DISTINCT b.id) as build_count
FROM
  Build b
  LEFT JOIN BuildItems bi ON b.id = bi.buildId
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      BuildItems bi2
    WHERE
      bi2.buildId = b.id
      AND bi2.itemId = '2vgobq'
  )
  AND isPublic = true
  AND isPatchAffected = false;