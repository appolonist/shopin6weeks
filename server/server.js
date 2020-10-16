require('rootpath');
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const history = require('connect-history-api-fallback');
const isAuth = require('./helpers/isAuth');
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());
// use Morgan for logging purposes
app.use(morgan('combined'))
// api routes
app.use('/users', require('./users/user.controller'));
app.use('/products', require('./products/product.controller'));

//HTML5 History API
app.use(history());

// global error handler
app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
