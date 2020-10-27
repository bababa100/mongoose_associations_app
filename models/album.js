const mongoose = require('mongoose');
const songSchema = new mongoose.Schema({
        songPlayed: String,
    }, {
        timestamps: true
    }

);



const albumSchema = new mongoose.Schema({
        artist: {
            type: String,
            default: '',
        },
        songs: [songSchema],

    }, {
        timestamps: true
    }

);

const Album = mongoose.model('User', albumSchema);
const Song = mongoose.model('Song', songSchema);

module.exports = {
    Album,
    Song
};