import { removeActiveDevice } from "../../../../services/activeDevices/activeDevice.service.js";

const deleteDeviceSession = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await removeActiveDevice(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Device not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Device logged out successfully" });
  } catch (err) {
    console.error("Force logout error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error!",
    });
  }
};

export default deleteDeviceSession;
