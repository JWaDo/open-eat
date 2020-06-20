const DEV_MODE = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'dev' : 'prod';


export const _confs = {
    // Configurations for development
    'dev': {
        URL_API: 'http://localhost/api',
    },
    // Configurations for production
    'prod': {
        URL_API: 'http://production.fr/api',
    }
};

export const confs = _confs[DEV_MODE];