import React, { useState, useEffect } from 'react';
import useAuth from '../components/BO/Auth/useAuth';
import ChartsTrader from '../components/SiteMarchand/ChartsTrader';
import Header from '../components/BO/Header';

function ChartsTraderPage() {

    const [selectedItem, setSelectedItem] = useState(2);
    const [transactions,setTransactions] = useState([]);

    const [{ user }, { logout }] = useAuth();

    useEffect(() => {
        const secret = localStorage.getItem('secret');
        const token = localStorage.getItem('token');
        const credentials = `${token}:${secret}`;

        fetch('http://localhost:8080/me/transactions/', {
            method: 'GET',
            headers: {
                Authorization: `Basic ${btoa(credentials)}`
            }
        })
        .then(data => data.json())
        .then(formatedData => setTransactions(formatedData));

    }, [])

    return (
        <div>
            <Header 
                username={`${user.firstname} ${user.lastname}`}
                credentials={user.credentials}
                logout={logout}
            />
            <ChartsTrader />
        </div>
    )
}

export default ChartsTraderPage
