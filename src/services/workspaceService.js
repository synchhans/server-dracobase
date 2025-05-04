import Workspace from "../models/Workspace.js";
import Recent from "../models/Recent.js";
import { createProgress } from "./progressService.js";
import UserProgress from "../models/UserProgress.js";
import Ai from "../models/Ai.js";

export const createWorkspace = async ({
  userId,
  name,
  description,
  languageId,
}) => {
  try {
    const workspace = new Workspace({
      userId,
      name,
      description,
      language: languageId,
    });

    const savedWorkspace = await workspace.save();

    await createRecentEntry(userId, savedWorkspace._id, languageId);

    await createProgress(userId, languageId, savedWorkspace._id);

    return savedWorkspace;
  } catch (error) {
    throw new Error(error.message || "Failed to create workspace");
  }
};

const createRecentEntry = async (userId, workspaceId, languageId) => {
  try {
    const recentEntry = new Recent({
      userId,
      workspaceId,
      languageId,
    });

    await recentEntry.save();
  } catch (error) {
    throw new Error(error.message || "Failed to create recent entry");
  }
};

export const getWorkspaceById = async (id) => {
  try {
    const workspace = await Workspace.findById(id)
      .populate("language")
      .populate("userId");
    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return workspace.toObject();
  } catch (error) {
    console.error("Error in getWorkspaceById:", error.message);
  }
};

export const deleteWorkspace = async (workspaceId) => {
  try {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw new Error("Workspace not found");
    }

    const recentEntries = await Recent.find({ workspaceId });
    if (recentEntries.length === 0) {
      throw new Error("No recent entries found for this workspace");
    }

    await UserProgress.deleteMany({ workspaceId });

    await Workspace.findByIdAndDelete(workspaceId);

    await Ai.deleteMany({ workspaceId });

    await Recent.deleteMany({ workspaceId });

    return { message: "Workspace and related data deleted successfully" };
  } catch (error) {
    console.error("Error in deleteWorkspace:", error.message);
    throw new Error(error.message || "Failed to delete workspace");
  }
};
