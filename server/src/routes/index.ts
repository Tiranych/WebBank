import { Router } from 'express';
import { getClients, updateClient, getClientsById } from '../controllers/clientController';
import {
	getCreditHistoryForClient,
	getCreditHistories,
} from '../controllers/creditHistoryController';
import { handleFormController } from '../controllers/handleFormController';
import { scoringController } from '../controllers/scoringController';
import { signup, signin, auth, check } from '../controllers/authController';
import { creditController } from '../controllers/creditController';
import { getPortfolio, updatePortfolio } from '../controllers/portfolioController';

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

router.post('/api/credit/create', auth, creditController);

router.get('/api/get/portfolio', auth, getPortfolio);
router.put('/api/update/portfolio', auth, updatePortfolio);

export default router;
