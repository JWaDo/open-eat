// theme.js

export default {
    palette: {
        primary: {
            main: "#3C5CA5",
            contrastText: "#E9EFFF",
        }, 
        secondary: {
            main: "#E9EFFF",
            contrastText: "#3C5CA5",
        },
    },
    overrides: {
        MuiCardMedia: {
            root: {
                backgroundSize: 'contain'
            }
        }
    }
};