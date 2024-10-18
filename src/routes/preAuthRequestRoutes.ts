import { Router } from 'express';
import {
  createPreAuthorizationRequest,
  getPreAuthRequestsForPatient,
  getPreAuthorizationRequestById,
  updatePreAuthorizationRequest,
  deletePreAuthorizationRequest,
} from '../controllers/preAuthRequest';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.post('/', authMiddleware, createPreAuthorizationRequest);
router.get('/', authMiddleware, getPreAuthRequestsForPatient);
router.get('/:id', authMiddleware, getPreAuthorizationRequestById);
router.put('/:id', authMiddleware, updatePreAuthorizationRequest);
router.delete('/:id', authMiddleware, deletePreAuthorizationRequest);

export default router;
