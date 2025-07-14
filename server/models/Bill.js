import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Now referencing User model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Unpaid',
  },
  dueDate: {
    type: Date,
    required: true,
  },
  issuedOn: {
    type: Date,
    default: Date.now,
  }
});

const Bill = mongoose.model('Bill', billSchema);
export default Bill;
