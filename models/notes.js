const mongoose = require( 'mongoose' );

const noteSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    uploadDate: {
        type: String,
        default: new Date().toDateString(),
        required: true
    }
});

mongoose.model( 'note', noteSchema );