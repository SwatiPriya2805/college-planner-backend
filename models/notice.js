const mongoose = require( 'mongoose' );

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: new Date().toDateString(),
        required: true
    },
    image: {
        type: String,
        required: true
    }
    // file:{
    //     type: String,
    //     required: true
    // }
});

mongoose.model( 'notice', noticeSchema );