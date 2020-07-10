import listings from '../../firebase/collections/listings';

class Listings {};

Listings.addListing = function(data) {
  /*
    TODO: Implement adding a document
  */
};
 
Listings.getListings = function(onChange) {
    const query = listings.orderBy('avgRating', 'desc');
    
    query.onSnapshot(function(snapshot) {
        
        if (!snapshot.size) return ; 

        onChange(snapshot.docChanges())
      });

};
 
 
Listings.getListing = function(id) {};

Listings.addFavorite = function(idListing, idUser, isFavorite) {
  return listings.doc(idListing).collection("favorites").get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log((doc.data().fav === idUser));
        doc.ref.update({
          'fav': (doc.data().fav === idUser) ? "" : idUser,
        })
      })
      return !isFavorite;
    })
};

Listings.isFavorite = function(idListing, idUser) {
  return listings.doc(idListing).collection("favorites").get()
    .then(snapshot => {
      let isFav = false;
      snapshot.docs.forEach(doc => {
        const currentFav = String(doc.data().fav);
        if(currentFav === idUser) isFav = true;
      })
      return isFav;
    })
}

Listings.getFavorite = function(idListing, idUser) {
  const favorites = [];
  return listings.doc(idListing).collection("favorites").get()
    .then(snapshot => snapshot.docs.forEach(doc => favorites.push(doc.data())));
}

Listings.getMark = function(listingId) {
  let avg = null;

  return listings.doc(listingId).collection("reviews").get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
          const review = doc.data();
          if(review.rating > 0) avg += review.rating
      })

    return avg / snapshot.docs.length;
  })
}


 
Listings.addReview = function(listingId, review) {
  /*
    TODO: Retrieve add a rating to a restaurant
  */
};
//
Listings.getDocumentsInQuery = function(query, renderer) {
    query.onSnapshot()
  };

export default Listings;