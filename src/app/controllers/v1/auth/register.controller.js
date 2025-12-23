import Auth from "../../../../models/auth.model.js";
import { createHashPwd } from "../../../../utils/password.util.js";

const registerController = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new Auth({
      fullName,
      email,
      password: createHashPwd(password),
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export default registerController;
