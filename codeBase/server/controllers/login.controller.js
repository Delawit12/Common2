import loginService from "../services/login.services.js";
import jwt from "jsonwebtoken";

const loginController = {
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
    const isUserExist = await loginService.getUserByEmail(userEmail);

    // If there is no account related to this email
    if (!isUserExist.length) {
      return res.status(500).json({
        success: false,
        message: "No account exists with this email",
      });
    }
    // console.log(isUserExist)

    const userId = isUserExist[0].userId;
    const isUserPasswordExist = await loginService.getUserPasswordByUserId(
      userId
    );

    if (!isUserPasswordExist) {
      return res.status(400).json({
        success: false,
        message: "Password does not exist",
      });
    }

    const dbPassword = isUserPasswordExist[0].userPassword;
    const isMatch = bcrypt.compareSync(userPassword, dbPassword);

    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Incorrect password",
      });
    } else {
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
  },
};

export default loginController;
