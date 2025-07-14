import express from 'express';
import {
  createBill,
  getBillsByUser,
  getAllBills,
  updateBillStatus,
  getBillsByMember
} from '../controllers/billController.js';

const router = express.Router();

router.post('/', createBill); // Admin assigns bill to user
router.get('/user/:id', getBillsByUser); // Member views own bills
router.get('/', getAllBills); // Admin views all
router.put('/:id', updateBillStatus); // Mark paid/edit
router.get('/member/:userId', getBillsByMember); // Member views own bills
router.put('/:id/pay', updateBillStatus); // Member marks bill as paid

export default router;
