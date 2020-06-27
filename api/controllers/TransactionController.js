import Transaction from '../models/sequelize/Transaction';
import JWT from '../services/jwt';

class TransactionController {};

TransactionController.cGet = (req, res) => {

    const { user } = req;

    const filters = user.type === 'admin' ? {} : { where: { UserId: user.id } };
    
    Transaction.findAll(filters).then(transactions => {
        res.status(200).json({
            success: true,
            transactions
        });
    })
    .catch(err => {
        res.status(200).json({
            success: false,
            error: err
        });
    });    
} 

export default TransactionController;