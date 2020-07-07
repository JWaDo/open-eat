import React from 'react'
import Header from '../components/BO/Header'
import useAuth from '../components/BO/Auth/useAuth';
import ChartsTrader from '../components/SiteMarchand/ChartsTrader';
import { useSelector } from '../store';

function DashboardPage() {

    const [{ user }, { logout }] = useAuth();
    const transactions = useSelector(state => state.transactions.transactions)

    return (
        <React.Fragment>
            <Header
                username={`${user.firstname} ${user.lastname}`}
                credentials={user.credentials}
                logout={logout}
            />

            <ChartsTrader transactions={transactions} />

        </React.Fragment>
    )
}

export default DashboardPage

