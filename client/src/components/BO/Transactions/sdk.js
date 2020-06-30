import { request } from "../../../request";
import confs from '../../../confs';

const { URL_API } = confs;

export default {

    //
    getTransactions: () => request.get(`${URL_API}/transactions`),

    //
    getTransaction: (idTransaction) => request.get(`${URL_API}/transactions/${idTransaction}`),

    //
    createRefundIntent: (idTransaction, amount, { clientSecret, clientToken }) => 
        request.post(`${URL_API}/me/transactions/${idTransaction}/refund?clientSecret=${clientSecret}&clientToken=${clientToken}`, { amount }),

};
