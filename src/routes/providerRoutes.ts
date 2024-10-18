import { Router } from 'express';
import { getProviderById, updateProvider } from '../controllers/provider';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware, getProviderById);
router.put('/', updateProvider);

export default router;
