import { Router } from 'express';
import { getClients, updateClient, getClientsById } from '../controllers/clientController';
import {
	getCreditHistoryForClient,
	getCreditHistories,
} from '../controllers/creditHistoryController';
import { handleFormController } from '../controllers/handleFormController';
import { scoringController } from '../controllers/scoringController';
import { signup, signin, auth, check } from '../controllers/authController';

const router = Router();

router.get('/api/clients', auth, getClients);
router.get('/api/clients/:id', auth, getClientsById);
router.put('/api/clients/:id', auth, updateClient);

router.get('/api/credit-histories', auth, getCreditHistories);
router.get('/api/credit-history', auth, getCreditHistoryForClient);

router.get('/api/check', auth, check);

router.post('/api/predict', auth, scoringController);
router.post('/form', auth, handleFormController);
router.post('/signup', signup);
router.post('/signin', signin);

export default router;
