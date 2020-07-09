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
    
    fireStorage.ref("profilePicture")
        .child("logo.png")
        .getDownloadURL()
        .then(img => setImage(img));

    const uploadImage = (e, file) => {
        e.preventDefault();

        const metadata = {
            contentType: 'image/jpeg',
        };

        const storageRef = fireStorage.ref();
        storageRef.child('profilePicture/charles.jpg')
            .put(file, metadata)
            .then(data => console.log(data));
    }

    return (
        <div>
            <AppMenu isLoggedUser/>
            <Listings />
            <form onSubmit={(e) => uploadImage(e, file)}>
                <input 
                    type="file"
                    id="avatar"
                    name="avatar"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Button type='submit' onClick={(e) => {
                    
                }}>Upload</Button>
            </form>
            <img src={image} alt=""/>
        </div>
    );
}

export default HomePage
