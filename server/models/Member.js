import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  plan: String,
  joinedOn: {
    type: Date,
    default: Date.now,
  }
});

const Member = mongoose.model('Member', memberSchema);
export default Member;
