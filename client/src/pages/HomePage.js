import React, { useState, useEffect } from 'react';
import ListingsList from '../components/Listings/ListingsList';
import Users from '../firebase/collections/Users';
import { Button } from '@material-ui/core';
import { navigate } from '../routes';
import { fireAuth, fireStorage } from '../firebase/config';
import { useSnackbar } from 'notistack';
import AppMenu from '../components/navigation/AppMenu';
import coci from '../assets/coci.jpg';




function HomePage() { 

    const [user, setUser] = useState(null);
    const [isFavFiltering, setIsFavFiltering] = useState(false);

    useEffect(() => {
        fireAuth.onAuthStateChanged(function(_user) {
            if (_user) {
                setUser(_user.toJSON());
            } else {
                setUser(null);
            }
          });
    }, []);

    return (
        <div>
            <AppMenu 
                isLoggedUser
                isFavFiltering={isFavFiltering}
                setIsFavFiltering={setIsFavFiltering}
            />
            <ListingsList 
                isFavFiltering={isFavFiltering}
                currentUser={user}
            />
        </div>
    );
}

export default HomePage
