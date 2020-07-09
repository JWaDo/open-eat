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
 
 
Listings.getListing = function(id) {
    
};
 
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