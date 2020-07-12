import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { fireAuth } from '../../firebase/config';
import { navigate } from '../../routes/index';

function PrivateRoute(props) {

    const [confirmedUser, setConfirmedUser] = useState(true);

    useEffect(() => {
        fireAuth.onAuthStateChanged(function(user) {
            if (user) {
                setConfirmedUser(user);
            } else {
                setConfirmedUser(false);
            }
        });
    }, [confirmedUser])

    if(!confirmedUser) {
        navigate.push("LoginPage");
        return null;
    }

    if(confirmedUser === true) return null; 

    return <Route {...props} component={undefined} render={(_props) => <props.component {..._props} currentUser={confirmedUser.toJSON()}/>}/>
}

export default PrivateRoute;
