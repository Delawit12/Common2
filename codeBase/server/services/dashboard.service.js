import query from "../config/db.js";
import dashboardQuery from "../queries/dashboard.query.js";
import dotenv from "dotenv";
dotenv.config();


const dashboardService = {
    deleteUser: async (id)=>{
        try{
         const rows = await query(dashboardQuery.deleteUser,[id]);
         return rows;
        }
        catch(e){
         console.log(e);
        //  return null;
        }
   
      },

      insertIntoRole: async (data) => {
        try {
          const isAssigned = await query(dashboardQuery.insertIntoRole[data.userId, data.companyRoleId])
          return isAssigned;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },



 getUserGenderPercentage: async () => {
          try {
            const rows = await query(dashboardQuery.getUserGenderPercentage);
            return rows;
          } catch (error) {
            throw error;
          }
        },
  getUserStatusPercentage: async () => {
          try {
            const rows = await query(dashboardQuery.getUserStatusPercentage);
            return rows;
          } catch (error) {
            throw error;
          }
        },    
  getUsersCountByRole: async () => {
    try {
      
      const rows = await query(dashboardQuery.getUsersCountByRole);
      const userCountsByRole = rows.map((row) => ({
        roleName: row.companyRoleName,
        userCount: row.userCount,
      }));
      return userCountsByRole;
    } catch (error) {
      throw error;
    }
  },
  getEmailVerificationStats: async () => {
      try {
         
        const rows = await query(dashboardQuery.getEmailVerificationStats);
        return rows[0];
      } catch (error) {
        throw error;
      }
    },
 
   deactivateUser: async (data) => {
  try  {
    const rows = await query(dashboardQuery.deactivateUser[data.id])
    return rows
  } catch (error) {
    // console.error('Error deactivating user:', error);
    // return null;
    console.log(error);
    // return null;
  }
},



getUsersRegisteredOnSpecificDay:async (data) => {
  try {
    const rows = await query(dashboardQuery.getUsersRegisteredOnSpecificDay[data.date])
    return rows
  } catch (error) {
    return null
  }
},
getTotalUserCountByDate: async () => {
    try {
      return await dashboardQuery.getTotalUserCountByDate();
    } catch (error) {
      throw error;
    }
},


  getUsersRegisteredInSpecificMonth: async (data) => {
    try {
      
      return await dashboardQuery.getUsersRegisteredInSpecificMonth(data.year, data.month);
     return rows
    } catch (error) {
      throw error;
    }
  },

  getUsersRegisteredInSpecificYear: async (data) => {
    try {
      return await dashboardQuery.getUsersRegisteredInSpecificYear(data.year);
    } catch (error) {
      throw error;
    }
  },
};

export default dashboardService;