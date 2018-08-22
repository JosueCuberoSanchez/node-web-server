const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('viewEngine', 'hbs');
app.use(express.static(__dirname + '/public')); // static files directory

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
        name: 'Josue',
        year: new Date().getFullYear()
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});