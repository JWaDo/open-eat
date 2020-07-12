import React, { useEffect, useState } from 'react'
import firebase from '../firebase/config';

function Notifications() {

    const [messagingToken, setMessagingToken] = useState(null);
    const [denied, hasDenied] = useState(false);

    const requestPermission = async () => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            getToken();
        } else {
            hasDenied(true);
        }
    }

    const getToken = async () => {
        const token = await firebase.messaging().getToken();
        if (token) {
            setMessagingToken(token);
        }
      }
    
    useEffect(() => {

        requestPermission();
        // Listen for notification
        firebase.messaging().onMessage((payload) => {
            //
            console.log('payload', payload);
        });
        
    }, [ denied ]);
    
    return null;
}

export default Notifications
