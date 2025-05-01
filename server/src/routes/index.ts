import { Router } from 'express';
import {
	getCredits,
	createCredit,
	updateCredit,
	deleteCredit,
} from '../controllers/creditController';
import { getContracts, createContract, deleteContract } from '../controllers/contractController';
import { getClients, createClient, deleteClient } from '../controllers/clientController';
import {
	createCreditHistory,
	deleteCreditHistory,
	getCreditHistories,
} from '../controllers/creditHistoryController';
import { handleFormController } from '../controllers/handleFormController';

const router = Router();

router.post('/form', handleFormController);

router.get('/api/credits', getCredits);
router.post('/api/credits', createCredit);
router.put('/api/credits/:id', updateCredit);
router.delete('/api/credits/:id', deleteCredit);

router.get('/api/contracts', getContracts);
router.post('/api/contracts', createContract);
//router.put("/api/contracts/:id", updateContract);
router.delete('/api/contracts/:id', deleteContract);

router.get('/api/clients', getClients);
router.post('/api/clients', createClient);
//router.put("/api/clients/:id", updateClient);
router.delete('/api/clients/:id', deleteClient);

router.get('/api/credit-histories', getCreditHistories);
router.post('/api/credit-history', createCreditHistory);
//router.put("/api/credit-history/:id", updateCreditHistory);
router.delete('/api/credit-history/:id', deleteCreditHistory);

export default router;
