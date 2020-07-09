import React, { useState } from 'react';
import { fireAuth } from '../../firebase/config';
import { navigate } from '../../routes';
import { useSnackbar } from 'notistack';
import { Link, Box, Paper, TextField, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    box: {
        height: "100vh",
        width: "100vw",
    }
}))

function LoginForm() {
    const [user, setUser] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user.password);
        fireAuth.signInWithEmailAndPassword(user.email, user.password)
            .then(user => {
                console.log("connected");
                console.log(user);
                enqueueSnackbar("Welcome", { variant: "success" });
            })
            .catch(function(error) {
                const errorMessage = error.message;
                enqueueSnackbar(errorMessage, { variant: "error" });
        })
    }

    return (
        <Box 
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.box}
        >
            <Paper elevation={3} >
                
                <Grid 
                    container
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    
                >
                    <form>
                        <Grid item xs={12}>
                            <TextField 
                                name="email"
                                label="Email" 
                                onChange={handleChange}
                            />
                        </Grid>   
                        <Grid item xs={12}>
                            <TextField 
                                name="password"
                                label="Password" 
                                type="password"
                                onChange={handleChange}
                            />
                        </Grid>   
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Login
                            </Button>
                        </Grid>   
                    </form>

                    <Grid item xs={12}>
                        <Link
                            component="button"
                            variant="body"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate.push("RegisterPage");
                            }}
                            >
                            Not registered yet ? Come here
                        </Link>
                    </Grid>
                </Grid>

            </Paper>
        </Box>
    )
}

export default LoginForm;
