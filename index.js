const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const BarcodeController = require('./controllers/barcode.controller')
const mongoose = require('mongoose');
//const mongoose = require('mongoose');
const { MONGO_URI, MONGO_DATABASE } = require('./constants');
const route = require('./routes');
const authRouter = require("./routes/auth.route")
app.use(express.json());
app.use(express.static('public'))
app.use(cors());
app.use(morgan('dev'));
const server = require('http').createServer(app);

const PORT = 3000;

//route(app);
//app.use('/login', authRouter);


route(app);



app.get('/', (req, res) => {
    res.json({
        message: 'Server is running successfully',
    })
})
//app.post('/',BarcodeController.BarcodeGenator)
// handling errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error!',
    });
});


//mongoose.set('debug', true);
//mongoose.set('debug', { color: true });

mongoose.connect(`${MONGO_URI}/${MONGO_DATABASE}`, {
    maxPoolSize: 50
})
    .then(result => {
        console.log('Connect to mongodb successfully!');
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    }).catch(err => {
        console.log(`${MONGO_URI}/${MONGO_DATABASE}`);
        console.log('Fail to connect to database');
    });
/**
 * const express = require('express')
const app = express()
const port = 3000
const route = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
app.use(express.json());
app.use(express.static('public'))
app.use(cors());
app.use(morgan('dev'));
const server = require('http').createServer(app);

route(app);

app.get('/', (req, res) => {
    res.json({
        message: 'Server is running successfully',
    })
})
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error!',
    });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 */
