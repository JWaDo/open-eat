import React, { useEffect, useState } from 'react';
import Listings from './Listings.data';
import { Grid, Container, makeStyles, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Box, CircularProgress, IconButton } from '@material-ui/core';
import { FavoriteBorder as FavoriteBorderIcon, Favorite, StarBorder as StarBorderIcon } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import { navigate } from '../../routes';

const useListinCardStyles = makeStyles(theme => ({

    card: {
        marginTop: theme.spacing(2),
    },
    _card: {
        height: '100%',
    },
    media: {
        height: '200px',
        width: '100%',
        backgroundSize: 'cover',
    }
    
}));

function ListingsList({currentUser, isFavFiltering, searchWord}) {

    const [listings, setListings] = useState([]);
    const [fullListings, setFullListings] = useState([]);
    const [fetching, isFetching] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    const onChange = changes => {
        let _listings = listings;
        isFetching(true);
        changes.forEach(change => {
            if (change.type === 'added') {
                _listings.push({...change.doc.data(), id: change.doc.ref.id });
            } else {
                _listings = _listings.filter((l, index) =>  index !== change.oldIndex);
            }
            isFetching(false);
        });
        setListings([..._listings]);
        setFullListings([..._listings]);
    }

    const filterListing = (searchWord) => listings.filter(l => l.title.match(searchWord));
    
    useEffect(() => {
        Listings.getListings(onChange);
    }, []);

    useEffect(() => {
        searchWord ?
            setListings(filterListing(searchWord))
        :
            setListings(fullListings)
    }, [searchWord]);

    if (fetching) return (<Box p={3} display='flex' justifyContent='center' alignItems='center'><CircularProgress color='primary' /></Box>)

    return (
        <div>
            <Container maxWidth='xl'>
                <Grid container spacing={2}>
                    { listings.map((listing, key) => 
                        <Listing 
                            key={key}
                            listing={listing}
                            currentUser={currentUser}
                            isFavFiltering={isFavFiltering}
                        />) 
                    }
                </Grid>
            </Container>
        </div>
    );
}

const Listing = ({ listing, currentUser, isFavFiltering }) => {

    const classes = useListinCardStyles();
    const [mark, setMark] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const userId = currentUser.uid;
    const { enqueueSnackbar } = useSnackbar();
    
    useEffect(() => {
        Listings.getMark(listing.id)
            .then(_mark => setMark(_mark));
        Listings.isFavorite(listing.id, userId)
            .then(_fav => {
                setIsFavorite(_fav);
            });
    }, [mark]);

    if(isFavFiltering && !isFavorite) {
        return null;   
    }
    
    return (
        <React.Fragment>
            <Grid className={classes.card} item xs={12} sm={3}>
                <Card className={classes._card}>
                    <CardActionArea onClick={() => navigate.push('ListingPage', { listingId: listing.id })}>
                        <CardMedia
                            className={classes.media}
                            image={listing.img}
                            title={listing.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {listing.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {listing.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                        <Box width='100%' px={2}>
                            <Rating
                                name="customized-empty"
                                defaultValue={listing.avgRating}
                                precision={0.1}
                                value={mark}
                                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                readOnly
                            />
                        </Box>
                    <CardActions>
                        <IconButton
                            size='small' 
                            color='primary'
                            onClick={() => {
                                setIsFavorite(!isFavorite);
                                Listings.addFavorite(listing.id, userId, isFavorite)
                                    .then(data => {
                                        const actions = isFavorite ? "removed from" : "added in";
                                        enqueueSnackbar(`${listing.title} ${actions} favorites`);
                                    })
                            }}
                        >
                            { isFavorite ? <Favorite /> : <FavoriteBorderIcon /> }
                        </IconButton>
                        <Button size="small" color="primary">
                            Order now
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </React.Fragment>
    );
}

export default ListingsList;
