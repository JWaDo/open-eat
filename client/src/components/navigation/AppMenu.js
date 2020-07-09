import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSnackbar } from 'notistack';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { fireAuth, fireStorage } from '../../firebase/config';
import { navigate } from '../../routes';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logButton: {
    margin: theme.spacing(2),
  },
  profile: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  }
}));

export default function AppMenu() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isLoggedUser, setIsLoggedUser] = useState({});
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    fireAuth.onAuthStateChanged((user) => {
        if (user) {
            const { uid } = user.toJSON();
            setCurrentUser(user.toJSON());
            setIsLoggedUser(!!user);

            fireStorage.ref("profilePicture")
              .child(`pp_${uid}.jpg`)
              .getDownloadURL()
              .then(img => {
                setCurrentAvatar(img)
            });

            setIsLoggedUser(!!user);
        } else {
            setIsLoggedUser(user);
        }
    });
}, [isLoggedUser]);

  const handleProfileMenuOpen = (event) => {
    navigate.push("ProfilePage")
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      { isLoggedUser &&
        <MenuItem 
          onClick={handleProfileMenuOpen}
          className={classes.profile}
        >
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            { currentAvatar &&
              <>
                <Avatar 
                    alt="Current User"
                    src={currentAvatar}
                    className={classes.small}
                />
              </>
            }
          </IconButton>
        </MenuItem>
      }

      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      { !isLoggedUser ?
        <MenuItem onClick={() => {
          navigate.push("LoginPage")
        }}>
          <IconButton
            aria-label="login application"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <VpnKeyIcon />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      :
        <MenuItem onClick={() => {
          fireAuth.signOut();
        }}>
          <IconButton
            aria-label="login application"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <ExitToAppIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      }
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="app logo"
          >
            <FastfoodIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Open Eat
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            { isLoggedUser && 
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                { currentAvatar  &&
              <>
                <Avatar 
                    alt="Current User"
                    src={currentAvatar}
                    className={classes.small}
                />
              </>
            }
              </IconButton>
            }
            { isLoggedUser ?
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.logButton}
                    onClick={() => {
                        fireAuth.signOut().then(function() {
                            enqueueSnackbar("Successfully logged out", { variant: "success" });
                        }).catch(function(error) {
                            enqueueSnackbar("Something wrong happened", { variant: "error" });
                        })
                    }}
                >
                    Log out
                </Button>
                :
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.logButton}
                    onClick={() => navigate.push("LoginPage")}
                >
                    Login
                </Button>
            }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}