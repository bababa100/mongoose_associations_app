const {
    Router
} = require('express');
const {
    Album
} = require('../models/album');

const router = require('express').Router();
const Album = require('../models/album').Album;
const Song = require('../models/album').Song;

//New Form
router.get('/new', (req, res) => {
    res.render('album/new.ejs');
});

//CREATE NEW Album
router.post('/', (req, res) => {
    Album.create(req.body, (error, newAlbum) => {
        res.send(newAlbum);

    });


    // ADD EMPTY FORM TO ALBUM SHOW PAGE TO ADD SONG TO A ALBUM
    router.get('/:albumId', (req, res) => {
        // find album in db by id and add new song
        Album.findById(req.params.albumId, (error, album) => {
            res.render('album/show.ejs', {
                album
            });
        });
    });
    router.post('/', (req, res) => {
        Album.create(req.body, (error, album) => {
            res.redirect(`/albums/${album.id}`);
        });
    });

    // CREATE SONG EMBEDDED IN Album
    router.post('/:albumId/songs', (req, res) => {
        console.log(req.body);
        // store new song in memory with data from request body
        const newSong = new Song({
            songText: req.body.songText
        });

        // find album in db by id and add new song
        Album.findById(req.params.albumId, (error, album) => {
            album.songs.push(newSong);
            album.save((err, album) => {
                res.redirect(`/album/${album.id}`);
            });
        });
    });

});

module.exports = router;