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
import { signup, signin } from '../controllers/authController';

const router = Router();

router.get('/api/clients', getClients);
router.get('/api/clients/:id', getClientsById);
router.put('/api/clients/:id', updateClient);
//router.delete('/api/clients/:id', deleteClient);

router.get('/api/credit-histories', getCreditHistories);
router.get('/api/credit-history', getCreditHistoryForClient);
//router.put("/api/credit-history/:id", updateCreditHistory);
//router.delete('/api/credit-history/:id', deleteCreditHistory);

router.post('/form', handleFormController);
router.post('/api/predict', scoringController);
router.post('/signup', signup);
router.post('/signin', signin);

export default router;
