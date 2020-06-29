import Transaction from '../models/sequelize/Transaction';
import User from '../models/sequelize/User';
import Operation from '../models/sequelize/Operation';
import JWT from '../services/jwt';

class TransactionController {};

TransactionController.cGet = (req, res) => {

    const { user } = req;
    
    const filters = user.type === 'admin' ? {} : { where: { UserId: user.id } };
    
    Transaction.findAll({ ...filters }).then(transactions => {
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
};

TransactionController.iGet = (req, res) => {

    const { user } = req;
    const { id } = req.params;
    
    const filters = (['admin', 'checkout'].includes(user.type))  ? { where: { id } } : { where: { id, UserId: user.id } };

    // When called by the checkout Page
    if (user.type === 'checkout' && !(Number(id) === Number(user.transaction.id))) return res.status(400).json({ success: false, error: 'Bad request' });
    
    Transaction.findOne({...filters, include: [ User, Operation ]}).then(transaction => {
        return res.status(200).json({
            success: true,
            transaction
        });
    })
    .catch(err => {
        return res.status(400).json({
            success: false,
            error: err
        });
    });    
};

TransactionController.createTransactionIntent = (req, res) => {

    const { clientToken, clientSecret } = req.body;
    
    User.findOne({ where: { clientSecret, clientToken }}).then(user => {
        // Reject if no user found
        if (!(user && user.get('confirmed') === true)) return res.status(400).json({ success: false, err: 'Bad request' });
        // Retrieve transactions information
        const { basket, customer, billingAddress, deliveryAddress, currency, total } = req.body;
        // 
        Transaction.create({ status: 'PENDING', basket, customer, billingAddress, deliveryAddress, currency, total, UserId: user.get('id') }, { include: [ User ] })
            .then(trans => {

                const operation = {
                    amount: trans.total,
                    type: 'PAYMENT',
                    status: 'WAITING',
                };
                
                const paymentToken = JWT.create({
                    type: 'checkout',
                    operation,
                    transaction: trans.toJSON(),
                });
                
                const transaction = {
                    ...trans.toJSON(),
                    operation,
                    checkoutForm: `http://localhost:3001/checkout/${trans.id}?token=${paymentToken}`,
                };
                
                return res.status(200).json({ success: true, transaction });
            });
    });
};

TransactionController.cancelOrder = (req, res) => {
    
    const { id } = req.params;
    
    Transaction.findOne({ where: { id }, include: [ User ]}).then(transaction => {

        if (!(transaction && transaction.status === 'PENDING')) return res.status(400).json({ success: false, error: 'Bad request' });

        transaction
            .set('status', 'CANCELED')
            .set('isOperating', false)
            .save()
        ;

        return res.status(200).json({ success: true, transaction });
        
    });
    
};

TransactionController.createOperation = (req, res) => {

    const { id } = req.params;

    Transaction.findOne({ where: { id }, include: [ Operation ] }).then(transaction => {

        const { type, amount } = req.body;
        
        if (!transaction || (type === 'PAYMENT' && (transaction.Operations.length > 0))) return res.status(400).json({ success: false, error: 'Bad request' });
        
        // Create the Operation
        Operation.create({ status: 'WAITING', amount, type, TransactionId: transaction.get('id') }, { include: [ { model: Transaction, include: [ User ]} ]})
            .then(operation => {
                // Note that we not return the response, cause we wanna start behin an asynchronous treatment
                Operation.findOne({ where: { id: operation.id }, include: [ {model: Transaction, include: [ User ] } ]}).then(ope => {
                    res.status(201).json({ success: true, operation: ope });
                });

                // Start the PSP requests!

            });
    });
    
};

export default TransactionController;