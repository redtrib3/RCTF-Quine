const express = require('express');
const cors = require('cors');
const path  = require('path');
const cookieParser = require('cookie-parser');

const apiRoutes = require('./routes/apiRoutes');
const setToken = require('./middleware/setToken');
const config  = require('./config');


const app = express();
app.disable('x-powered-by');


const HOSTNAME = config.HOSTNAME
const PORT = config.PORT;
const corsAllowList = config.CORS_ALLOWED_ORIGINS;
const corsArgs =  { origin: corsAllowList, credentials: true };


app.use(cookieParser());
app.use(cors(corsArgs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

// health check
app.get('/health', (req, res) => {
    const healthStatus = {
        status: 'UP',
        timestamp: new Date().toISOString().split('T')[1],
        uptime: `${(process.uptime() / 3600).toFixed(2)} hrs`,
    };
    res.status(200).json(healthStatus);
});

app.get('*', setToken ,(req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`APP IS LISTENING ON - http://${HOSTNAME}:${PORT}/`);
});
