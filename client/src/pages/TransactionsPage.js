import React from 'react'
import Header from '../components/BO/Header';
import useAuth from '../components/BO/Auth/useAuth';
import TransactionsList from '../components/BO/Transactions/TransactionsList';

function TransactionsPage() {

    const [{ user }, { logout }] = useAuth();
    
    return (
        <React.Fragment>
            <Header
                username={`${user.firstname} ${user.lastname}`}
                credentials={user.credentials}
                logout={logout}
            />

            <TransactionsList />

        </React.Fragment>
    )
}

export default TransactionsPage