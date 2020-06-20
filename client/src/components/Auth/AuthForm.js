import React, { useState, useEffect } from 'react'
import useAuth from './useAuth'
import { navigate } from '../../routes';

function AuthForm() {

    const [{ user, token }, { login }] = useAuth();
    const [loging, isLoging] = useState(false);

    const [credentials, setCredentials] = useState({});
    
    const onChange = e => setCredentials({...credentials, [e.target.name]: e.target.value});

    const onSubmit = (e, v) => {
        e.preventDefault();
        isLoging(true);
        // Call login from hook
        login(credentials, (err, res) => {
            if (!err) {
                // Success
                navigate.push('DashboardPage');
            }
            isLoging(false);
        });
    }

    useEffect(() => {
        // Redirect to dashboard if current user already logged in
        if (user && token) navigate.push('DashboardPage');
    }, []);
    
    return (
        <form onSubmit={onSubmit}>
            <input onChange={onChange} name='email' type='text' />
            <input onChange={onChange} name='password' type='password' />
            <button type='submit'>Submit</button>
        </form>
    );
}

export default AuthForm
