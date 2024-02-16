import userService from "../services/user.services.js";
import userUtility from "../utility/user.utility.js";
import bcrypt from "bcrypt"; // Import bcrypt correctly
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userController = {
  // Register a new user
  registerUser: async (req, res) => {
    const { userEmail, userPassword, userPhone } = req.body;

    // Check all fields
    if (!userEmail || !userPassword || !userPhone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check all fields
    if (!userEmail || !userPassword || !userPhone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if email is used before
    const isEmailExist = await userService.getUserByEmail(userEmail);

    // If there is an account related to this email
    if (isEmailExist.length> 0) {
      console.log(isEmailExist);
      return res.status(500).json({
        success: false,
        message: "Email is already used",
      });
    }

    // Check if the phone number is related to an account
    const isPhoneExists = await userService.getUserByPhone(userPhone);

    // If there is an account related to this phone
    if (isPhoneExists.length> 0) {
      return res.status(500).json({
        success: false,
        message: "Phone is already used",
      });
    } else {
      let userId;

      // Password encryption
      const saltRounds = 10; // Specify a number of rounds
      const salt = bcrypt.genSaltSync(saltRounds);
      req.body.userPassword = bcrypt.hashSync(userPassword, salt);

      // Generate OTP
      const OTP = userUtility.generateDigitOTP();
      req.body.OTP = OTP;

      const registerUser = await userService.registerUser(req.body);

      // Extract userId from the result
      userId = registerUser.insertId;
      req.body.userId = userId;

      // Send OTP by email
      userUtility.sendEmail(userEmail, OTP).then(async () => {
        // Inserting password into the database
        const isPaswordAdded = await userService.addUserPassword(req.body);
        if (isPasswordAdded) {
          res.status(200).json({
            success: true,
            message: "User created successfully",
          });
        }
      });
    }
  },
  // Confirm OTP
  confirmOTP: async (req, res) => {
    const { userEmail, OTP } = req.body;
    // Validate the request values
    if (!userEmail || !OTP) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the email exists
    const getUserByEmail = await userService.getUserByEmail(req.body);
    const userId= getUserByEmail[0].userId;


    const getOTP = await userService.getUserOTPByuser(req.body);
    if (!getOTP.length) {
      return res.status(500).json({
        success: false,
        message: "OTP does not match",
      });
    } else {
      const data = {
        activeStatus: 2,
        userEmail: userEmail,
      };

      // Update the active status of the user
      const activated = await userService.updateActiveStatus(data);
      console.log(activated);
      if (activated) {
        return res.json({
          success: true,
          message: "OTP successfully confirmed",
        });
      }
    }
  },
  // Login
  loginUser: async (req, res) => {
    const { userEmail, userPassword } = req.body;
    //console.log(req.body);
    // Check if all fields are given
    if (!userEmail || !userPassword) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the email is given
    const isUserExist = await userService.getUserByEmail(userEmail);

    // If there is no account related to this email
    if (!isUserExist.length) {
      return res.status(500).json({
        success: false,
        message: "No account exists with this email",
      });
    }
    // console.log(isUserExist)

    const userId = isUserExist[0].userId;
    const checkedUserPassword = await userService.getUserPasswordByUserId(
      userId
    );

    if (!checkedUserPassword) {
      return res.status(500).json({
        success: false,
        message: "Password does not exist",
      });
    }

    const dbPassword = checkedUserPassword[0].userPassword;
    const isMatch = bcrypt.compareSync(userPassword, dbPassword);

    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Incorrect password",
      });
    } else {
      const token = jwt.sign({ userId, userEmail }, process.env.JWT_SECRET);
      return res.status(200).json({
        token,
        userId,
        userEmail,
        success: true,
        message: "Login successfully",
      });
    }
  },
  // Forget password
  forgetPassword: async (req, res) => {
    const { userEmail } = req.body;

    // Validate the request values
    if (!userEmail) {
      res.json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the email exists
    const isUserExist = await userService.getUserByEmail(userEmail);

    // If there is no account related to this email
    if (!isUserExist.length) {
      return res.status(500).json({
        success: false,
        message: "There is no account related to this email",
      });
    } else {
      // Extract userId
      req.body.userId = isUserExist[0].userId;
      // Generate OTP
      const OTP = await userUtility.generateDigitOTP();
      req.body.OTP = OTP;
      // console.log(req.body.OTP)
      userUtility.sendEmail(userEmail, OTP).then(async () => {
        const isnewOTPAdded = await userService.newOTP(req.body);
        console.log(isnewOTPAdded);
        if (!isnewOTPAdded) {
          return res.status(400).json({
            success: false,
            message: "Error during sending email",
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
          });
        }
      });
    }
  },
  // Change new password
  newPassword: async (req, res) => {
    const { userId, userPassword } = req.body;

    // Validate the request values
    if (!userId || !userPassword) {
      res.json({
        success: false,
        message: "All fields are required",
      });
    }
    // Compare with previous passwords
    const isUserPassword = await userService.getUserPasswordByUserId(userId);
    for (let i = 0; i < isUserPassword.length; i++) {
      let dbPassword = isUserPassword[i].userPassword;
      const isMatch = bcrypt.compareSync(userPassword, dbPassword);
      if (isMatch) {
        return res.status(500).json({
          success: false,
          message: "This password is already used. Please use another",
        });
      }
    }

    // Password encryption
    const salt = bcrypt.genSaltSync(10); // Specify the number of rounds
    req.body.userPassword = bcrypt.hashSync(userPassword, salt);
    const passwordInserted = await userService.changeUserPassword(req.body);

    if (!passwordInserted) {
      return res.status(200).json({
        success: false,
        message: "Error during password changing",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  },
  // Change password
  changePassword: async (req, res) => {
    const { userId, oldPassword, userPassword } = req.body;

    // Validate the request values
    if (!userId || !userPassword || !oldPassword) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the old password is correct
    const userData = await userService.getUserPasswordByUserId(userId);
    if (!userData) {
      return res.status(500).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Compare the old password with the last one from the table
    const dbPassword = userData[userData.length - 1].userPassword;
    // console.log(userData);
    // console.log(userPassword);
    const isMatch = bcrypt.compareSync(oldPassword, dbPassword);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Incorrect old password",
      });
    }

    for (let i = 0; i < userData.length; i++) {
      let dbPassword = userData[i].userPassword;
      const isMatch = bcrypt.compareSync(userPassword, dbPassword);
      if (isMatch) {
        return res.status(500).json({
          success: false,
          message: "This password is already used. Please use another",
        });
      }
    }
    // Password encryption
    const salt = bcrypt.genSaltSync(10); // Specify the number of rounds
    req.body.userPassword = bcrypt.hashSync(userPassword, salt);

    const insertNewPassword = await userService.addUserPassword(req.body);
    if (!insertNewPassword) {
      return res.status(500).json({
        success: false,
        message: "Database error during password changing",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  },

  //getAllUsers
  getAllUsers: async (req, res) => {
    const response = await userService.getAllUsers();
    res.status(200).json({
      status: true,
      data: response,
    });
  },

  //getUserProfile)
  getUserProfile: async (req, res) => {
    const response = await userService.getlUserProfile();
    if (response.length) {
      res.status(200).json({
        status: true,
        data: response,
      });
    } else {
      res.status(500).json({
        status: false,
        message: "no user found",
      });
    }
  },
};

export default userController;

// const isEmailSend = await userUtility.sendEmail(userEmail, req.body.OTP);
