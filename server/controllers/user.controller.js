import User from "../models/user.schema.js";

export const registerUser = async (req, res) => {
  const { name, username, email, password, bio, profilePic, isPrivate } =
    req.body;
  if (!name || !username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }
  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already taken, try a different one.",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists, please login",
      });
    }
    const user = new User({
      name,
      username,
      email,
      password,
      bio: bio || "",
      profilePic: profilePic || "",
      isPrivate: isPrivate || false,
    });
    await user.save();
    const token = user.generateAuthToken();
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully!",
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        bio: user.bio,
        isPrivate: user.isPrivate,
      },
      token,
    });
  } catch (error) {
    console.log(`Error in registerUser: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username && !email) || !password) {
    return res.status(400).json({
      success: false,
      message: "Username or email and password are required!",
    });
  }
  try {
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }
    const isPassMatched = await user.comparePassword(password);
    if (!isPassMatched) {
      return res.status(400).json({
        success: false,
        message: "Invaid email and password!",
      });
    }
    const token = user.generateAuthToken();
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      success: true,
      message: "User LoggedIn Successfully!",
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        bio: user.bio,
        isPrivate: user.isPrivate,
      },
      token,
    });
  } catch (error) {
    console.log(`Error in loggingUser: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies?.auth_token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token found.",
      });
    }
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Error in logoutUser:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging out",
    });
  }
};
