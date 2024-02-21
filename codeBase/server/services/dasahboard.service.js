// import dashboardQuery from "../queries/dashboard.query.js";
// import userUtility from "../utilities/user.utility.js";
// import bcrypt from "bcrypt"; // Import bcrypt correctly
// import dotenv from "dotenv";
// dotenv.config();

// const dashboardService = {
//     deleteUser: async (id)=>{
//         try{
//          const rows = await query(dashboardQuery.deleteUser,[id]);
//          return rows;
//         }
//         catch(e){
//          console.log(e);
//          return null;
//         }
   
//       },
//  getUserGenderPercentage: async () => {
//           try {
//             const rows = await query(dashboardQuery.getUserGenderPercentage);
//             return rows;
//           } catch (error) {
//             throw error;
//           }
//         },
//  getUserStatusPercentage: async () => {
//           try {
//             const rows = await query(dashboardQuery.getUserStatusPercentage);
//             return rows;
//           } catch (error) {
//             throw error;
//           }
//         },    
//   getUsersCountByRole: async () => {
//     try {
      
//       const rows = await query(dashboardQuery.getUsersCountByRole);
//       const userCountsByRole = rows.map((row) => ({
//         roleName: row.companyRoleName,
//         userCount: row.userCount,
//       }));
//       return userCountsByRole;
//     } catch (error) {
//       throw error;
//     }
//   },
//     getUserStatusPercentage: async () => {
//       try {
//         const query = getUserStatusPercentageQuery;
//         const { rows } = await query(dashboardQuery.getEmailVerificationStats);
//         return rows[0];
//       } catch (error) {
//         throw error;
//       }
//     },
 
  


// };

// export default dashboardService;