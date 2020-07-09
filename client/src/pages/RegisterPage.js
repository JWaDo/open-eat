import React, { useEffect } from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { fireAuth } from '../firebase/config';
import { navigate } from '../routes';

function RegisterPage() {

    useEffect(() => {
        if(fireAuth.currentUser) navigate.replace("HomePage");
    }, [])

    return (
        <div>
            <RegisterForm />
        </div>
    )
}

export default RegisterPage;
