import express from 'express';
import MeController from '../../controllers/MeController';
import Auth from '../../services/auth';

const router = express.Router();

// Get all transactions [ Reachable for token type 'admin' ] --> see login method
router.route('/transactions')
  .get(Auth.verify, MeController.getTransactions)
  .post(Auth.verify, MeController.createTransactionIntent);

// Get all transactions [ Reachable for token type 'admin' ] --> see login method
router.route('/transactions/:idTransaction/refund')
  .post(Auth.verify, MeController.createRefundIntent);

export default router;