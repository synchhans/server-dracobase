import Maintenance from "../models/Maintenance.js";

export const getMaintenanceStatus = async (req, res) => {
  try {
    const settings = await Maintenance.findOne();

    if (!settings) {
      return res.json({
        success: true,
        data: {
          enabled: false,
          message:
            "Situs sedang dalam perawatan. Kami akan kembali secepatnya.",
          updatedAt: null,
        },
      });
    }

    res.json({
      success: true,
      data: {
        enabled: settings.enabled,
        message: settings.message,
        updatedAt: settings.updatedAt,
      },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Gagal mengambil status maintenance." });
  }
};

export const toggleMaintenance = async (req, res) => {
  const { enabled } = req.body;

  if (typeof enabled !== "boolean") {
    return res
      .status(400)
      .json({ success: false, message: "enabled harus berupa boolean." });
  }

  try {
    let settings = await Maintenance.findOne();

    if (!settings) {
      settings = new Maintenance({ enabled });
    } else {
      settings.enabled = enabled;
      settings.updatedAt = Date.now();
    }

    await settings.save();

    res.json({
      success: true,
      message: `Maintenance mode berhasil ${
        enabled ? "diaktifkan" : "dinonaktifkan"
      }.`,
      data: {
        enabled: settings.enabled,
        message: settings.message,
        updatedAt: settings.updatedAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || "Gagal memperbarui status maintenance.",
    });
  }
};
