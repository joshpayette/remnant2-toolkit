# Flag builds that contain Spectral Blade + Resonance
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
          BuildItems.itemId IN ('l3zte1', 'dmizlm')
        GROUP BY
          Build.id
        HAVING
          COUNT(DISTINCT BuildItems.itemId) = 2
      ) AS tmp
  );

# Flag builds that contain Stone of Malevolence
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
          BuildItems.itemId IN ('kx65km')
        GROUP BY
          Build.id
        HAVING
          COUNT(DISTINCT BuildItems.itemId) = 1
      ) AS tmp
  );

# Flag builds that contain Sequenced Shot
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
          BuildItems.itemId IN ('23ztdj')
        GROUP BY
          Build.id
        HAVING
          COUNT(DISTINCT BuildItems.itemId) = 1
      ) AS tmp
  );