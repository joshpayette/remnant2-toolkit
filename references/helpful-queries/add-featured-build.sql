UPDATE
  Build
SET
  isFeaturedBuild = true,
  dateFeatured = NOW(),
  videoUrl = ""
WHERE
  id = ?;