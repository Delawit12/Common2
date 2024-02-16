export default {
  getUserByEmail: `SELECT * FROM users WHERE userEmail=? `,
  insertIntoUser: `INSERT INTO users (userEmail,firstName,middleName,lastName, userPhone, createdDate, OTP, activeStatus)  VALUES (?, ?,?,?,?, NOW(),?, 1)`,
  getUserByPhone: `SELECT * FROM users WHERE userPhone=?`,
  insertIntoUserRole: `INSERT INTO usersRole (userId, companyRoleId) VALUES (?, ?);
  `,
  insertIntoUserPassword: `INSERT INTO usersPassword (userId,userPassword,createdDate) VALUES(?,?,NOW())`,
  insertIntoContactVerification: `INSERT INTO contactVerification (userId, emailStatus, phoneStatus) VALUES (?, 0, 0);
  `,
  getUserOTPByUserId: `SELECT * FROM users WHERE userId = ? AND OTP = ?; `,
  updateOTP: `UPDATE users SET OTP = ? WHERE userId= ?`,
  updateContactVerificationEmailStatus: `UPDATE contactVerification SET emailStatus = 1 WHERE userId = ?`,
  newOTP: ``,
  getUserPasswordByUserId: `SELECT * FROM usersPassword WHERE userId = ? ORDER BY CREATEdDate ASC;
  `,
  insertUserPassword: `INSERT INTO userPassword (userId, userPassword) VALUES (?, ?)`,
  updateUserPassword: `UPDATE usersPassword  SET userPassword = ? WHERE userId= ?`,
};
