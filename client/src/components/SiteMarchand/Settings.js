import React, { useState, useEffect } from 'react'
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    container: {
        width: "80%",
        margin: "3rem auto"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%"
    },
    input: {
        margin: theme.spacing(3),
        width: '100%',
    },
    title: {
        margin: theme.spacing(3),
        textTransform: "uppercase",
        color: theme.palette.primary.main
    },
}));

function Settings() {

    const classes = useStyles();

    const [token, setToken] = useState("");
    const [secret, setSecret] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('token', token)
        localStorage.setItem('secret', secret)
    }

    useEffect(() => {
        setToken(!!localStorage.getItem('token') ? localStorage.getItem('token') : "");
        setSecret(!!localStorage.getItem('token') ? localStorage.getItem('secret') : "");
    }, [])

    return (
        <Paper className={classes.container}>
            <Grid 
                container 
                spacing={1}
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.container}
            >
                <Typography
                    className={classes.title}
                    variant="h3"
                >
                    your credentials
                </Typography>
                <form 
                    noValidate
                    autoComplete="off"
                    className={classes.form}
                    onSubmit={handleSubmit}
                >
                    <TextField 
                        id="standard-basic"
                        label="Token"
                        color="secondary"
                        className={classes.input}
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <TextField 
                        id="standard-basic"
                        label="Secret"
                        color="secondary"
                        className={classes.input}
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                    />
                    <Button type="submit" color="primary" variant="contained" size="large" className={classes.input}>Confirm</Button>
                </form> 
            </Grid>
        </Paper>
    )
}

export default Settings
