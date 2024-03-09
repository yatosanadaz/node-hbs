const express = require('express');
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

// Import Path
const serverErrMiddleware = require('./issue/serverErr');
const mainRoutes = require('./router/main');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Setup view engine
app.engine('.hbs', exphbs.engine({ 
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts/'),
    partialsDir: path.join(__dirname, 'views/partials/')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// USE MODULE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// SESSION SETUP
app.use(session({
    secret: 'IAMKEY',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/', mainRoutes);

// Middleware for handling server errors
app.use(serverErrMiddleware);

// Setup Start Server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})