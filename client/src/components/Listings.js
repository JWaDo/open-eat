import React, { useEffect } from 'react';

function Listings() {

    useEffect(() => {
        // firestore.collection("users").add({
        //     first: "Ada",
        //     last: "Lovelace",
        //     born: 1815
        // })
        // .then(function(docRef) {
        //     console.log("Document written with ID: ", docRef.id);
        // })
        // .catch(function(error) {
        //     console.error("Error adding document: ", error);
        // });


        // firestore.collection("users").get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         console.log(doc.data());
        //     });
        // });
    }, [])
    return (
        <div>
            
        </div>
    )
}

export default Listings;
