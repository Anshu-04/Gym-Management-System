import express from 'express';
import {
  createMember,
  getMembers,
  updateMember,
  deleteMember
} from '../controllers/memberController.js';

const router = express.Router();

router.post('/', createMember);
router.get('/', getMembers);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

export default router;
