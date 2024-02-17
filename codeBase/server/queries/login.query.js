export default {
  getUserPasswordByUserId: `SELECT * FROM usersPassword WHERE userId = ? ORDER BY createdDate DESC;`,
  getUserByEmail: `SELECT * FROM users WHERE userEmail = ?;`,
  getUserRoleAndFirstName: `SELECT ur.userRoleId, ur.userId, ur.companyRoleId, cr.companyRoleName, u.firstName FROM usersRole AS ur
  JOIN companyRoles AS cr ON ur.companyRoleId = cr.companyRoleId  JOIN users AS u ON ur.userId = u.userId WHERE ur.userId = ?`
};



