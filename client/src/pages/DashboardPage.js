import React from 'react'
import Header from '../components/BO/Header';
import useAuth from '../components/BO/Auth/useAuth';
import { Container } from '@material-ui/core';

function DashboardPage() {

    const [{ user }, { logout }] = useAuth();
    
    return (
        <React.Fragment>
            <Header
                username={`${user.firstname} ${user.lastname}`}
                logout={logout}
            />

            <Container maxWidth='md'>
                {
                    user.type === 'admin' ? (
                        <React.Fragment>
                            
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                                
                        </React.Fragment>
                    )
                }
            </Container>

            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>
            <p>
                Test
            </p>

        </React.Fragment>
    )
}

export default DashboardPage
