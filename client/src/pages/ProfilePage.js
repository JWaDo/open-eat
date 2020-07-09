import React, { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import { Box, Paper, TextField, Grid, Button, Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { fireStorage, fireAuth } from '../firebase/config';

const useStyles = makeStyles(theme => ({
    box: {
        height: "100vh",
        width: "100vw",
    },
    form: {
        width: "100%",
        textAlign: "center",
    },
    inputs: {
        margin: theme.spacing(3),
        width: '50%',
    },
    button: {
        margin: theme.spacing(3),
        width: '50%',
    },
    notRegister: {
        textAlign: 'center',
        padding: '1rem',
    },
    title: {
        textAlign: "center",
        textTransform: "uppercase",
        padding: theme.spacing(3),
    },
    small: {
        width: '150px',
        height: '150px',
        borderRadiu: '30px'
    },
    unvisible: {
        display: "none",
    }
}));

function ProfilePage({currentUser}) {

    const [avatar, setAvatar] = useState();
    const [currentAvatar, setCurrentAvatar] = useState();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { uid } = currentUser;

    // Get image
    fireStorage.ref("profilePicture")
    .child(`pp_${uid}.jpg`)
    .getDownloadURL()
    .then(img => {
        fireAuth.currentUser.updateProfile({
            photoURL: img
        })
        setCurrentAvatar(img)
    });

    // Set image
    const uploadImage = (e, file) => {
        e.preventDefault();
    
        if(!file) {
            enqueueSnackbar("No file provided 😟", { variant: "error" });
        }
        

        const metadata = {
            contentType: 'image/jpeg',
        };

        const storageRef = fireStorage.ref();
        storageRef.child(`profilePicture/pp_${uid}.jpg`)
            .put(file, metadata)
            .then(data => {
                setCurrentAvatar(data)  
            })
            .catch(error => {
                console.log("Error");
                enqueueSnackbar(error.message, { variant: "error" });
            })
    }           

    return (
        <Box 
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.box}
        >
            <Paper elevation={3}>
                
                <Grid 
                    container
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    
                >
                    <Grid item xs={12}>
                        <Typography
                            variant="h3"
                            component="h1"
                            color="primary"
                            className={classes.title}
                        >
                            Profile
                        </Typography>
                    </Grid> 
                    <form 
                        className={classes.form}
                        onSubmit={(e) => uploadImage(e, avatar)}
                    >
                        <Grid 
                            item
                            container
                            justify="center"
                            alignItems="center"
                            xs={12}
                        >

                            <Avatar 
                                alt="Current User"
                                src={currentAvatar}
                                className={classes.small}
                                onClick={() => {
                                    document.getElementById('avatar').click();
                                }}

                            /> 
                            
                            <Input 
                                name="avatar"
                                type="file"
                                label="Avatar" 
                                id="avatar"
                                onChange={(e) => {
                                    setAvatar(e.target.files[0])
                                }}
                                className={classes.unvisible}
                            />
                        </Grid> 
                       
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!avatar}
                                className={classes.button}
                            >
                                Save
                            </Button>
                        </Grid>   
                    </form>
                </Grid>

            </Paper>
        </Box>
    )
}

export default ProfilePage
