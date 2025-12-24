const logoutController = (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    logger.error("Logout fail", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default logoutController;
