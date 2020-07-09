import React, { useState } from 'react';
import { fireAuth } from '../../firebase/config';
import { navigate } from '../../routes';
import { useSnackbar } from 'notistack';
import { Link, Box, Paper, TextField, Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
            .then(_user => {
                enqueueSnackbar("Welcome", { variant: "success" });
            })
            .catch((error) => {
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
                   <Grid item xs={12}>
                        <Typography
                            variant="h3"
                            component="h1"
                            color="primary"
                            className={classes.title}
                        >
                            Log in your account
                        </Typography>
                    </Grid> 
                    <form className={classes.form}>   
                        <Grid item xs={12}>
                            <TextField 
                                name="email"
                                label="Email" 
                                onChange={handleChange}
                                className={classes.inputs}
                            />
                        </Grid>   
                        <Grid item xs={12}>
                            <TextField 
                                name="password"
                                label="Password" 
                                type="password"
                                onChange={handleChange}
                                className={classes.inputs}
                            />
                        </Grid>   
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                className={classes.button}
                            >
                                Login
                            </Button>
                        </Grid>   
                    </form>

                    <Grid item xs={12}>
                        <Link
                            component="button"
                            variant="body"
                            className={classes.notRegister}
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