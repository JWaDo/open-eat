import React, { useEffect, useState } from 'react'
import AppMenu from '../components/navigation/AppMenu';
import listings from '../firebase/collections/listings';
import { CircularProgress, Box, AppBar, Toolbar, IconButton, makeStyles, Container, Typography, Paper, TextField, Grid, Button, Collapse, ListItem, ListItemAvatar, ListItemText, List, Avatar } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon, StarBorder as StarBorderIcon } from '@material-ui/icons';
import { navigate } from '../routes';
import { Rating } from '@material-ui/lab';
import Listings from '../components/Listings/Listings.data';

const useStyles = makeStyles(theme => ({
    container: {
        height: 300,
        backgroundSize: 'cover',
        position: 'relative',
    }
}));

function ListingPage({ match, currentUser }) {
    
    const { listingId } = match.params;
    const [listing, setListing] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({});
    const classes = useStyles();

    const onReviewsChange = changes => {
        let _reviews = reviews;

        changes.forEach(change => {
            if (change.type === 'added') {
                _reviews.push({...change.doc.data(), id: change.doc.ref.id });
            } else {
                _reviews = _reviews.filter((l, index) =>  index !== change.oldIndex);
            }
            
        });
        setReviews([..._reviews]);
    }

    const postReview = (listingId) => {
        Listings.addReview(listingId, {
            ...newReview,
            userId: currentUser.uid,
            userImage: currentUser.photoURL,
            username: currentUser.displayName,
            createdAt: new Date(),
        }).then(data => {
            console.log('data', data);
        }).catch(err => console.log('err', err));
        setNewReview({});
    }
    
    useEffect(() => {
        listings.doc(listingId).get().then(l => {
            setListing({...l.data(), id: l.ref.id});
        });
    }, []);
    
    useEffect(() => {
        Listings.getReviews(listingId, onReviewsChange);
    }, []);
    
    const getVote = () => reviews.find(review => review.userId === currentUser.uid);

    const isFormValid = () => newReview.rating && newReview.rating > 0;

    const rating = getVote() && getVote().rating;

    if (listing === null)  return (<Box p={3} display='flex' justifyContent='center' alignItems='center'><CircularProgress color='primary' /></Box>);

    if (listing === undefined) {
        navigate.push('HomePage');
        return null;
    };

    return (
        <React.Fragment>
            <Box className={classes.container} style={{backgroundImage: `url(${listing.img})`}}>
                <AppBar color='primary'>
                    <Toolbar color='primary'>
                        <IconButton color='secondary' onClick={() => navigate.goBack()}>
                            <ArrowBackIcon />
                        </IconButton>
                        {listing.businessName}
                    </Toolbar>
                </AppBar>
            </Box>
            <Container maxWidth='md'>
                <Box my={2}>
                    <Typography variant='h2' component='p'>
                        {listing.title}
                    </Typography>
                    <Typography variant='subtitle1' component='p'>
                        {listing.description}
                    </Typography>
                </Box>
                <Grid container>
                    <Grid xs={12} sm={6}>
                        <Paper>
                            <Box p={2}>
                                <Typography variant='h6' component='p'>
                                    {(!!getVote()) ? "Thanks for rating":"Let us know what you think"}
                                </Typography>

                                {(!!getVote() && console.log('rating', rating))}

                                <Box>
                                    <Rating
                                        precision={1}
                                        value={(getVote() && getVote().rating) || newReview.rating || 0}
                                        readOnly={!!getVote()}
                                        onChange={(e, rate) => setNewReview({...newReview, rating: rate })}
                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                    />
                                </Box>

                                <Collapse in={isFormValid()}>
                                    <Box>
                                        <TextField fullWidth multiline rows={1} rowsMax={4} label='Comment here' name='review' onChange={e => setNewReview({...newReview, review: e.target.value })}/>
                                    </Box>

                                    <Box mt={2} display='flex' justifyContent='flex-end'>
                                        <Button disabled={!isFormValid()} color='primary' variant='contained' onClick={() => postReview(listing.id)}>
                                            publish
                                        </Button>
                                    </Box>
                                </Collapse>
                                    
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={6}>

                        <List>
                            {
                                reviews.map(review => (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src={review.userImage} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Rating
                                                defaultValue={review.rating}
                                                precision={1}
                                                readOnly
                                                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                            />}
                                            secondary={review.review}
                                        />

                                    </ListItem>
                                ))
                            }
                        </List>
                        
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default ListingPage
