import { Router } from 'express';
import {
  getHobbies,
  pinHobby,
  unpinHobby,
} from '../controllers/hobby.controller';

const router = Router();

router.get('/', getHobbies);

router.post('/:id/pin', pinHobby);

router.delete('/:id/pin', unpinHobby);

export default router;