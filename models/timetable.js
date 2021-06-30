const mongoose = require( 'mongoose' );

const timetableSchema = new mongoose.Schema({
    semester: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    uploadDate: {
        type: String,
        default: new Date().toDateString(),
        required: true
    }
});

mongoose.model( 'timetable', timetableSchema );