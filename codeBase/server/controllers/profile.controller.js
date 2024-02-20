import profileService from "../services/profile.service.js";
const profileController = {
  updateProfile: async (req, res, next) => {
    try {
      const userId = req.userId;
      const { firstName, middleName, lastName, gender } = req.body;

      // Check if all fields are provided
      if (!userId || !firstName || !middleName || !lastName) {
        return res.status(500).json({
          status: "false",
          message: "All fields are required",
        });
      }

      // Check if user exists
      const isUserExist = await profileService.getUserById(req.body);
      if (!isUserExist) {
        return res.status(500).json({
          status: "false",
          message: "User does not exist",
        });
      }

      // Update profile data
      const isProfileUpdated = await profileService.updateProfile(req.body);
      if (isProfileUpdated) {
        return res.status(200).json({
          status: "true",
          message: "User profile is successfully updated in the profile table",
        });
      }

      return res.status(500).json({
        status: "false",
        message: "Error during user profile update",
      });
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error in updateProfile:", error);
      return res.status(500).json({
        status: "false",
        message: "Internal server error",
      });
    }
  },

  getProfile: async (req, res, next) => {
    try {
      const userId = req.userId;

      if (userId) {
        console.log(userId);
        const userData = await profileService.getUserProfile(userId);

        if (userData) {
          return res.status(200).json({
            status: true,
            data: userData,
          });
        } else {
          return res.status(500).json({
            status: false,
            message: "Error fetching user data",
          });
        }
      } else {
        return res.status(500).json({
          status: false,
          message: "Invalid token",
        });
      }
    } catch (error) {
      console.error("Error in getProfile:", error);
      return res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }
  },
};
export default profileController;
