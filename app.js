const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

// Handlebars
hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('toUpperCase', (text) => {
    return text.toUpperCase();
});
app.set('viewEngine', 'hbs');

// Static files
app.use(express.static(`${__dirname}/public`)); // static files directory

// Middleware: middlewares are called on the same order I'm defining them
app.use((req, res, next) => { // if I dont call next, the app is going to stop
    var now = new Date().toString();
    var log = `${now} doing a ${req.method} on ${req.url}\n`;
    fs.appendFile('server.log', log, (err) => {
        if(err) {
            console.log('Unable to append to log');
            res.render('error.hbs');
        }
    });
    console.log(log);
    next();
});

// Routes
app.get('/', (req, res) => { // HTTP requests handler
    res.send('Visit /text/, /html/ or /json/'); // send a string to the client that made the request
});

app.get('/text/', (req, res) => { // HTTP requests handler
    res.send('Hello Text!'); // send a string to the client that made the request
});

app.get('/html/', (req, res) => {
    res.send('<h1>Hello HTML!</h1>');
});

app.get('/json/', (req, res) => {
    res.send({
        name: 'Josue',
        lastName: 'Cubero',
        pets: [
            'Naru',
            'Lisa',
            'Mia',
            'Dexter',
            'Gipsy',
            'Brandi',
            'Porky',
            'Tuga',
            'Squirtle'
        ]
    });
});

app.get('/about/', (req, res) => { // hbs template
    res.render('about.hbs', { // inject parameters
        name: 'Josue'
    });
});

// Listen
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});