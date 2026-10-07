import { Router } from 'express';
import {
  createHobbyRecord,
  getHobbyRecords,
  getHobbyRecordsByHobby,
  getHobbyRecordById,
  updateHobbyRecord,
  deleteHobbyRecord,
} from '../controllers/hobby-record.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, createHobbyRecord);

router.get('/', authenticate, getHobbyRecords);

router.get('/hobby/:hobbyId', authenticate, getHobbyRecordsByHobby);

router.get('/:id', authenticate, getHobbyRecordById);

router.patch('/:id', authenticate, updateHobbyRecord);

router.delete('/:id', authenticate, deleteHobbyRecord);

export default router;