import React from 'react'
import Header from '../components/BO/Header'
import useAuth from '../components/BO/Auth/useAuth';
import ChartsTrader from '../components/SiteMarchand/ChartsTrader';

function DashboardPage() {

    const [{ user }, { logout }] = useAuth();

    return (
        <React.Fragment>
            <Header
                username={`${user.firstname} ${user.lastname}`}
                credentials={user.credentials}
                logout={logout}
            />

            <ChartsTrader />

        </React.Fragment>
    )
}

export default DashboardPage

