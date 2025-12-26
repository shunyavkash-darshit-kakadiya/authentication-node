import { Router } from "express";
import getAllDeviceSessions from "../../controllers/v1/activeDevices/getAllDeviceSession.controller.js";
import deleteDeviceSession from "../../controllers/v1/activeDevices/deleteDeviceSession.controller.js";
import AuthMiddleware from "../../../middleware/auth.middleware.js";

const activeDevicesRouter = Router();
activeDevicesRouter.get("/getAll", AuthMiddleware, getAllDeviceSessions);
activeDevicesRouter.delete("/:id", AuthMiddleware, deleteDeviceSession);

export default activeDevicesRouter;
