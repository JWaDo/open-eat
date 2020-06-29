import express from 'express';
import MeController from '../../controllers/MeController';

const router = express.Router();

// Get all transactions [ Reachable for token type 'admin' ] --> see login method
router.route('/transactions')
  .get(MeController.getTransactions)
  .post(MeController.createTransactionIntent);

// Get all transactions [ Reachable for token type 'admin' ] --> see login method
router.route('/transactions/:idTransaction/refund')
  .post(MeController.createRefundIntent);

export default router;