import User from "../models/User.js";

export const updateUserProfile = async (userId, updates) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...updates,
        updatedAt: Date.now(),
        isProfileComplete: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export async function updateUserStatus(userId, newStatus) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: newStatus },
      { new: true }
    );

    return updatedUser;
  } catch (err) {
    throw new Error("Gagal memperbarui status pengguna");
  }
}
