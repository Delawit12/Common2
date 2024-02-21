// import dashboardService from "../services/dasahboard.service.js";
// import userUtility from "../utilities/user.utility.js";
// import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// dotenv.config();

// const dasahboardController = {
//   deactivateUser: async (req, res) => {
//     try {
//       const id = req.params.id.substring(1);
//       const { activeStatus } = req.body;
//       if (!id || !activeStatus) {
//         return res.status(500).json({
//           success: false,
//           message: "all fields are required",
//         });
//       }
//       req.body.userId = id;
//       const isUserUpdated = await dashboardService.deactivateUser(req.body);
//       if (!isUserUpdated) {
//         return res.status(400).json({
//           success: false,
//           message: "fail to update user",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: "user deactivated successfully",
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Server error",
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
//       const id = req.params.id.substring(1);
//       const isAssigned = await userService.insertIntoRole(id);

//       if (!isAssigned) {
//         return res.status(400).json({
//           success: false,
//           message: "fail to assign",
//         });
//       }
//       res.status(200).json({
//         success: true,
//         message: "user role assigned successfully",
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Server error",
//       });
//     }
//   },

//   getFemaleUsers: async (req, res) => {
//     try {
//       const femaleUsers = await userService.getFemaleUsers(req.body);

//       if (!femaleUsers.length) {
//         return res.status(400).json({
//           success: false,
//           message: "Female users not found",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: "Female users found",
//         data: femaleUsers,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Server error",
//       });
//     }
//   },
//   getMaleUsers: async (req, res) => {
//     try {
//       const maleUsers = await userService.getMaleUsers(req.body);

//       if (!maleUsers.length) {
//         return res.status(400).json({
//           success: false,
//           message: "Male users not found",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         data: maleUsers,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Server error",
//       });
//     }
//   },
//   getVerifiedUsers: async (req, res) => {
//     try {
//       const isVerifiedUsers = await userService.getVerifiedUsers(req.body);

//       if (!isVerifiedUsers.length) {
//         return res.status(400).json({
//           success: false,
//           message: "No verified users found",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         data: isVerifiedUsers,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Server error",
//       });
//     }
//   },
//   // getStatisticsofUsers: async (req, res) => {
//   //   try {
//   //     const isVerifiedUsers = await userService.getStatisticsofUsers(req.body);

//   //     if (!isVerifiedUsers.length) {
//   //       return res.status(400).json({
//   //         success: false,
//   //         message: "No verified users found",
//   //       });
//   //     }

//   //     return res.status(200).json({
//   //       success: true,
//   //       data: isVerifiedUsers,
//   //     });
//   //   } catch (error) {
//   //     return res.status(500).json({
//   //       success: false,
//   //       message: "Server error",
//   //     });
//   //   }
//   // },
  
//     getUserGenderPercentage: async (req, res) => {
//       try {
//         const genderPercentage = await dashboardService.getUserGenderPercentage();
//         return res.status(200).json({
//           success: true,
//           data: genderPercentage,
//         });
//       } catch (error) {
//         return res.status(500).json({
//           success: false,
//           message: "Server error",
//         });
//       }
//     },
//   };

//   import userService from "../services/userService.js";

// const userController = {
//   getUserStatusPercentage: async (req, res) => {
//     try {
//       const statusPercentage = await userService.getUserStatusPercentage();
//       return res.status(200).json({
//         success: true,
//         data: statusPercentage,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Server error",
//       });
//     }
//   },
//   getUsersCountByRole: async (req, res) => {
//       try {
//         const userCountsByRole = await userService.getUsersCountByRole();
//         return res.status(200).json({
//           success: true,
//           data: userCountsByRole,
//         });
//       } catch (error) {
//         return res.status(500).json({
//           success: false,
//           message: "Server error",
//         });
//       }
//     },
//       getEmailVerificationStats: async (req, res) => {
//         try {
//           const emailStats = await userService.getEmailVerificationStats();
//           return res.status(200).json({
//             success: true,
//             data: emailStats,
//           });
//         } catch (error) {
//           return res.status(500).json({
//             success: false,
//             message: "Server error",
//           });
//         }
//       },
//     };
    
//     export default userController;





// };


  
//   export default dasahboardController;


