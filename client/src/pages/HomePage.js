import React, { useEffect, useState } from 'react';
import Listings from '../components/Listings/Listings';
import Users from '../firebase/collections/Users';
import { Button } from '@material-ui/core';
import { navigate } from '../routes';
import { fireAuth } from '../firebase/config';
import { useSnackbar } from 'notistack';
import AppMenu from '../components/navigation/AppMenu';

function HomePage() { 

    return (
        <div>
            <AppMenu isLoggedUser/>
            <Listings />
        </div>
    );
}

export default HomePage
