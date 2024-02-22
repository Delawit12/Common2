export default {
    deleteUser: `DELETE FROM users WHERE userId = ?`,
    getUserGenderPercentage: `SELECT
    gender,
    COUNT(*) AS count,
    COUNT(*) / (SELECT COUNT(*) FROM users) * 100 AS percentage
  FROM users
  GROUP BY gender;`,
  getUserStatusPercentage: `SELECT 
  SUM(CASE WHEN activeStatus = 1 THEN 1 ELSE 0 END) AS activeCount,
  SUM(CASE WHEN activeStatus = 0 THEN 1 ELSE 0 END) AS inactiveCount,
  COUNT(*) AS totalCount,
  (SUM(CASE WHEN activeStatus = 1 THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS activePercentage,
  (SUM(CASE WHEN activeStatus = 0 THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS inactivePercentage
FROM users;`,

getUsersCountByRole: `SELECT companyRoles.companyRoleName, COUNT(users.userId) AS userCount,
       (COUNT(users.userId) / (SELECT COUNT(*) FROM users)) * 100 AS userPercentage
FROM companyRoles
LEFT JOIN usersRole ON companyRoles.companyRoleId = usersRole.companyRoleId
LEFT JOIN users ON usersRole.userId = users.userId
GROUP BY companyRoles.companyRoleName;`,

getEmailVerificationStats:
`SELECT 
  COUNT(*) AS totalUsers,
  SUM(CASE WHEN emailStatus = true THEN 1 ELSE 0 END) AS verifiedEmailCount,
  SUM(CASE WHEN emailStatus = false THEN 1 ELSE 0 END) AS nonVerifiedEmailCount,
  (SUM(CASE WHEN emailStatus = true THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS verifiedEmailPercentage,
  (SUM(CASE WHEN emailStatus = false THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS nonVerifiedEmailPercentage
FROM contactVerification;`,

insertIntoRole :  `INSERT INTO usersRole (userId, companyRoleId) VALUES (?, ?);`,

deactivateUser:  `UPDATE users SET activeStatus = 0 WHERE userId = ?`,


}