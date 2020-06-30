import React, { useEffect, useState } from 'react'
import { Container, Paper, CircularProgress, Box, ListItem, List, Typography, ListItemText, makeStyles, ListItemAvatar, Avatar, Collapse } from '@material-ui/core'
import useTransactions from './useTransactions';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import TransactionDetails from './TransactionDetails';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
    },
}));

function TransactionsList({ user }) {

    const [{ transactions }, { getTransactions, getTransaction }] = useTransactions();
    const { enqueueSnackbar } = useSnackbar();
    
    const [fetching, isFetching] = useState(false);
    const [selectedTransaction, selectTransaction] = useState(null);
    
    const onSelect = idTransaction => {
        getTransaction(idTransaction, (err, data) => {
            if (err) return enqueueSnackbar('Oops, an error occured', { variant: 'error', autoHideDuration: 3000 });
            selectTransaction(data);
        });
    };

    const { container } = useStyles();
    
    useEffect(() => {

        isFetching(true);
        // Fetch transactions
        getTransactions((err, data) => {
            if (err) {
                enqueueSnackbar('Oops, an error occured', { variant: 'error', autoHideDuration: 3000 });
            }
            isFetching(false);
        });
        
    }, []);

    if (transactions.length === 0 && fetching) return (
        <Box width='100%' height='100vh' display='flex' justifyContent='center' alignItems='center'>
            <CircularProgress />
        </Box>
    )

    return (
        <Container className={container} maxWidth='sm'>
            <Paper>

                <List>
                    { transactions.map((transaction, key) => (
                            <Transaction 
                                key={key} 
                                transaction={transaction} 
                                onSelect={onSelect}
                                selectedTransaction={selectedTransaction}
                                goBack={() => selectTransaction(null)}
                            />
                        )) 
                    }
                </List>

            </Paper>
        </Container>
    )
}

const Transaction = ({ transaction, onSelect, selectedTransaction, goBack }) => {
    
    return (
        <React.Fragment>
            <ListItem button alignItems="flex-start" onClick={e => onSelect(transaction.id)}>
                <ListItemAvatar>
                    <Avatar alt={`${transaction.customer.firstname} ${transaction.customer.lastname}`}/>
                </ListItemAvatar>
                <ListItemText
                primary={<><strong>#{transaction.id}</strong> - {transaction.customer.firstname} {transaction.customer.lastname}, le {moment(transaction.createdAt).format('DD/MM/YYYY')}</>}
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="h6"
                        color="primary"
                    >
                        {transaction.total} {' '}
                        <Typography component='span' variant='subtitle2'>
                            {transaction.currency}
                        </Typography>
                    </Typography>
                    {" -- "} {transaction.basket.length} products
                    </React.Fragment>
                }
                />
            </ListItem>

            <Collapse in={selectedTransaction && selectedTransaction.id === transaction.id}>
                {
                    selectedTransaction && (
                        <TransactionDetails 
                            goBack={goBack}
                            transaction={selectedTransaction}
                        />
                    )
                }
            </Collapse>

        </React.Fragment>
    )
};

export default TransactionsList
