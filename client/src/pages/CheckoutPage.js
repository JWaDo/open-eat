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

    const { idTransaction } = match.params;
    const { token } = qs.parse(location.search.replace('?', ''));

    const decodedToken = JSON.parse(atob(token.split('.')[1]));

    const [ transaction, setTransaction ] = useState(null);
    const [ operation, setOperation ] = useState(null);
    const [error, setError ] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    
    useEffect(() => {
        
        const failed = () => enqueueSnackbar('We can\'t for a paiement now.', { variant: 'error', autoHideDuration: 3000 });
        // Retrieve the transaction

        if (Number(decodedToken.transaction.id) !== Number(idTransaction)) {
            setError(true);
            return failed();
        };
        
        setTransaction(decodedToken.transaction);
        setOperation(decodedToken.operation);

    }, [ idTransaction ])
    
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
