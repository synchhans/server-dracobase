import Language from "../models/Language.js";

export const addLanguage = async (data) => {
  try {
    const newLanguage = new Language({
      ...data,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const savedLanguage = await newLanguage.save();
    return savedLanguage;
  } catch (error) {
    throw new Error(error.message || "Gagal menambahkan bahasa pemrograman.");
  }
};

export const getAllLanguages = async () => {
  try {
    const languages = await Language.find().sort({ createdAt: 1 });
    return languages;
  } catch (error) {
    throw new Error(error.message || "Gagal mengambil daftar bahasa.");
  }
};

export const updateLanguage = async (name, updatedData) => {
  try {
    const updatedLanguage = await Language.findOneAndUpdate(
      { name },
      { $set: { ...updatedData, updatedAt: Date.now() } },
      { new: true }
    );

    if (!updatedLanguage) {
      throw new Error("Bahasa tidak ditemukan.");
    }

    return updatedLanguage;
  } catch (error) {
    throw new Error(error.message || "Gagal memperbarui bahasa pemrograman.");
  }
};

export const deleteLanguage = async (name) => {
  try {
    const deletedLanguage = await Language.findOneAndDelete({ name });

    if (!deletedLanguage) {
      throw new Error("Bahasa tidak ditemukan.");
    }

    return deletedLanguage;
  } catch (error) {
    throw new Error(error.message || "Gagal menghapus bahasa pemrograman.");
  }
};

export const deleteLanguageById = async (languageId) => {
  try {
    const deletedLanguage = await Language.findByIdAndDelete(languageId);
    if (!deletedLanguage) {
      throw new Error("Bahasa tidak ditemukan.");
    }
    return deletedLanguage;
  } catch (error) {
    console.error("Error in deleteLanguageById:", error.message);
    throw new Error(error.message || "Gagal menghapus bahasa.");
  }
};
