import query from "../config/db.js";

import userQuery from "../queries/user.query.js";

const userService = {
  insertIntoUser: async (data) => {
    try {
      // console.log(data);

      const rows = await query(userQuery.insertIntoUsers, [
        //userEmail,firstName,middleName,lastName, userPhone, createdDate, OTP, activeStatus
        data.userEmail,
        data.firstName,
        data.middleName,
        data.lastName,
        data.userPhone,
        data.OTP,
      ]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  getUserByEmail: async (data) => {
    try {
      const rows = await query(userQuery.getUserByEmail, [data.userEmail]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  getUserByPhone: async (data) => {
    try {
      const rows = await query(userQuery.getUserByPhone, [data.userPhone]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  insertIntoUserRole: async (data) => {
    try {
      // console.log(data);

      const rows = await query(userQuery.insertIntoUserRole, [
        data.userId,
        data.companyRoleId,
      ]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  insertIntoUserPassword: (data) => {
    // Add the return statement
    try {
      // console.log(data);
      const rows = query(usersQuery.insertIntoUserPassword, [
        data.userId,
        data.userPassword,
      ]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  insertIntoContactVerification: (data) => {
    // Add the return statement
    try {
      // console.log(data);
      const rows = query(usersQuery.insertIntoContactVerification, [
        data.userId,
        data.emailStatus,
        data.phoneStatus,
      ]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getUserOTPByUserId: (data) => {
    try {
      const rows = query(usersQuery.getUserOTPByUserId, [data.userId]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  updateOTP: (data) => {
    try {
      const rows = query(userQuery.updateOTP[data.userId]);
      return rows;
    } catch (error) {
      console.error("Error updating user's OTP:", error);
      return null;
    }
  },
  updateContactVerificationEmailStatus: (data) => {
    try {
      const rows = query(
        userQuery.updateContactVerificationEmailStatus[data.userId]
      );
      return rows;
    } catch (error) {
      console.error("Error updating user's OTP:", error);
      return null;
    }
  },
  newOTP: (data) => {
    try {
      const rows = query(usersQuery.newOTP, [data.userId, data.OTP]);
      return rows;
    } catch (error) {
      console.log("Error updating user's OTP:", error);
    }
  },
  getUserPasswordByUserId: async (data) => {
    try {
      const rows = await query(userQuery.getUserPasswordByUserId, [
        data.userId,
      ]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  insertUserPassword: async (data) => {
    try {
      const rows = await query(userQuery.insertUserPassword, [
        data.userId,
        data.userPassword,
      ]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  updateUserPassword: (data) => {
    try {
      const rows = query(
        userQuery.updateUserPassword[(data.userId, data.newPassword)]
      );
      return rows;
    } catch (error) {
      console.error("Error updating user's password:", error);
      return null;
    }
  },
};
export default userService;
