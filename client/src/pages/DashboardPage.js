import React from 'react'
import Header from '../components/BO/Header';
import useAuth from '../components/BO/Auth/useAuth';
import { Container } from '@material-ui/core';
import TransactionsList from '../components/BO/Transactions/TransactionsList';

function DashboardPage() {

    const [{ user }, { logout }] = useAuth();
    
    return (
        <React.Fragment>
            <Header
                username={`${user.firstname} ${user.lastname}`}
                logout={logout}
            />

            <TransactionsList />

        </React.Fragment>
    )
}

export default DashboardPage
