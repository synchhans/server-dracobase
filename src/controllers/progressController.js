import * as progressService from "../services/progressService.js";

export const getProgressController = async (req, res) => {
  try {
    const { userId, workspaceId } = req.params;
    const progress = await progressService.getProgress(userId, workspaceId);
    res.status(200).json(progress);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProgressController = async (req, res) => {
  try {
    const { userId, languageId, workspaceId } = req.body;
    const progress = await progressService.createProgress(
      userId,
      languageId,
      workspaceId
    );
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProgressController = async (req, res) => {
  try {
    const { userId, workspaceId } = req.params;
    const updates = req.body;
    const progress = await progressService.updateProgress(
      userId,
      workspaceId,
      updates
    );
    res.status(200).json(progress);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteProgressController = async (req, res) => {
  try {
    const { userId, workspaceId } = req.params;
    const progress = await progressService.deleteProgress(userId, workspaceId);
    res
      .status(200)
      .json({ message: "Progress deleted successfully", progress });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
