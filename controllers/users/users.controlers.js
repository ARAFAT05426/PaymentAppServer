import { db } from "../../utilis/connectDB.js";
import setToken from "../../utilis/settoken.js";
import bcrypt from "bcrypt";

const users = db.collection("users");

const auth = async (req, res) => {
  try {
    const { email, password, name, mobileNumber } = req.body;
    // if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(200).send({ success: false, message: "User already exists" });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      name,
      email,
      mobileNumber,
      password: hashedPassword,
      balance: 0,
      bonus: false,
      role: "pending",
      timestamp: Date.now(),
    };
    const result = await users.insertOne(newUser);
    const token = await setToken({ email });
    // Set token in cookie
    res.cookie("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.status(200).send({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).send("Internal server error");
  }
};

const login = async(req, res) =>{
  const { email, password, name, mobileNumber } = req.body;
}

export { auth };
