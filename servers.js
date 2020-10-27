const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const {
    Album
} = require('./models/album');
const PORT = 3000;
const mongoURI = 'mongodb://localhost:27017/mongoRelationships';

mongoose.connect(
    mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('the connection with servers mongod is established');
    }
);

app.use(express.urlencoded({
    extended: false
}));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static('public'));
app.use(methodOverride('_method'));
// ABOVE our app.get()
app.use('/album', require('./controllers/albumController'));




app.get('/', (req, res) => {
    res.render('home.ejs');
});

// NEW ALBUM 
router.get('/new', (req, res) => {
    res.render('albums/new.ejs');
});

// CREATE NEW ALBUM
router.post('/', (req, res) => {
    Album.create(req.body, (error, newAlbum) => {
        res.send(newAlbum);
    });
});

app.listen(PORT, () => {
    console.log(`servers is running on port ${PORT}`);
});