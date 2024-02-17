export default {
  getUserPasswordByUserId: `SELECT userPassword FROM usersPassword WHERE userId = ?;`,
  getUserByEmail: `SELECT * FROM users WHERE userEmail = ?;`,
};



