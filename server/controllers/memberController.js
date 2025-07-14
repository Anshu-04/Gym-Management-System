import Member from '../models/Member.js';

export const createMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json({ message: 'Member added', member });
  } catch (error) {
    res.status(400).json({ message: 'Error creating member', error: error.message });
  }
};

export const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members', error: error.message });
  }
};

export const updateMember = async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Member updated', updated });
  } catch (error) {
    res.status(400).json({ message: 'Error updating member', error: error.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member', error: error.message });
  }
};
