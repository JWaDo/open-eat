import express from 'express';
import TransactionController from '../../controllers/TransactionController';
import JWT from '../../services/jwt';

const router = express.Router();

// Get all transactions [ Reachable for token type 'admin' ] --> see login method
router.route('/')
  .get(JWT.verify, TransactionController.cGet);

export default router;