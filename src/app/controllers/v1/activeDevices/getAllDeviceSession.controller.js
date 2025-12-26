import activeDeviceModel from "../../../../models/activeDevice.model.js";

const getAllDeviceSessions = async (req, res) => {
  try {
    const AuthId = req.user?._id;

    const devices = await activeDeviceModel
      .find({ AuthId })
      .sort({ createdAt: -1 })
      .select("-__v");

    return res.status(200).json({
      message: "All Active Devices Records.",
      success: true,
      data: devices,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Something Went Wrong.",
    });
  }
};

export default getAllDeviceSessions;
