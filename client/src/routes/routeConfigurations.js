import React from 'react';
import { Redirect } from 'react-router-dom';
// import Pages
import Notfound from '../pages/Notfound';
import HomePage from '../pages/HomePage';
import PrivatePage from '../pages/PrivatePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import ListingPage from '../pages/ListingPage';

// Routes
export default [
    {
        name: 'HomePage',
        path: '/',
        exact: true,
        private: false,
        component: HomePage,
    },
    {
        name: 'ListingPage',
        path: '/listings/:listingId',
        exact: true,
        private: true,
        component: ListingPage,
    },
    {
        name: 'ProfilePage',
        path: '/profile',
        exact: true,
        private: true,
        component: ProfilePage,
    },
    {
        name: 'PrivatePage',
        path: '/private-page',
        exact: true,
        private: true,
        component: PrivatePage,
    },
    {
        name: 'LoginPage',
        path: '/login',
        exact: true,
        private: false,
        component: LoginPage,
    },
    {
        name: 'RegisterPage',
        path: '/register',
        exact: true,
        private: false,
        component: RegisterPage,
    },
    //
    {
        name: 'NotFoundPage',
        path: '/404',
        exact: true,
        private: false,
        component: Notfound,
    },
    {
        name: 'Default',
        render: () => <Redirect to='/404' />,
        private: false,
        exact: true,
    }
];