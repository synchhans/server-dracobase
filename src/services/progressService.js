import UserProgress from "../models/UserProgress.js";
import Workspace from "../models/Workspace.js";

export const getProgress = async (userId, workspaceId) => {
  try {
    const progress = await UserProgress.findOne({ userId, workspaceId });
    if (!progress) {
      throw new Error("Progress not found");
    }
    return progress;
  } catch (error) {
    throw error;
  }
};

export const createProgress = async (userId, languageId, workspaceId) => {
  try {
    const newProgress = new UserProgress({
      userId,
      languageId,
      workspaceId,
      activeMaterialIndex: 0,
      completedMaterialIndexes: [],
    });
    await newProgress.save();
    return newProgress;
  } catch (error) {
    throw error;
  }
};

export const updateProgress = async (userId, workspaceId, updates) => {
  try {
    const updatedProgress = await UserProgress.findOneAndUpdate(
      { userId, workspaceId },
      { $set: updates },
      { new: true }
    );
    if (!updatedProgress) {
      throw new Error("Progress not found");
    }
    return updatedProgress;
  } catch (error) {
    throw error;
  }
};

export const deleteProgressByLanguageId = async (languageId) => {
  try {
    const workspaces = await Workspace.find({ language: languageId });

    const workspaceIds = workspaces.map((workspace) => workspace._id);

    await UserProgress.deleteMany({ workspaceId: { $in: workspaceIds } });
  } catch (error) {
    console.error("Error in deleteProgressByLanguageId:", error.message);
    throw new Error(error.message || "Gagal menghapus entri progress.");
  }
};
