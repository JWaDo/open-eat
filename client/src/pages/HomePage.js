import React, { useState } from 'react';
import ListingsList from '../components/Listings/ListingsList';
import Users from '../firebase/collections/Users';
import { Button } from '@material-ui/core';
import { navigate } from '../routes';
import { fireAuth, fireStorage } from '../firebase/config';
import { useSnackbar } from 'notistack';
import AppMenu from '../components/navigation/AppMenu';
import coci from '../assets/coci.jpg';




function HomePage() { 
    return (
        <div>
            <AppMenu isLoggedUser/>
            <ListingsList />
        </div>
    );
}

export default HomePage
