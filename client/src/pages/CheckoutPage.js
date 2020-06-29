import React, { useEffect, useState } from 'react'
import { CircularProgress, Box, Container, Paper } from '@material-ui/core';
import qs from 'querystring';
import confs from '../confs';
import { useSnackbar } from 'notistack';
import CheckoutError from '../components/BO/Checkout/CheckoutError';
import CheckoutForm from '../components/BO/Checkout/CheckoutForm';
import Transaction from '../config/transactions.config';

const { URL_API } = confs;

function CheckoutPage({ match, location }) {

    const { id_transaction } = match.params;
    const { token } = location.search && qs.parse(location.search.replace('?', ''));

    const decodedToken = token && JSON.parse(atob(token.split('.')[1])) || {};

    const [ transaction, setTransaction ] = useState(decodedToken.transaction);
    const [ operation, setOperation ] = useState(decodedToken.operation);
    const [error, setError ] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    
    useEffect(() => {
        
        const failed = () => enqueueSnackbar('We can\'t process payment for now.', { variant: 'error', autoHideDuration: 3000 });
        // Retrieve the transaction

        if (!(decodedToken.transaction && (Number(decodedToken.transaction.id) === Number(id_transaction)))) {
            setError(true);
            return failed();
        };
        
        setTransaction(decodedToken.transaction);
        setOperation(decodedToken.operation);

    }, [ id_transaction ])

    console.log('operation, transaction', operation, transaction);

    if (!(!error && (transaction && transaction.status === Transaction.status.PENDING && transaction.isOperating === true))) return <CheckoutError />;

    return (
        <Container maxWidth='xs'>
            <Box 
                width='100%' minHeight='100vh'
                display='flex' justifyContent='center' alignItems='center'
            >
                <Box width='100%'>
                    <Paper>
                        <Box p={3}>
                            <CheckoutForm transaction={transaction} operation={operation} checkoutToken={token} />
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
}

export default CheckoutPage
