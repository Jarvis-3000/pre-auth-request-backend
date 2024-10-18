import { Router } from 'express';
import {
  createPatient,
  getPatients,
  getPatientById,
} from '../controllers/patient';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.post('/', authMiddleware, createPatient);
router.get('/', authMiddleware, getPatients);
router.get('/:id', authMiddleware, getPatientById);

export default router;
