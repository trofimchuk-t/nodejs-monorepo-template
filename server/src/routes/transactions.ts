import { Router } from 'express';
import { addTransaction, deleteTransaction, getTransactions } from '../controllers/transactions';

const router = Router();

router.route('/').get(getTransactions).post(addTransaction);

router.route('/:id').delete(deleteTransaction);

export default router;
