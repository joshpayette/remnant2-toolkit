# Faelins Sigil builds
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
          BuildItems.itemId IN ('drjm15')
        GROUP BY
          Build.id
        HAVING
          COUNT(DISTINCT BuildItems.itemId) = 1
      ) AS tmp
  );

# Starkiller Builds
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
          BuildItems.itemId IN ('hzmyu1')
        GROUP BY
          Build.id
        HAVING
          COUNT(DISTINCT BuildItems.itemId) = 1
      ) AS tmp
  );