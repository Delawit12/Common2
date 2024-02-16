export default {
  getUserPasswordByUserId: `SELECT * FROM usersPassword WHERE userId = ? ORDER BY CREATEdDate ASC;
  `,
  getUserByEmail: `SELECT * FROM users WHERE userEmail=? `,
};
