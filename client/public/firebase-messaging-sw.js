importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
// // Notifications handle
firebase.initializeApp({
    messagingSenderId: '736073550328',
});

firebase.messaging().setBackgroundMessageHandler((payload) => {
    const title = 'Hello world!';
    const notificationOptions = {
    body: 'Ping?',
    icon: '/512.png'
    };

    return self.registration.showNotification('Title',
    notificationOptions);
});