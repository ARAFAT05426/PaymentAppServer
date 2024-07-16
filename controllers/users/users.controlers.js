import { db } from "../../utilis/connectDB.js";
import setToken from "../../utilis/settoken.js";
import bcrypt from "bcrypt";
const users = db.collection("users");
const signupauth = async (req, res) => {
  try {
    const { email, password, name, number, role} = req.body;
    // if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "User already exists" });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      name,
      email,
      number,
      role,
      password: hashedPassword,
      balance: 0,
      bonus: false,
      status: "pending",
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
    res
      .status(200)
      .send({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).send("Internal server error");
  }
};
const signinauth = async (req, res) => {
  try {
    const { account, password } = req.body;

    // If account is an email or a phone number
    const query = account.includes("@") ? { email: account } : { number: account };
    const existingUser = await users.findOne(query);
    console.log(existingUser);

    if (!existingUser) {
      return res.status(400).send({ success: false, message: "User not found" });
    }

    // if the provided password matches the hashed password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).send({ success: false, message: "Invalid credentials" });
    }
    const token = await setToken({ email: existingUser.email, id: existingUser._id });
    res.cookie("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.status(200).send({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).send("Internal server error");
  }
};

const getuser = async(req, res) =>{
  try {
    const result = await users.find().toArray()
    res.status(200).send({success: true, users: result})
  } catch (error) {
    res.status(500).send("Internal server error")
  }
}

export { signupauth, signinauth, getuser };