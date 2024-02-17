import loginService from "../services/login.service.js";
import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
const loginController = {
  loginUser: async (req, res) => {

    try {
      const { userEmail, userPassword } = req.body;
      //console.log(req.body);
      // Check if all fields are given
      if (!userEmail || !userPassword) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      // Check if email is used before
      const isEmailExist = await userService.getUserByEmail(req.body);
  
      // If there is no account related to this email
      if (!isEmailExist.length) {
        return res.status(404).json({
          success: false,
          message: "No account exists with this email",
        });
      }
     // if the account exist check for password
      req.body.userId =isEmailExist[0].userId;
      const isUserPasswordExist = await loginService.getUserPasswordByUserId(req.body);
      const dbPassword = isUserPasswordExist[0].userPassword;
      //compare user password with db password
      const isMatch = bcrypt.compareSync(userPassword, dbPassword);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password",
        });
      } else {
  
        // extracting first name and user role 
        const userInfo = await loginService.getUserRoleAndFirstName(req.body);
        const firstName = userInfo[0].firstName;
        const userRole = userInfo[0].companyRoleName;
        const userId = req.body.userId;
        // prepare token
        const token = jwt.sign(
          { userId, userRole, firstName },
          process.env.JWT_SECRET,
          {
            // expiresIn: '1h',
          }
        );
  
        return res.status(200).json({
          token,
          success: true,
          message: "Login successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
 
  },
};

export default loginController;
