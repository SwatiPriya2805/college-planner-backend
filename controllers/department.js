const mongoose = require( 'mongoose' );
const Note = mongoose.model( 'note' );
const Timetable = mongoose.model( 'timetable' );

// Notes section
const getNotes = ( req, res, next ) => {
    Note
        .find()
        .then( notes => res.json( notes ) )
        .catch( err => {
            err.status = 500;
            return next( err );
        });
}

const postNotes = ( req, res, next ) => {
    const notes = req.body;
    const role = res.locals.claims.role;

    if( !notes || Object.keys( notes ).length === 0 || role!=='admin') {
        const error = new Error( 'Missing notes details in request' );
        error.status = 400; 
        return next( error );
    }
    Note
        .create( notes )
        .then( createdNotes => { 
            res.status( 201 ).json( createdNotes );
        })
   
        .catch(error => {
            console.log( JSON.stringify( error, null, 4 ) );

            if( error.name === 'ValidationError' ) {
                error.status = 400;
            } else {
                error.status = 500;
            }
            return next(error);
        });
};

const deleteNotes = ( req, res, next ) => {
    const _id = req.params.notesId;
    const action = req.query.action;
    const role = res.locals.claims.role;

    if( action !== "remove_notes" || !_id || role!=='admin') {
        const error = new Error( 'Missing notes details in request' );
        error.status = 400; 
        return next( error );
    }  
    
    Note
        // .findOne( { _id : _id })
        // .then( notes => {
        //     return Note.deleteOne( { _id : _id , type : 'notes' } )
        // })
        .findOneAndDelete({ _id: _id })
        .then( updatedNotes =>{
            res.json( " Removed the notes ")
        })
        .catch(error => {
            console.log( JSON.stringify( error, null, 4 ) );

            if( error.name === 'ValidationError' ) {
                error.status = 400;
            } else {
                error.status = 500;
            }
            return next(error);
        });
};

// Timetable section
const getTimetable = ( req, res, next ) => {
    Timetable
        .find()
        .then( timetable => res.json( timetable ) )
        .catch( err => {
            err.status = 500;
            return next( err );
        });
}

const postTimetable = ( req, res, next ) => {
    const timetable = req.body;
    const role = res.locals.claims.role;

    if( !timetable || Object.keys( timetable ).length === 0 || role!=='admin') {
        const error = new Error( 'Missing timetable details in request' );
        error.status = 400; 
        return next( error );
    }
    Timetable
        .create( timetable )
        .then( createdTimetable => { 
            res.status( 201 ).json( createdTimetable );
        })
   
        .catch(error => {
            console.log( JSON.stringify( error, null, 4 ) );

            if( error.name === 'ValidationError' ) {
                error.status = 400;
            } else {
                error.status = 500;
            }
            return next(error);
        });
};

const deleteTimetable = ( req, res, next ) => {
    const _id = req.params.timetableId;
    const action = req.query.action;
    const role = res.locals.claims.role;

    if( action !== "remove_timetable" || !_id || role!=='admin') {
        const error = new Error( 'Missing time table details in request' );
        error.status = 400; 
        return next( error );
    }  
    
    Timetable
        .findOne( { _id : _id } )
        .then( timetable => {
            return Timetable.deleteOne( { _id : _id , type : 'timetable' } )
        })
        .then( updatedTimetable =>{
            res.status(200).json( updatedTimetable )
        })
        .catch(error => {
            console.log( JSON.stringify( error, null, 4 ) );

            if( error.name === 'ValidationError' ) {
                error.status = 400;
            } else {
                error.status = 500;
            }
            return next(error);
        });
};


module.exports = {
    getNotes,
    postNotes,
    deleteNotes,
    getTimetable,
    postTimetable,
    deleteTimetable
};