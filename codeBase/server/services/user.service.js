import query from "../config/db.js";

import userQuery from "../queries/user.query.js";

const userService = {
  insertIntoUsers: async (data) => {
    try {
      const rows = await query(userQuery.insertIntoUsers, [
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

  insertIntoUsersRole: async (data) => {
    try {
      const rows = await query(userQuery.insertIntoUsersRole, [
        data.userId,
        data.companyRoleId,
      ]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  insertIntoUsersPassword: async (data) => {
    try {
      const rows = query(userQuery.insertIntoUsersPassword, [
        data.userId,
        data.userPassword,
      ]);
      return rows;
    } catch (e) {
      console.log(e);
      console.error("Error in insertIntoUsersPassword:", error);
      return null;
    }
  },

  insertIntoContactVerification: async (data) => {
    try {
      const rows = query(userQuery.insertIntoContactVerification, [
        data.userId,
      ]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  insertIntoUsersProfile: async (data) => {
    try {
      //userId, firstName, middleName, lastName, createdDate
      const rows = await query(userQuery.insertIntoUsersProfile, [
        data.userId,
        data.firstName,
        data.middleName,
        data.lastName,
      ]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  insertIntoUsersPassword: async (data) => {
    try {
      const rows = await query(userQuery.insertIntoUsersPassword, [
        data.userId,
        data.userPassword,
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

  getCompanyRoleNameUsingUserId: async (id) => {
    try {
      const rows = await query(userQuery.getCompanyRoleNameUsingUserId[id]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  getUserOTPByUserId: async (data) => {
    try {
      const rows = query(userQuery.getUserOTPByUserId, [data.userId]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
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

  updateOTP: async (data) => {
    try {
      const rows = query(userQuery.updateOTP, [data.userId]);
      return rows;
    } catch (error) {
      console.error("Error updating user's OTP:", error);
      return null;
    }
  },

  updateContactVerificationEmailStatus: async (data) => {
    try {
      const rows = query(userQuery.updateContactVerificationEmailStatus, [
        data.userId,
      ]);
      return rows;
    } catch (error) {
      console.error("Error updating user's OTP:", error);
      return null;
    }
  },

  newOTP: async (data) => {
    try {
      const rows = query(userQuery.newOTP, [data.userId, data.OTP]);
      return rows;
    } catch (error) {
      console.log("Error updating user's OTP:", error);
    }
  },

  // insertUserPassword: async (data) => {
  //   try {
  //     const rows = query(
  //       userQuery.insertUserPassword[(data.userId, data.userPassword)]
  //     );
  //     return rows;
  //   } catch (error) {
  //     console.error("Error updating user's password:", error);
  //     return null;
  //   }
  // },
};
export default userService;
