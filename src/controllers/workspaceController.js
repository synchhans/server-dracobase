import {
  createWorkspace as createWorkspaceService,
  getWorkspaceById,
} from "../services/workspaceService.js";

export const createWorkspace = async (req, res) => {
  try {
    const { userId, name, description, languageId } = req.body;

    if (!userId || !name || !languageId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newWorkspace = await createWorkspaceService({
      userId,
      name,
      description,
      languageId,
    });

    res.status(201).json({
      message: "Workspace created successfully",
      workspace: newWorkspace,
    });
  } catch (error) {
    console.error("Error creating workspace:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getWorkspace = async (req, res) => {
  try {
    const { id } = req.params;

    const workspace = await getWorkspaceById(id);

    if (workspace) {
      res.json({
        success: true,
        data: workspace,
      });
    } else {
      res.status(404).json({ success: false, message: "Workspace not found" });
    }
  } catch (error) {
    console.error("Error fetching workspace:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
