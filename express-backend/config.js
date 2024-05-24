module.exports = {
    SECRET_KEY: process.env.SECRET_KEY,
    PORT: process.env.PORT || 3000,
    HOSTNAME: process.env.HOSTNAME || '127.0.0.1',
    CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOW_ORIGINS.split(',') || ['http://127.0.0.1:3000/'],
};