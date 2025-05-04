import Pengamat from "../models/Pengamat.js";

export const createFeedbackPengamat = async (req, res) => {
  try {
    const { feedback } = req.body;
    if (!feedback || feedback.trim() === "") {
      return res.status(400).json({ message: "Feedback harus diisi." });
    }

    const newFeedback = new Pengamat({
      userId: req.user._id,
      feedback: feedback.trim(),
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback berhasil dikirim!",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengirim feedback.",
    });
  }
};

export const getFeedbackByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const feedbacks = await Pengamat.find({ userId })
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      message: "Feedback berhasil diambil.",
      data: feedbacks,
    });
  } catch (error) {
    console.error("Error getting feedback by userId:", error);
    return next(error);
  }
};

export const getFeedbackCountByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const feedbackCount = await Pengamat.countDocuments({ userId });

    return res.status(200).json({
      message: "Jumlah feedback berhasil dihitung.",
      data: feedbackCount,
    });
  } catch (error) {
    console.error("Error getting feedback count by userId:", error);
    return next(error);
  }
};
