// USER login and register model is used as getter here.

const mongoose = require( 'mongoose' );
const jwt = require( 'jsonwebtoken');
const User = mongoose.model( 'user' );

const register = ( req, res, next ) => {
    // this has { name: string, email: string, password: string }
    const user = req.body;

    if( !user ) {
        const error = new Error( 'User details not sent in request body' );
        next( error );
        return;
    }

    User
        .create( user )
        .then( updatedUser => {
            res.status( 201 ).json( updatedUser );
        })
        .catch( err => {
            if( err.name === 'ValidationError' ) {
                err.status = 400;
            } else {
                err.status = 500;
            }

            return next( err );
        });
};

const login = ( req, res, next ) => {
    // this has { email: string, password: string }
    const u = req.body;

    if( !u ) {
        const error = new Error( 'Login details not sent in request body' );
        next( error );
        return;
    }
    
    if( !u.email || !u.password ) {
        const error = new Error( 'Login details not sent in request body' );
        next( error );
        return;
    }

    User
        .findOne( { email: u.email, valid : true } )
        .then( user => {
            if( !user ) {
                const error = new Error( 'No matching credentials' );
                error.status = 404;
                return next( error );
            }
            
            user.checkPassword( u.password, ( err, isMatch ) => {
                if( err ) {
                    const error = new Error( 'No matching credentials' );
                    error.status = 404;
                    return next( error );
                }

                if( !isMatch ) {
                    const error = new Error( 'No matching credentials' );
                    error.status = 404;
                    return next( error );
                }
                // generate the token
                const claims = {
                    name: user.name,
                    email: user.email,
                    userId: user._id,
                    role: user.role
                };


                //'abcd' = process.env.JWT_SECRET 
                jwt.sign( claims,'abcd' , { expiresIn: 60 * 60 * 24 }, ( err, token ) => {
                    if( err ) {
                        err.status = 500;
                        return next( err );
                    }

                    res.json({
                        email: user.email,
                        name: user.name,
                        token: token,
                        role: user.role
                    });
                });
            });
        })
        .catch( err => {
            if( err.name === 'ValidationError' ) {
                err.status = 400;
            } else {
                err.status = 500;
            }

            return next( err );
        });
};

const firstLogin = ( req, res, next ) => {
    const us = req.body;
    // email, password, token

    if( !us ) {
        const error = new Error( 'Login details not sent in request body' );
        next( error );
        return;
    }
    
    if( !us.email || !us.password || !us.token) {
        const error = new Error( 'Login details not sent in request body' );
        next( error );
        return;
    }

    User
        .findOne( { email: us.email, valid: false, token: us.token } )
        .then( user => {
            if( !user ) {
                const error = new Error( 'No matching credentials' );
                error.status = 404;
                return next( error );
            }

            user.checkPassword( us.password, ( err, isMatch ) => {
                if( err ) {
                    const error = new Error( 'No matching credentials' );
                    error.status = 404;
                    return next( error );
                }

                if( !isMatch ) {
                    const error = new Error( 'No matching credentials - password' );
                    error.status = 404;
                    return next( error );
                }

                const claims = {
                    name: user.name,
                    email: user.email,
                    userId: user._id,
                    role: user.role
                };

                const filter = { email: user.email, valid: false };
                const update = { valid: true };
                User
                    .findOneAndUpdate(filter, update, {
                    new: true
                    })
                    .catch( err => {
                        err.status = 500;
                        return next( err );
                    });                
                
                //'abcd' = process.env.JWT_SECRET 
                jwt.sign( claims,'abcd' , { expiresIn: 60 * 60 * 24 }, ( err, token ) => {
                    if( err ) {
                        err.status = 500;
                        return next( err );
                    }

                    res.json({
                        email: user.email,
                        name: user.name,
                        token: token,
                        role: user.role
                    });
                });

            });
        })
        .catch( err => {
            if( err.name === 'ValidationError' ) {
                err.status = 400;
            } else {
                err.status = 500;
            }

            return next( err );
        });
};



module.exports = {
    register,
    login,
    firstLogin
};