import Recent from "../models/Recent.js";
import Workspace from "../models/Workspace.js";
import Language from "../models/Language.js";
import { deleteWorkspace } from "./workspaceService.js";
import UserProgress from "../models/UserProgress.js";

export const getRecents = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID tidak valid.");
    }

    const recents = await Recent.find({ userId }).sort({ createdAt: -1 });

    const formattedRecents = await Promise.all(
      recents.map(async (recent) => {
        const workspace = await Workspace.findById(recent.workspaceId);
        const language = await Language.findById(recent.languageId);
        const userProgress = await UserProgress.findOne({
          userId,
          workspaceId: recent.workspaceId,
        });

        return {
          id: recent._id,
          workspace: {
            id: workspace?._id,
            name: workspace?.name,
            description: workspace?.description || "No description available.",
            language: {
              name: language?.name,
              icon: language?.icon,
              description: language?.description || "No description available.",
            },
          },
          accessedAt: recent.accessedAt,
          isCompleted: userProgress?.isCompleted || false,
        };
      })
    );

    return formattedRecents;
  } catch (error) {
    throw new Error(error.message || "Gagal mengambil daftar recent.");
  }
};

export const deleteRecentService = async (recentId) => {
  try {
    const recentEntry = await Recent.findById(recentId);
    if (!recentEntry) {
      throw new Error("Recent entry not found");
    }

    const { workspaceId } = recentEntry;

    await deleteWorkspace(workspaceId);

    await Recent.findByIdAndDelete(recentId);

    return;
  } catch (error) {
    console.error("Error in deleteRecentService:", error.message);
    throw new Error(error.message || "Failed to delete recent entry");
  }
};

export const deleteRecentByLanguageId = async (languageId) => {
  try {
    const workspaces = await Workspace.find({ language: languageId });

    const workspaceIds = workspaces.map((workspace) => workspace._id);

    await Recent.deleteMany({ workspaceId: { $in: workspaceIds } });

    await Workspace.deleteMany({ _id: { $in: workspaceIds } });

    console.log(`Deleted recent entries for languageId: ${languageId}`);
  } catch (error) {
    console.error("Error in deleteRecentByLanguageId:", error.message);
    throw new Error(error.message || "Gagal menghapus entri recent.");
  }
};

export const updateRecentService = async (id, updateData) => {
  try {
    const updatedRecent = await Recent.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!updatedRecent) {
      throw new Error("Recent not found");
    }
    return updatedRecent;
  } catch (error) {
    throw new Error(error.message || "Failed to update recent");
  }
};
