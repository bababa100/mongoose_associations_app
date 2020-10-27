//Grabs express from node modules
const express = require('express');

//App that creates a new instance of express
const app = express();
//Grabs mongoose from node modules
const mongoose = require('mongoose');
//For using a form with anything other then a post request
const methodOverride = require('method-override');
//Gives ability to add partials (nav,head, body).
const expressLayouts = require('express-ejs-layouts');
const PORT = 3000;

const mongoURI = 'mongodb://localhost:27017/mongoRelationships';
//Parser is used to make server cleaner.  Not needed
mongoose.connect(
    mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('the connection with mongod is established');
    }
);
//near the top, around other app.use() calls.  Converts Json to an object.
app.use(express.urlencoded({
    extended: false
}));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static('public')); //tells express to find the CSS static files in the 'public' directory 
app.use(methodOverride('_method')); // tells express to override the method using query string
// DATA models are singular
// ABOVE our app.get()
app.use('/user', require('./controllers/usersController'));

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});