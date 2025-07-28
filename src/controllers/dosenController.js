import { searchWorkspacesByDosen, getRecentWorkspaces } from "../services/dosenService.js";

export const getWorkspaceProgressController = async (req, res, next) => {
  try {
    const { search, minProgress, maxProgress } = req.query;

    const workspaces = await searchWorkspacesByDosen({
      search,
      minProgress,
      maxProgress,
    });
    
    return res.status(200).json({
      message: "Hasil pencarian workspace berhasil diambil.",
      data: workspaces,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecentWorkspacesController = async (req, res, next) => {
  try {
    const { search, minProgress, maxProgress, page, limit } = req.query;

    const result = await getRecentWorkspaces({
      search,
      minProgress,
      maxProgress,
      page,
      limit,
    });
    
    return res.status(200).json({
      message: "Data workspace terkini berhasil diambil.",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};