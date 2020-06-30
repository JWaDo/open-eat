import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { navigate } from '../../routes';
import OrderDetailsPage from '../../pages/OrderDetailsPage';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  eye: {
      color: theme.palette.primary.main
  },
  container: {
      width: "80%",
      margin: "3rem auto"
  },
  containerPaper: {
    width: "80%",
    margin: "3rem auto"
  },
  title: {
      textAlign: "center",
      padding: "2rem",
      textTransform: "uppercase",
      color: theme.palette.primary.main,
  }

}));

const rows = [
    { 
        name: "Charles",
        surname: "Van Hamme",
        email: "charles.vanhamme@gmail.com",
        billingAddress: "4 avenue des lauriers 92700 Colombes",
        deliveryAddress: "4 avenue des lauriers 92700 Colombes",
        total: 75,
    },
    { 
        name: "Charles",
        surname: "Van Hamme",
        email: "charles.vanhamme@gmail.com",
        billingAddress: "4 avenue des lauriers 92700 Colombes",
        deliveryAddress: "4 avenue des lauriers 92700 Colombes",
        total: 75,
    },
    { 
        name: "Charles",
        surname: "Van Hamme",
        email: "charles.vanhamme@gmail.com",
        billingAddress: "4 avenue des lauriers 92700 Colombes",
        deliveryAddress: "4 avenue des lauriers 92700 Colombes",
        total: 75,
    },
];

function Orders() {

    const classes = useStyles();

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Typography
                    className={classes.title}
                    variant="h3"
            >
                Orders listing
            </Typography>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Surname</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center">See</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.surname}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.total}</TableCell>
                    <TableCell align="center">
                        <VisibilityIcon 
                            className={classes.eye}
                            onClick={() => navigate.push("OrdersDetailsPage", {id: 1}) }
                        />
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Orders
