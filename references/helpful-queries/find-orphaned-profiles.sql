SELECT
  *
FROM
  UserProfile
WHERE
  userId NOT IN (
    SELECT
      id
    FROM
      User
  );