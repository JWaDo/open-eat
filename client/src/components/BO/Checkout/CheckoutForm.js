import React, { useState } from 'react'
import Input from '../../ui/Input'
import { Button, makeStyles, Box, Typography, Link } from '@material-ui/core';
import { price, formatCreditCard, formatExpiryDate } from '../../../utils';
import { request } from '../../../request';
import confs from '../../../confs';
import { useSnackbar } from 'notistack';
import Operations from '../../../config/operations.config';

const { URL_API } = confs;

const useStyles = makeStyles(theme => ({
    form: {
        '& > *': {
            marginTop: theme.spacing(2),
        }
    },
    buttonGroup: {
        '& > *': {
            marginRight: theme.spacing(2),
        },
        '& > *:last-child': {
            marginRight: 0,
        },
    }
}))

function CheckoutForm({ transaction, checkoutToken, operation }) {

    const required = v => v && v.length > 0 ? undefined : 'This value is required';
    const { enqueueSnackbar } = useSnackbar();

    const [ card, setCard ] = useState({
        name: '',
        number: '',
        exp: '',
        ccv: '',
    });

    const [processing, isProcessing] = useState(false);
    
    const onChange = e => setCard({ ...card, [e.target.name]: e.target.value });
    
    const onSubmit = e => {
        e.preventDefault();

        const operation = {
            type: Operations.types.PAYMENT,
            amount: transaction.total,
            card,
        };

        // Send the paiement request
        request.post(`${URL_API}/transactions/${transaction.id}/operations`, operation, { 'Authorization': `Bearer ${checkoutToken}` })
            .then(data => {
                if (data.success) {
                    window.location.href = data.operation.Transaction.User.confirmUrl;
                }
            }) // TODO: Do something with the data
            .catch(err => console.error('error', err));
    }

    const onCancel = e => {
        e.preventDefault();
        // Notify the server that the paiement has been canceled by the user
        request.post(`${URL_API}/transactions/${transaction.id}/cancel`, {}, { 'Authorization': `Bearer ${checkoutToken}` })
            .then(data => {
                if (data.success) {
                    window.location.href = transaction.User.cancelUrl;
                } else {
                     enqueueSnackbar('Error: we can\'t cancel your order for now', { variant: 'error', autoHideDuration: 3000 });
                }
            })
    };

    const isCardNumberValid = v => v.length === 19 ? undefined : 'The card is not valid';
    const isExpiryDateValid = v => v.length === 5 ? undefined : 'The expiration must follow this format: mm/yy';
    const isCCVValid = v => v.length === 3 ? undefined : 'The CCV is not valid';
    
    const { form, buttonGroup } = useStyles();
    
    return (
        <form  onSubmit={onSubmit} className={form}>
            <Box display='flex' alignItems='flex-end'>
                <Typography color='primary' variant='h3'>
                    { price(operation.amount)}
                </Typography>
                <Box marginLeft={1}>
                    <Typography color='primary' variant='subtitle2'>
                        {transaction.currency}
                    </Typography>
                </Box>
            </Box>
            <Box>
            </Box>
            <Input validate={required} required fullWidth onChange={onChange} label='Name' name='name' type='text' />
            <Input validate={isCardNumberValid} required fullWidth onChange={onChange} value={formatCreditCard(card.number)} label='Card number' name='number' type='text' />
            <Box display='flex' className={buttonGroup}>
                <Box flex={2}>
                    <Input validate={isExpiryDateValid} helperText={'mm/yy format'} required fullWidth onChange={onChange} value={formatExpiryDate(card.exp)} label='Expiration date' name='exp' type='text' />
                </Box>
                <Box flex={1}>
                    <Input validate={isCCVValid} required fullWidth onChange={onChange} label='CCV' name='ccv' type='text' />
                </Box>
            </Box>
            <Button disabled={processing} variant='contained' color='primary' type='submit' fullWidth>
                {processing ? 'Processing ...' : 'Process to' + operation.type === Operations.types.PAYMENT ? 'payement' : 'refund'}
            </Button>
            <Typography variant='subtitle2'>
                I am a looser, so please <Link href={''} onClick={onCancel}>cancel now.</Link>
            </Typography>
        </form>
    )
}

export default CheckoutForm
