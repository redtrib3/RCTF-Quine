module.exports = {
    SECRET_KEY: process.env.SECRET_KEY,
    PORT: process.env.PORT || 3000,
    HOSTNAME: process.env.HOSTNAME || '127.0.0.1',
    CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS.split(',') || ['http://127.0.0.1:3000/'],
    //CORS_ALLOWED_ORIGINS: [ 'http://127.0.0.1:3000/', 'http://127.0.0.1:8080' ],
};
