import Notification from "../models/Notification.js";
import {
  updateUserProfile,
  updateUserStatus,
} from "../services/authService.js";

export const getMe = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  } else {
    return res.json({ user: null });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, role, plan } = req.body;

    if (!firstName || !lastName || !role || !plan) {
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

    await Notification.create({
      userId: req.user._id,
      title: "Selamat Datang di Platform Pemrograman!",
      message:
        "Yuk eksplor fitur-fitur menarik di sini. Jika ada kendala atau ingin request fitur, langsung hubungi developer ya! Happy coding! 💻✨",
    });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    if (req.isAuthenticated()) {
      updateUserStatus(req.user._id, "nonactive").catch((err) =>
        console.error("Gagal update status saat logout:", err)
      );
    }

    req.logout((err) => {
      if (err) {
        console.error("Error during logout:", err);
        return res.status(500).json({ message: "Logout failed" });
      }

      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res
            .status(500)
            .json({ message: "Session destruction failed" });
        }

        res.clearCookie("connect.sid");
        res.status(200).json({ message: "Logout successful" });
      });
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
