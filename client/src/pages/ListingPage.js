import React, { useEffect, useState } from 'react'
import firebase from '../firebase/config';
import listings from '../firebase/collections/listings';
import { CircularProgress, Box, AppBar, Toolbar, IconButton, makeStyles, Container, Typography, Paper, TextField, Grid, Button, Collapse, ListItem, ListItemAvatar, ListItemText, List, Avatar, Dialog } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon, StarBorder as StarBorderIcon, Notifications as NotificationsIcon } from '@material-ui/icons';
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
    const [modalOpen, setModalOpen] = useState(false);
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

    const requestPermission = async () => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            getToken();
        }
    }

    const getToken = async () => {
        const token = await firebase.messaging().getToken();
        
        firebase.messaging().onMessage((payload) => {
            //
            console.log('payload', payload);
        });

        if (token) {
            console.log('token', token);
            setTimeout(() => {
                fetch('https://fcm.googleapis.com/fcm/send', {
                    method: 'POST',
                    headers: {
                        Authorization: 'key=AAAAq2FnCfg:APA91bGmw2NWToyblOY0ZzU5wIzGS6fKNggrrjWMRx7D-DA8D6EjifEI6nuWse98zhda8j9GYfTMtkoYj8c6LBzHziQi1-yfCkeegW7-l_B3nBFQha2Wn0b_RvN5wlfwA6hu_dQTjsn2',
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        notification: {
                            title: 'Your order is beeing prepared!',
                            body: 'You are about taste the better...',
                        },
                        to: token,
                    }),
                });
            }, 10 * 1000); // 10 seconds after!
        }
    }

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
                <Box my={2} display='flex' justifyContent='space-between'>
                    <Box>
                        <Typography variant='h2' component='p'>
                            {listing.title}
                        </Typography>
                        <Typography variant='subtitle1' component='p'>
                            {listing.description}
                        </Typography>
                    </Box>
                    <Box>
                        <Button variant='outlined' color='primary' onClick={() => setModalOpen(true)}>
                            Order now
                        </Button>
                    </Box>
                    <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
                        <Box p={3}>
                            <Box my={2}>
                                <Typography>
                                    Active the notification and get notified when your order is ready!
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='flex-end'>
                                <Button startIcon={<NotificationsIcon />} color='primary' onClick={() => {
                                    requestPermission();
                                    setModalOpen(false);
                                }}>
                                    Active notification
                                </Button>
                            </Box>
                        </Box>
                    </Dialog>
                </Box>
                <Grid container>
                    <Grid xs={12} sm={6}>
                        <Paper>
                            <Box p={2}>
                                <Typography variant='h6' component='p'>
                                    {(!!getVote()) ? "Thanks for rating":"Let us know what you think"}
                                </Typography>

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
