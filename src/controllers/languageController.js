import Language from "../models/Language.js";
import {
  addLanguage,
  deleteLanguageById,
  getAllLanguages,
  updateLanguage,
} from "../services/languageService.js";
import { deleteProgressByLanguageId } from "../services/progressService.js";
import { deleteRecentByLanguageId } from "../services/recentService.js";

export const addLanguageController = async (req, res, next) => {
  try {
    const { name, icon, description, categories, materials } = req.body;

    if (!name || !icon || !description) {
      return res.status(400).json({
        message: "Nama, ikon, dan deskripsi wajib diisi.",
      });
    }

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        message: "Minimal 1 kategori harus dipilih.",
      });
    }

    if (
      !Array.isArray(materials) ||
      materials.some(
        (material) =>
          !material.title ||
          !Array.isArray(material.contentBlocks) ||
          material.contentBlocks.some(
            (block) =>
              !block.type ||
              block.content === undefined ||
              block.order === undefined
          )
      )
    ) {
      return res.status(400).json({
        message:
          "Setiap materi harus memiliki judul dan contentBlocks dengan type, content, dan order.",
      });
    }

    const savedLanguage = await addLanguage(req.body);

    return res.status(201).json({
      message: "Bahasa pemrograman berhasil ditambahkan.",
      data: savedLanguage,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllLanguagesController = async (req, res, next) => {
  try {
    const languages = await getAllLanguages();
    return res.status(200).json({
      message: "Daftar bahasa pemrograman berhasil diambil.",
      data: languages,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLanguageController = async (req, res, next) => {
  try {
    const { name } = req.params;
    const updatedData = req.body;

    if (!updatedData.name && !updatedData.icon && !updatedData.description) {
      return res.status(400).json({
        message: "Setidaknya satu field harus diperbarui.",
      });
    }

    const updatedLanguage = await updateLanguage(name, updatedData);

    if (!updatedLanguage) {
      return res.status(404).json({ message: "Bahasa tidak ditemukan." });
    }

    return res.status(200).json({
      message: "Bahasa berhasil diperbarui.",
      data: updatedLanguage,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLanguageController = async (req, res, next) => {
  try {
    const { languageId } = req.params;

    const language = await Language.findById(languageId);

    if (!language) {
      return res.status(404).json({ message: "Bahasa tidak ditemukan." });
    }

    await deleteProgressByLanguageId(language._id);
    await deleteRecentByLanguageId(language._id);

    await deleteLanguageById(language._id);

    return res.status(200).json({ message: "Bahasa berhasil dihapus." });
  } catch (error) {
    next(error);
  }
};
