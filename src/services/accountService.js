import Notification from "../models/Notification.js";
import User from "../models/User.js";

export const getAccounts = async () => {
  try {
    const account = await User.find().sort({ createdAt: 1 });
    return account;
  } catch (error) {
    throw new Error(error.message || "Gagal mengambil daftar account.");
  }
};

export const editAccount = async (id, level, status) => {
  try {
    const updatedAccount = await User.findByIdAndUpdate(
      id,
      { level, status },
      { new: true }
    );

    if (!updatedAccount) {
      throw new Error("Account tidak ditemukan.");
    }

    const messagesByLevel = {
      dosen: {
        title: `Selamat! Anda telah diangkat menjadi Dosen`,
        message: `Anda sekarang memiliki akses sebagai Dosen. Harap gunakan hak akses ini untuk membantu meningkatkan kualitas pembelajaran bagi mahasiswa.`,
      },
      pengamat: {
        title: `Hak Akses Pengamat Berhasil Diberikan`,
        message: `Anda sekarang memiliki akses sebagai Pengamat. Terima kasih atas partisipasinya dalam memantau perkembangan platform kami.`,
      },
      admin: {
        title: "Hak Akses Master Telah Ditambahkan",
        message:
          "Anda sekarang memiliki akses penuh sebagai Master. Gunakan tanggung jawab ini dengan bijaksana untuk mendukung komunitas kita.",
      },
    };

    const selectedMessage = messagesByLevel[level] || {
      title: `Hak Akses Diperbarui`,
      message: `Hak akses Anda telah diperbarui. Level baru: ${level}. Perubahan sudah berlaku saat ini.`,
    };

    await Notification.create({
      userId: id,
      title: selectedMessage.title,
      message: selectedMessage.message,
      type: level === "master" ? "master" : "system",
    });

    return updatedAccount;
  } catch (error) {
    throw new Error(error.message || "Gagal memperbarui account.");
  }
};

export const deleteAccount = async (id) => {
  try {
    const deletedAccount = await User.findByIdAndDelete(id);

    if (!deletedAccount) {
      throw new Error("Account tidak ditemukan.");
    }

    await Notification.deleteMany({ userId: id });

    return deletedAccount;
  } catch (error) {
    throw new Error(error.message || "Gagal menghapus account.");
  }
};
