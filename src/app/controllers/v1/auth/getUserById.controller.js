import Auth from "../../../../models/auth.model.js";

const getUserById = async (req, res) => {
  try {
    const id = req.user._id;
    if (!id) {
      return res
        .status(404)
        .json({ message: "User id not found", success: false });
    }
    const user = await Auth.findById(id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    return res.status(200).json({
      message: "User retrieved successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error("Error fetching user by ID:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export default getUserById;
