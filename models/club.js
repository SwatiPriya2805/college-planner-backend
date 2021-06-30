const mongoose = require( 'mongoose' );

const timeSchema = new mongoose.Schema({
    hours: {
        type: Number,
        min: 0,
        max: 23,
        default: 10,
        required: true
    },
    minutes: {
        type: Number,
        min: 0,
        max: 59,
        default: 0,
        required: true
    }
});

const eventSchema = new mongoose.Schema({
    uploadDate: {
        type: String,
        required: true,
        default: new Date().toDateString()
    },
    title: {
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
    }
});

const dateSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    startTime: {
        _id: false,
        type: timeSchema,
        required: true
    },
    endTime: {
        _id: false,
        type: timeSchema,
        required: true
    }
});

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    linkdin: {
        type: String,
        required: true
    },
    facebook:{
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    events: [
        {
            type: eventSchema,
            required: true,
            dates: [
                {
                    type: dateSchema,
                    required: true
                }
            ]
        }
    ],
    

});

mongoose.model( 'club', clubSchema );