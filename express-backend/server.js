const express = require('express');
const cors = require('cors');
const path  = require('path');

const apiRoutes = require('./routes/apiRoutes');

const app = express();
app.disable('x-powered-by');

const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const corsAllowList = '*';
//const corsAllowList = process.env.ALLOWED_ORIGINS.split(',');
const corsArgs =  { origin: corsAllowList };

app.use(cors(corsArgs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`APP IS LISTENING ON - http://${HOSTNAME}:${PORT}/`);
});