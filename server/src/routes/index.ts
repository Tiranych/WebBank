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

const router = Router();

router.get('/credits', getCredits);
router.post('/credits', createCredit);
router.put('/credits/:id', updateCredit);
router.delete('/credits/:id', deleteCredit);

router.get('/contracts', getContracts);
router.post('/contracts', createContract);
//router.put("/contracts/:id", updateContract);
router.delete('/contracts/:id', deleteContract);

router.get('/clients', getClients);
router.post('/clients', createClient);
//router.put("/clients/:id", updateClient);
router.delete('/clients/:id', deleteClient);

router.get('/credit-histories', getCreditHistories);
router.post('/credit-history', createCreditHistory);
//router.put("/credit-history/:id", updateCreditHistory);
router.delete('/credit-history/:id', deleteCreditHistory);

export default router;
