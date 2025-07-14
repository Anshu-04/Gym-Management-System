import Bill from '../models/Bill.js';
import User from '../models/User.js';

export const createBill = async (req, res) => {
  try {
    const { userId, amount, status, dueDate } = req.body;

    const user = await User.findById(userId);
    if (!user || user.role !== 'member') {
      return res.status(404).json({ message: 'Member user not found' });
    }

    const bill = new Bill({ userId, amount, status, dueDate });
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ message: 'Error creating bill', error: err.message });
  }
};

export const getBillsByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const bills = await Bill.find({ userId }).sort({ dueDate: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bills', error: err.message });
  }
};

export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate('userId', 'username email');
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bills", error: err.message });
  }
};

export const getBillsByMember = async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.params.userId });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bills', error: err.message });
  }
};

export const updateBillStatus = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    bill.status = 'Paid';
    await bill.save();
    res.json(bill);
  } catch (err) {
    res.status(400).json({ message: 'Error updating bill', error: err.message });
  }
};
