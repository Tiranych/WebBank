import { Router } from 'express';
import {
	getClients,
	updateClient,
	deleteClient,
	getClientsById,
} from '../controllers/clientController';
import {
	createCreditHistory,
	deleteCreditHistory,
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
//router.delete('/api/clients/:id', deleteClient);

router.get('/api/credit-histories', auth, getCreditHistories);
router.get('/api/credit-history', auth, getCreditHistoryForClient);
//router.put("/api/credit-history/:id", updateCreditHistory);
//router.delete('/api/credit-history/:id', deleteCreditHistory);

router.get('/api/check', auth, check);

router.post('/api/predict', auth, scoringController);
router.post('/form', auth, handleFormController);
router.post('/signup', signup);
router.post('/signin', signin);

export default router;
