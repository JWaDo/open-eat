import React, { useState } from 'react';
import { fireAuth } from '../../firebase/config';
import { navigate } from '../../routes';
import { useSnackbar } from 'notistack';
import { Typography, Link } from '@material-ui/core';

function LoginForm() {
    const [user, setUser] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fireAuth.signInWithEmailAndPassword(user.email, user.password)
            .then(user => {
                console.log("connected");
                console.log(user);
                enqueueSnackbar("Welcome", { variant: "success" });
            })
            .catch(function(error) {
                const errorMessage = error.message;
                enqueueSnackbar(errorMessage, { variant: "error" });
        })
    }

    return (
        <div>
            LoginForm
            <form method="post" onSubmit={handleSubmit}>
                <input type="text" name="email" onChange={handleChange}/>
                <input type="text"name="password" onChange={handleChange}/>
                <button type="submit">Login</button>
            </form>
            <Link
                component="button"
                variant="body"
                onClick={(e) => {
                    e.preventDefault();
                    navigate.push("RegisterPage");
                }}
                >
                Not registered yet ? Come here
            </Link>
        </div>
    )
}

export default LoginForm
