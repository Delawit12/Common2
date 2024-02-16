import  query  from "../config/db.js";

import userQuery from  '../queries/user.query.js';

const userService = {
    insertIntoUser: async (data)=>{
    try{
      // console.log(data);
      
     const rows = await query(userQuery.registerUser,[data.userEmail, data.userPassword,data.userPhone, data.firstName,data.middleName, data.lastName,data.companyRoleId]);
     return rows;
    }
    catch(e){
     console.log(e);
     return null;
    }

  },

  getUserByEmail :async (data)=>{
    try{
     const rows = await query(userQuery.getUserByEmail,[data.userEmail]);
     return rows;
    }
    catch(e){
     console.log(e);
     return null;
    }

  },

  getUserByEmail :async (data)=>{
    try{
     const rows = await query(userQuery.getUserByEmail,[data.userPhone]);
     return rows;
    }
    catch(e){
     console.log(e);
     return null;
    }

  },


}