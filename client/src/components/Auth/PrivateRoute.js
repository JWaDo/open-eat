import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'
import { navigate } from '../../routes';
import { Route } from 'react-router';

function PrivateRoute ({ type, ...props}) {

    const [{ user, token }, { confirm }] = useAuth();
    const [confirming, isConfirming] = useState(true);
    const [confirmed, isConfirmed] = useState(false);

    useEffect(() => {
        // Confirm the token before rendering the page
        isConfirming(true);
        confirm((err, res) => {
            if (err) {
                navigate.push('LoginPage'); // Redirect to the login page
            }
            // Stop confirming
            isConfirming(false);
        })
    }, [ token ]);

    if (confirming) return 'Confirmation in progress...'; // TODO: Replace with a loader

    if (type && !type.split('|').includes(user.type)) navigate.push('NotFoundPage');
    
    return <Route {...props} />
}

export default PrivateRoute
