import React from 'react'
import Header from '../components/BO/Header'
import useAuth from '../components/BO/Auth/useAuth';

function CustomersPage() {

    const [{ user }, { logout }] = useAuth();

    return (
        <React.Fragment>
            <Header
                username={`${user.firstname} ${user.lastname}`}
                credentials={user.credentials}
                logout={logout}
            />

            Customer Page

        </React.Fragment>
    )
}

export default CustomersPage
