import React from 'react';
import { Redirect } from 'react-router-dom';
// import Pages
import Notfound from '../pages/Notfound';
import HomePage from '../pages/HomePage';

// Routes
export default [
    /**
     * Not found page
     */
    {
        name: 'HomePage',
        path: '/',
        exact: true,
        private: false,
        component: HomePage,
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