// theme.js

export default {
    palette: {
        primary: {
            main: "#dba100",
            contrastText: "#E9EFFF",
        }, 
        secondary: {
            main: "#E9EFFF",
            contrastText: "#dba100",
        },
        success: {
            main: '#32CD32',
            contrastText: '#fff',
        },
        danger: {
            main: '#B22222',
            contrastText: '#fff',
        }
    },
    overrides: {
        MuiCardMedia: {
            root: {
                backgroundSize: 'contain'
            }
        }
    }
};