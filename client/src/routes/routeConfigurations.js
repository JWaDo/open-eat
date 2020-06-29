import React from 'react';
import { Redirect } from 'react-router-dom';
// import Pages
import Notfound from '../pages/Notfound';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import SiteMarchand from '../pages/SiteMarchand';
import AuthPage from '../pages/AuthPage';
import EmailValidationPage from '../pages/EmailValidationPage';
import CheckoutPage from '../pages/CheckoutPage';

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
        name: 'AuthPage',
        path: '/auth/:view',
        exact: true,
        private: false,
        component: AuthPage,
    },
    {
        name: 'EmailValidationPage',
        path: '/account/confirm/:token',
        exact: true,
        private: false,
        component: EmailValidationPage,
    },
    {
        name: 'DashboardPage',
        path: '/dashboard',
        exact: true,
        private: true,
        component: DashboardPage,
    },
    {
        name: 'CheckoutPage',
        path: '/checkout/:token',
        exact: true,
        private: false,                     // Note that checkout page is public
        component: CheckoutPage,
    },

    /**
     **** SITE MARCHAND ****
     */
    {
        name: 'SiteMarchandPage',
        path: '/site-marchand',
        exact: true,
        private: false,
        component: SiteMarchand,
    },

     


    /**
     * Not found page
     */
    {
        name: 'NotFoundPage',
        path: '/404',
        exact: true,
        private: false,
        component: Notfound,
    },
    /**
     * Default route redirect to a notfound page
     */
    {
        name: 'Default',
        render: () => <Redirect to='/404' />,
        private: false,
        exact: true,
    }
];