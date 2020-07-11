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

    const [user, setUser] = useState(false);
    const [isFavFiltering, setIsFavFiltering] = useState(false);
    const [searchWord, setSearchWord] = useState("");


    useEffect(() => {
        fireAuth.onAuthStateChanged(function(_user) {
            if (_user) {
                setUser(_user.toJSON());
            } else {
                setUser(null);
            }
          });
          if(!user) return ;
          if(user === false) navigate.push("LoginPage");
    }, []);

    return (
        <div>
            <AppMenu 
                isLoggedUser
                isFavFiltering={isFavFiltering}
                setIsFavFiltering={setIsFavFiltering}
                setSearchWord={setSearchWord}
            />
            <ListingsList 
                isFavFiltering={isFavFiltering}
                currentUser={user}
                searchWord={searchWord}
            />
        </div>
    );
}

export default HomePage
