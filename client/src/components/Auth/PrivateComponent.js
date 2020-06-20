import React from 'react'
import useAuth from './useAuth'

function PrivateComponent({ type, children }) {

    const [{ user, token }] = useAuth();

    // Reject if user hasnt a token
    if (!token) return false;
    
    if (type && !type.split('|').includes(user.type)) return null
    
    return children;
}

export default PrivateComponent
