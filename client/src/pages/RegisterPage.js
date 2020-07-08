import React, { useEffect } from 'react';
import Auth from '../components/auth/Auth';
import { fireAuth } from '../firebase/config';
import { navigate } from '../routes';

function RegisterPage() {

    useEffect(() => {
        console.log(fireAuth.currentUser);
        if(fireAuth.currentUser) navigate.replace("HomePage");
    }, [])

    return (
        <div>
            <Auth />
        </div>
    )
}

export default RegisterPage;
