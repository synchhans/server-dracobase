import { deleteRecentService, getRecents, updateRecentService } from "../services/recentService.js";

export const getAllRecentController = async (req, res, next) => {
  try {
    const recents = await getRecents(req.user._id);
    return res.status(200).json({
      message: "Daftar recent berhasil diambil.",
      data: recents,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRecentController = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRecentService(id);
    return res.status(200).json({ message: "Recent deleted successfully" });
  } catch (error) {
    console.error("Error in deleteRecentController:", error.message);
    return res.status(500).json({ message: "Failed to delete recent" });
  }
};

export const updateRecentController = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedRecent = await updateRecentService(id, updateData);
    return res.status(200).json(updatedRecent);
  } catch (error) {
    console.error("Error in updateRecentController:", error.message);
    return res.status(500).json({ message: "Failed to update recent" });
  }
};
