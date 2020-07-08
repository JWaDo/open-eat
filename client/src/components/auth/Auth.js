import React, { useState, useEffect } from 'react';
import { fireAuth } from '../../firebase/config';
import { navigate } from '../../routes';


function Auth() {
    const [user, setUser] = useState({})
    
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fireAuth.createUserWithEmailAndPassword(user.email, user.password)
            .then(user => {
                user.user.sendEmailVerification().then(function() {
                    navigate.push("PrivatePage");
                  }).catch(function(error) {
                    // An error happened.
                  });
            })
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        })
    }

    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <input type="text" name="email" onChange={handleChange}/>
                <input type="text"name="password" onChange={handleChange}/>
                <button type="submit">Login</button>
            </form>
            
        </div>
    )
}

export default Auth
