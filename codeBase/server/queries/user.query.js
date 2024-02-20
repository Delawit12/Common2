export default {
  getUserByEmail: `SELECT * FROM users WHERE userEmail = ?;`,
  getUserByPhone: `SELECT * FROM users WHERE userPhone = ?;`,
  getCompanyRoleNameUsingUserId: `SELECT cr.companyRoleName  FROM usersRole AS ur JOIN companyRoles AS cr ON ur.companyRoleId = cr.companyRoleId WHERE ur.userId = ?;`,
  getUserOTPByUserId: `SELECT OTP FROM users WHERE userId = ?; `,
  getUserPasswordByUserId: `SELECT userPassword FROM usersPassword WHERE userId = ?;`,

  insertIntoUsers: `INSERT INTO users (userEmail, firstName, middleName, lastName, userPhone, createdDate, OTP, activeStatus) VALUES (?, ?, ?, ?, ?, NOW(), ?, 1);`,
  insertIntoUsersRole: `INSERT INTO usersRole (userId, companyRoleId) VALUES (?, ?);`,
  insertIntoUsersPassword: `INSERT INTO usersPassword (userId, userPassword, createdDate) VALUES (?, ?, NOW() );`,
  insertIntoContactVerification: `INSERT INTO contactVerification (userId, emailStatus, phoneStatus) VALUES (?, 0, 0);`,
  insertIntoUsersProfile: `INSERT INTO usersProfile (userId, firstName, middleName, lastName, createdDate) VALUES (?,?,?,?,now());`,
  insertUserPassword: `INSERT INTO usersPassword (userId, userPassword, createdDate) VALUES (?, ?, NOW());`,

  updateOTP: `UPDATE users SET OTP = NULL WHERE userId = ?;`,
  updateContactVerificationEmailStatus: `UPDATE contactVerification SET emailStatus = 1 WHERE userId = ?;`,
  newOTP: `UPDATE users SET OTP = ? WHERE userEmail = ?;`,
  UserPassword: `UPDATE usersPassword SET userPassword = ?, createdDate = NOW() WHERE userId = ?;`,
};
