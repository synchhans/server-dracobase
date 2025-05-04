import {
  createNotifications,
  getUserNotifications,
  markNotificationAsRead,
} from "../services/notificationService.js";

export const postNotification = async (req, res, next) => {
  try {
    const { userIds, title, message, type, relatedId } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Harus ada minimal satu userId",
      });
    }

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Title dan message wajib diisi.",
      });
    }

    const notifications = userIds.map((userId) => ({
      userId,
      title,
      message,
      type: type || "master",
      relatedId,
    }));

    await createNotifications(notifications);

    return res.status(201).json({
      success: true,
      message: `${notifications.length} notifikasi berhasil dibuat.`,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

export const getNotificationsByUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { page, limit, type } = req.query;

    const result = await getUserNotifications(userId, { page, limit, type });

    return res.status(200).json({
      success: true,
      data: result.notifications,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const patchMarkAsRead = async (req, res, next) => {
  try {
    const { notificationId } = req.params;

    const updated = await markNotificationAsRead(notificationId);

    return res.status(200).json({
      success: true,
      message: "Notifikasi ditandai sebagai dibaca.",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
