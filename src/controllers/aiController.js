import Ai from "../models/Ai.js";
import { openRouterService } from "../services/openRouterService.js";
import { buildQuery } from "../utils/buildQuery.js";
import { cleanCode } from "../utils/codeCleaner.js";

export const handleAi = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const { workspaceId, materialId, contentBlockId, query, type } = req.body;

    if (
      !userId ||
      !workspaceId ||
      !materialId ||
      !contentBlockId ||
      !query ||
      !type
    ) {
      return res.status(400).json({
        message:
          "Unauthorized, Workspace ID, Material ID, ContentBlock ID, Type, dan Query wajib diisi.",
      });
    }

    const cleanedQuery = cleanCode(query);

    if (!cleanedQuery.trim()) {
      return res.status(400).json({
        message: "Query tidak mengandung kode valid.",
      });
    }

    const formattedQuery = buildQuery(cleanedQuery, type);

    const aiResponse = await openRouterService(formattedQuery);

    const responseContent =
      aiResponse.choices?.[0]?.message?.content || "No response";

    const aiData = {
      userId,
      workspaceId,
      materialId,
      contentBlockId,
      query: cleanedQuery,
      response: responseContent,
      feedbackType: type,
    };

    const savedData = await Ai.create(aiData);

    return res.status(201).json({
      message: "AI berhasil diproses.",
      data: savedData,
    });
  } catch (error) {
    next(error);
  }
};

export const getDataAi = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID tidak ditemukan atau tidak valid",
      });
    }

    const { workspaceId, materialId, contentBlockId, type } = req.query;
    const allowedTypes = ["debugging", "feedback"];
    let filters = { userId };

    if (
      (workspaceId && !materialId) ||
      (materialId && !contentBlockId) ||
      (contentBlockId && !type) ||
      (type && !allowedTypes.includes(type.toLowerCase()))
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Jika menyertakan Material ID, ContentBlock ID, atau Type, pastikan formatnya benar: materialId + contentBlockId + type",
      });
    }

    if (workspaceId && materialId && contentBlockId && type) {
      filters.workspaceId = workspaceId;
      filters.materialId = materialId;
      filters.contentBlockId = contentBlockId;
      filters.feedbackType = type.toLowerCase();
    }

    const aiData = await Ai.find(filters);

    if (!aiData || aiData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tidak ada data AI sesuai kriteria pencarian.",
      });
    }

    return res.status(200).json({
      success: true,
      count: aiData.length,
      data: aiData,
    });
  } catch (error) {
    console.error("Error fetching AI data:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};
