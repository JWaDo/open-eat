import React, { useEffect } from 'react';
import Listings from '../components/Listings';
import Users from '../firebase/collections/Users';


function HomePage() {
    
    useEffect(() => {
        // {console.log(Users.doc("tQ7I5EjtKGGd9Mluhvrf").get().then(data => console.log(data.data())))}
    }, []);

    return (
        <div>
            HomePage
            {/* <Auth /> */}
            <Listings />
        </div>
    );
}

export default HomePage
