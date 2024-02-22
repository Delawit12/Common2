export default {
    deleteUser: `
    DELETE users, usersRole, usersPassword, contactVerification, usersProfile, usersPictures, conversations, messages, messageContent
    FROM users
    LEFT JOIN usersRole ON users.userId = usersRole.userId
    LEFT JOIN usersPassword ON users.userId = usersPassword.userId
    LEFT JOIN contactVerification ON users.userId = contactVerification.userId
    LEFT JOIN usersProfile ON users.userId = usersProfile.userId
    LEFT JOIN usersPictures ON users.userId = usersPictures.userId
    LEFT JOIN conversations ON users.userId = conversations.userOneId OR users.userId = conversations.userTwoId
    LEFT JOIN messages ON conversations.conversationId = messages.conversationId
    LEFT JOIN messageContent ON messages.messageId = messageContent.messageId
    WHERE users.userId = :userId;`,
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
getUsersRegisteredInSpecificMonth: `SELECT * FROM users WHERE YEAR(createdDate) = ? AND MONTH(createdDate) = ?`,
getUsersRegisteredInSpecificYear: `SELECT COUNT(*) AS userCount FROM users WHERE YEAR(createdDate) = ?`,
userCount: `SELECT COUNT(*) AS userCount FROM users WHERE DATE(createdDate) = ?;`,
insertIntoRole :  `INSERT INTO usersRole (userId, companyRoleId) VALUES (?, ?);`,
deactivateUser:  `UPDATE users SET activeStatus = 0 WHERE userId = ?`,






}