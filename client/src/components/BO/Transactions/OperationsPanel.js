import React from 'react'
import { makeStyles, Box, Chip, Typography, Button } from '@material-ui/core';
import { formatCreditCard } from '../../../utils';

const useStyles = makeStyles(theme => ({
    operations: {
        borderLeft: '2px solid '+theme.palette.primary.main,
        padding: 0,
        margin: 0,
        listStyle: 'none',
    },
    timelineBubble: {
        position: 'absolute',
        top: 15, 
        left: -7, 
        width: 12, 
        height: 12, 
        borderRadius: 100, 
        backgroundColor: theme.palette.primary.main
    },
    refund: {
        backgroundColor: 'orange',
        color: 'white',
    },
    payment: {
        backgroundColor: 'limeGreen',
        color: 'white',
    },
    waiting: {
        backgroundColor: 'fireBrick',
        color: 'white',
    },
    creditCard: {
        backgroundColor: '#7f5a83',
        backgroundImage: 'linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)',
        width: 150 * 1.6,        // ~= Nombre d'or
        height: 150,
        borderRadius: 10,
        boxShadow: theme.shadows[4],
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    cardInscription: {
        textShadow: '1px 1px 2px grey',
        color: 'white',
        fontSize: 12,
    },
    titleInscription: {
        textShadow: '1px 1px 2px grey',
        color: 'white',
        fontSize: 9,
    }
}));

function OperationsPanel({ transaction }) {

    const { Operations } = transaction;
    const classes = useStyles();
    
    return (
        <React.Fragment>

            <ul className={classes.operations}>
                {Operations.map(operation => (
                    <Operation operation={operation} currency={transaction.currency} />
                ))}
            </ul>
            
        </React.Fragment>
    )
}

const Operation = ({ operation, currency }) => {

    const { timelineBubble, refund, payment, waiting } = useStyles();
    
    return (
        <li>
            <Box position='relative'>
                <Box className={timelineBubble} />
                <Box 
                    width='100%' px={2} py={1}
                    display='flex' flexDirection='column'
                >
                    <Box>
                        {(operation.type === 'PAYMENT' && operation.status !== 'WAITING') && <Chip className={payment} size='small' label={`${operation.type} ${operation.amount}${currency}`} />}
                        {(operation.type === 'REFUND' && operation.status !== 'WAITING') && <Chip className={refund} size='small' label={`${operation.type} ${operation.amount}${currency}`} />}
                        {operation.status === 'WAITING' && <Chip className={waiting} size='small' label={`${operation.type} ${operation.amount}${currency}`} />}
                    </Box>
                    <Box width='100%' display='flex'>
                        {operation.status === 'COMPLETED' && <CreditCard card={operation.card} />}
                        {operation.status === 'WAITING' && (
                            <Box>
                                <Typography component='p' variant='subtitle2'>
                                    This operations is pending...
                                </Typography>
                                <Box display='flex'>
                                    <Box mr={1}>
                                        <Button color='primary' variant='outlined' size='small'>
                                            Cancel
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button color='primary' variant='contained' size='small'>
                                            Complete
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Box>
                    
                </Box>
            </Box>
        </li>
    );
}

const CreditCard = ({ card }) => {
    const { creditCard, cardInscription, titleInscription } = useStyles();

    return (
        <Box className={creditCard} display='flex' flexDirection='column'>
            <Box p={3}>
                <Typography className={titleInscription}>
                    Owner
                </Typography>
                <Typography className={cardInscription}>
                    {card.name}
                </Typography>
            </Box>
            <Box px={3} py={1}>
                <Typography className={titleInscription}>
                    Card number
                </Typography>
                <Typography className={cardInscription}>
                    {formatCreditCard(card.number.slice(0, 4))+' XXXX XXXX XXXX'}
                </Typography>
            </Box>
        </Box>
    );
}

export default OperationsPanel
