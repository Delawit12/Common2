// import dashboardService from "../services/dashboard.service.js";
// import userUtility from "../utilities/user.utility.js";
// import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// dotenv.config();

// const dasahboardController = {
//   deactivateUser: async (req, res) => {
//     try {
//       const id = req.params.id.substring(1);
//       const { activeStatus } = req.body;
//       if (!id) {
//         return res.status(400).json({
//           success: false,
//           message: 'All fields are required',
//         });
//       }
  
//       const isUserUpdated = await dashboardService.deactivateUser(id);
//       if (!isUserUpdated.length) {
//         return res.status(400).json({
//           success: false,
//           message: 'Failed to update user',
//         });
//       }
  
//       return res.status(200).json({
//         success: true,
//         message: 'User deactivated successfully',
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: 'Server error',
//       });
//     }
//   },

//   deleteUser: async (req, res) => {
//     try {
//       const id = req.params.id.substring(1);
//       if (!id) {
//         return res.status(400).json({
//           success: false,
//           message: "all fields are required",
//         });
//       }
//       const isDeleted = await dashboardService.deleteUser(id);

//       if (!isDeleted) {
//         return res.status(400).json({
//           success: false,
//           message: "fail to delete",
//         });
//       }
//       res.status(200).json({
//         success: true,
//         message: "user deleted successfully",
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Server error",
//       });
//     }
//   },

//   insertIntoRole: async (req, res) => {
//     try {
//       const { userId, companyRoleId } = req.body;
//       if (!userId || !companyRoleId) {
//         return res.status(400).json({
//           success: false,
//           message: "All fields are required",
//         });
//       }
//       const isAssigned = await dashboardService.insertIntoRole(req.body);
//       if (!isAssigned) {
//         return res.status(400).json({
//           success: false,
//           message: "Failed to assign the role",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: "User role assigned successfully",
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: "Server error",
//       });
//     }
//   },

//   getUserGenderPercentage: async (req, res) => {
//     try {
//       const genderPercentage = await dashboardService.getUserGenderPercentage();
//       return res.status(200).json({
//         success: true,
//         data: genderPercentage,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Server error",
//       });
//     }
//   },

//   getUserStatusPercentage: async (req, res) => {
//     try {
//       const statusPercentage = await dashboardService.getUserStatusPercentage();
//       return res.status(200).json({
//         success: true,
//         data: statusPercentage,
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: "Server error",
//       });
//     }
//   },

//   getUsersCountByRole: async (req, res) => {
//     try {
//       const userCountsByRole = await dashboardService.getUsersCountByRole();
//       return res.status(200).json({
//         success: true,
//         data: userCountsByRole,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Server error",
//       });
//     }
//   },

//   getEmailVerificationStats: async (req, res) => {
//     try {
//       const emailStats = await dashboardService.getEmailVerificationStats();
//       return res.status(200).json({
//         success: true,
//         data: emailStats,
//       });
//     } catch (error) {
//     //   return res.status(500).json({
//     //     success: false,
//     //     message: "Server error",
//     //   });
//     console.log(error);
//     }
//   },
// };

// export default dasahboardController;