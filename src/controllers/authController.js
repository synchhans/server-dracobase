import Notification from "../models/Notification.js";
import {
  updateUserProfile,
  updateUserStatus,
} from "../services/authService.js";
import jwt from "jsonwebtoken";

export const getMe = (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User fetched successfully", user: req.user, token });
  } catch (error) {
    console.error("Error generating JWT token:", error.message);
    res.status(500).json({ message: "Internal Server Error", user: null });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, role, plan, type } = req.body;

    if (!firstName || !lastName || !role || !plan || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const displayName = `${firstName} ${lastName}`;
    const updatedUser = await updateUserProfile(req.user._id, {
      displayName,
      firstName,
      lastName,
      role,
      plan,
    });

    if (type === "new") {
      await Notification.create({
        userId: req.user._id,
        title: "Selamat Datang di Platform Pemrograman!",
        message:
          "Yuk eksplor fitur-fitur menarik di sini. Jika ada kendala atau ingin request fitur, langsung hubungi developer ya! Happy coding! 💻✨",
      });
    }

    const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Profile updated successfully",
      user: req.user,
      token,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    updateUserStatus(req.user._id, "nonactive").catch((err) =>
      console.error("Gagal update status saat logout:", err)
    );

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
