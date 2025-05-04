import Notification from "../models/Notification.js";

export const createNotifications = async (notifications) => {
  return await Notification.insertMany(notifications);
};

export const getUserNotifications = async (userId, query) => {
  const { page = 1, limit = 10, type } = query;

  const filters = { userId };
  if (type) filters.type = type;

  const notifications = await Notification.find(filters)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();

  const total = await Notification.countDocuments(filters);

  return { notifications, pagination: { page, limit, total } };
};

export const markNotificationAsRead = async (notificationId) => {
  const notification = await Notification.findById(notificationId);

  if (!notification) throw new Error("Notifikasi tidak ditemukan");

  if (notification.read) return notification;

  notification.read = true;
  notification.readAt = new Date();
  return await notification.save();
};
