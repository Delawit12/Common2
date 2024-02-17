export default {
  getUserByEmail: `SELECT * FROM users WHERE userEmail=? `,
  insertIntoUsers: `INSERT INTO users (userEmail,firstName,middleName,lastName, userPhone, createdDate, OTP, activeStatus)  VALUES (?, ?,?,?,?, NOW(),?, 1)`,
  getUserByPhone: `SELECT * FROM users WHERE userPhone=?`,
  insertIntoUsersRole: `INSERT INTO usersRole (userId, companyRoleId) VALUES (?, ?);
  `,
  insertIntoUsersPassword: `INSERT INTO usersPassword (userId,userPassword,createdDate) VALUES(?,?,NOW())`,
  insertIntoContactVerification: `INSERT INTO contactVerification (userId, emailStatus, phoneStatus) VALUES (?, 0, 0);
  `,
  getUserOTPByUserId: `SELECT OTP FROM users WHERE userId = ?; `,
  updateOTP: `UPDATE users SET OTP = NULL WHERE userId = ?;`,
  updateContactVerificationEmailStatus: `UPDATE contactVerification SET emailStatus = 1 WHERE userId = ?;`,
  newOTP: `UPDATE users SET OTP = ? WHERE userEmail = ?;`,
  getUserPasswordByUserId: `SELECT userPassword FROM usersPassword WHERE userId = ?;`,
  insertUserPassword: `INSERT INTO userPassword (userId, userPassword) VALUES (?, ?)`,
  updateUserPassword: `UPDATE usersPassword  SET userPassword = ? WHERE userId= ?`,
};
