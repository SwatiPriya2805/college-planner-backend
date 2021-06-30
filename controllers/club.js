const mongoose = require( 'mongoose' );
const Club = mongoose.model( 'club' );

const getClub = ( req, res, next ) => {
    Club
        .find()
        .then( clubs => res.json( clubs ) )
        .catch( err => {
            err.status = 500;
            return next( err );
        });
}

const getClubEvent = ( req, res, next ) => {
    const clubname = req.params.name;
    Club
        .findOne( { name : clubname } )
        .then( club => res.json( club ) )
        .catch( err => {
            err.status = 500;
            return next( err );
        });
}

// const deleteClub = ( req, res, next ) => {
//     const _id = req.params.clubId;
//     const clubName = req.query.name;
//     const action = req.query.action;
//     const role = res.locals.claims.role;

//     if( !clubName || action !== "remove_club" || !_id || role!=='admin') {
//         const error = new Error( "Missing club event's details in request" );
//         error.status = 400; 
//         return next( error );
//     }  
    
//     Club
       
//         .findOneAndDelete( { name : clubName, events:{ $elemMatch:{ _id : _id } }  } )
//         .then( updatedNotes =>{
//             res.json( " Removed the event ")
//         })
//         .then( updatedClubs =>{
//             res.status(200).json( updatedClubs )
//         })
//         .catch(error => {
//             console.log( JSON.stringify( error, null, 4 ) );

//             if( error.name === 'ValidationError' ) {
//                 error.status = 400;
//             } else {
//                 error.status = 500;
//             }
//             return next(error);
//         });
// };

const getCalendar = ( req, res, next ) => {
    const calendarDate = new Date(req.query.date).toISOString();
    Club
        .find( { date:{ $regex:new RegExp(calendarDate), $options: 'i' } } ) 
        .then( clubevents => res.json( clubevents ) )
        .catch( err => {
            err.status = 500;
            return next( err );
        });
}

const patchClubEvent = ( req, res, next ) => {
    const clubdata = req.body;
    const clubName = req.params.name;

    if( !clubName || !clubdata) {
        const error = new Error( 'Missing club event details in request' );
        error.status = 400; 
        return next( error );
    }  
    
    
    Club.
        findOneAndUpdate( {name :clubName}, {
            $push :{
                events : clubdata
            }
        },{ new: true})
        .then( updatedClubs =>{
            res.status(200).json( updatedClubs )
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
    getClub,
    getClubEvent,
    //deleteClub,
    getCalendar,
    patchClubEvent
};