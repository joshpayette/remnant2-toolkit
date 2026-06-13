  SELECT
      i.itemId AS 'Item ID',
      COUNT(*) AS 'Total Count'
  FROM BuildItems bi
  INNER JOIN Build b ON bi.buildId = b.id
  INNER JOIN Item i ON bi.itemId = i.itemId
  WHERE b.createdAt >= '2024-09-10 00:00:00'
    AND b.isPublic = true
  GROUP BY i.itemId
  ORDER BY COUNT(*) DESC;