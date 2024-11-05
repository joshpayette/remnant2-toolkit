# Flag builds that contain Star Shot + Power Trip
UPDATE
  Build
SET
  isPatchAffected = true
WHERE
  id IN (
    SELECT
      id
    FROM
      (
        SELECT
          Build.id
        FROM
          Build
          JOIN BuildItems ON Build.id = BuildItems.buildId
        WHERE
          BuildItems.itemId IN ('tldnuq', 'o3w3u5')
          AND Build.createdAt < '2024-11-05'
        GROUP BY
          Build.id
        HAVING
          COUNT(DISTINCT BuildItems.itemId) = 2
      ) AS tmp
  );