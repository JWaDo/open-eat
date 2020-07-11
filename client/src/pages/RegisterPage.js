import React, { useEffect } from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { fireAuth } from '../firebase/config';
import { navigate } from '../routes';

function RegisterPage() {

    useEffect(() => {
        fireAuth.onAuthStateChanged(function(_user) {
            if (_user) {
                navigate.push("HomePage")
            }
          });
    }, []);

    return (
        <div>
            <RegisterForm />
        </div>
    )
}

export default RegisterPage;
