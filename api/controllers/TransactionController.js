import Transaction from '../models/sequelize/Transaction';
import User from '../models/sequelize/User';
import Operation from '../models/sequelize/Operation';
import JWT from '../services/jwt';
import http from 'http';
import { send } from 'process';

const PSP_URL = 'http://psp'; // Note that we use the service name cause we are inside the docker-compose network

class TransactionController {};

TransactionController.cGet = (req, res) => {

    const { user } = req;
    
    const filters = user.type === 'admin' ? {} : { where: { UserId: user.id } };
    
    Transaction.findAll({ ...filters, include: [ { model: Operation } ] }).then(transactions => {
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

TransactionController.cancelOrder = (req, res) => {
    
    const { idTransaction, idOperation } = req.params;
    
    Operation.findOne({ where: { id: idOperation, '$Transaction.id$': idTransaction }, include: [ {model: Transaction, include: [ {model: User} ]} ]}).then(operation => {

        if (!(operation && operation.get('status') !== 'COMPLETED')) return res.status(400).json({ success: false, error: 'Bad request' });

        operation
            .set('status', 'CANCELED')
            .save()
        ;

        return res.status(200).json({ success: true, operation: operation.toJSON() });
        
    });
    
};

TransactionController.createOperation = (req, res) => {

    const { idTransaction } = req.params;
    const { id, card } = req.body;

    Operation.findOne({ where: { id, '$Transaction.id$': idTransaction, status: 'WAITING' }, include: [ {model: Transaction, include: [ { model: User } ] } ] }).then(operation => {

        if (!operation) return res.status(400).json({ success: false, error: 'Bad request' });
        // Create the Operation
        res.status(201).json({ success: true, operation });

        console.log('Response has been sent... Calling the PSP...');
        // Start the PSP communication here
        const options = {
            host: 'psp',
            path: '/process_payment',
            port: 9000,
            //This is what changes the request to a POST request
            method: 'POST',
            json: operation,
        };
        //
        const req = http.request(options, response => {
        
            let data = '';
            response.on('data', chunk => {
                data += chunk;
            });

            response.on('end', () => {
                data = JSON.parse(data);
                if (data.success) {
                    // Request payment has success
                    operation.set('status', 'COMPLETED').set('card', card).save();
                } else {
                    // Request payment has failed
                    operation.set('status', 'FAILED').save();
                }
            });
        });
        // Handle PSP errors
        req.on('error', (err) => {
            // Handle errors
            ope.set('status', 'FAILED').save();
        });

        req.end();
        
    });
};

export default TransactionController;