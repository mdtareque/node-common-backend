const express = require('express');
const apiRouter = require('./server/routes');
const app = express();
const morgan = require('morgan'); // request logger
const bodyParser = require('body-parser');


app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
        // don't go to routes, return to client
        return res.status(200).json({});
    }
    next();
});


app.use('/things', apiRouter);

const port = process.env.PORT || '3000';
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

// error handler
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

// another middleware:  https://www.youtube.com/watch?v=UVAMha41dwo
// handles errors from anywhere
// e.g. database call failed
app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500);
    res.json({
        error: {message: error.message}
    });
});

