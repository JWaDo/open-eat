import React from 'react';
import { Redirect } from 'react-router-dom';
// import Pages
import Notfound from '../pages/Notfound';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

// Routes
export default [
    /**
     * 
     */
    {
        name: 'HomePage',
        path: '/',
        exact: true,
        private: false,
        component: HomePage,
    },
    /**
     * 
     */
    {
        name: 'LoginPage',
        path: '/login',
        exact: true,
        private: false,
        component: LoginPage,
    },
    /**
     * 
     */
    {
        name: 'DashboardPage',
        path: '/dashboard',
        exact: true,
        private: true,
        component: DashboardPage,
    },
    /**
     * Not found page
     */
    {
        name: 'NotFoundPage',
        path: '/404',
        exact: true,
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