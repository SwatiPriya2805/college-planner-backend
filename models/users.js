const mongoose = require( 'mongoose' );
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    valid: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        required: true,
        default: 'admin'
    },
    department: {
        type: String,
        required: true,
        default: 'IMH'
    },
    token: {
        type: String,
        required: true
    }
});

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

userSchema.path( 'email' ).validate(
    email => emailRegex.test( email ),
    'Invalid email id format'
);

userSchema.path( 'password' ).validate( 
    password => passwordRegex.test( password ),
    'Invalid password format - Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 numeric character, and one special character'
);

const SALT_FACTOR = 10;

// the function is called when we to save / update to the corresponding users collection
userSchema.pre( 'save', function( done ) {
    const user = this;

    // password has not been updated
    if( !user.isModified( 'password' ) ) {
        return done();
    }

    // password has been updated - hash and save it
    bcrypt.genSalt( SALT_FACTOR, ( err, salt ) => {
        if( err ) {
            return done( err );
        }

        bcrypt.hash( user.password, salt, ( err, hashedPassword ) => {
            if( err ) {
                return done( err );
            }

            user.password = hashedPassword;
            done();
        });
    });
});

userSchema.methods.checkPassword = function( password, done ) {
    bcrypt.compare( password, this.password, ( err, isMatch ) => {
        done( err, isMatch );
    });
};


mongoose.model( 'user', userSchema );