import React, { useEffect, useState } from 'react';
import Listings from '../components/Listings/Listings';
import Users from '../firebase/collections/Users';
import { Button } from '@material-ui/core';
import { navigate } from '../routes';
import { fireAuth, fireStorage } from '../firebase/config';
import { useSnackbar } from 'notistack';
import AppMenu from '../components/navigation/AppMenu';
import coci from '../assets/coci.jpg';




function HomePage() { 

    const [image, setImage] = useState("");
    const [file, setFile] = useState();
    
    return (
        <div>
            <AppMenu isLoggedUser/>
            <Listings />
            <img src={image} alt=""/>
        </div>
    );
}

export default HomePage
