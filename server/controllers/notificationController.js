import Notification from '../models/Notification.js';

export const createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json({ message: 'Notification sent', notification });
  } catch (err) {
    res.status(400).json({ message: 'Error sending notification', error: err.message });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdOn: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err.message });
  }
};
