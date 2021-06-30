const mongoose = require( 'mongoose' );
const Notice = mongoose.model( 'notice' );

const getNotice = ( req, res, next ) => {
    const search = req.query.search || '';
    if( search==='' ){
        Notice
            .find() 
            .then( notice => res.json( notice ) )
            .catch( err => {
                err.status = 500;
                return next( err );
            });
        }        
    else{
        Notice
            .find({ $or: [ { description:{ $regex:new RegExp(search), $options: 'i' } }, { title:{ $regex:new RegExp(search), $options: 'i' } } ] } )
            .then( notice => res.json( notice ) )
            .catch( err => {
                err.status = 500;
                return next( err );
            });
    }    
}

const postNotice = ( req, res, next ) => {
    const notice = req.body;
    const role = res.locals.claims.role;

    if( !notice || Object.keys( notice ).length === 0 || role!=='admin') {
        const error = new Error( 'Missing notice details in request' );
        error.status = 400; 
        return next( error );
    }
    Notice
        .create( notice )
        .then( createdNotice => { 
            res.status( 201 ).json( createdNotice );
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

const deleteNotice = ( req, res, next ) => {
    const _id = req.params.noticeId;
    const action = req.query.action;
    const role = res.locals.claims.role;

    if( action !== "remove_notice" || !_id || role!=='admin') {
        const error = new Error( 'Missing notice details in request' );
        error.status = 400; 
        return next( error );
    }  
    
    Notice
        .findOne( { _id : _id } )
        .then( notice => {
            return Notice.deleteOne( { _id : _id } )
        })
        .then( updatedNotice =>{
            res.status(200).json( updatedNotice )
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
    getNotice,
    postNotice,
    deleteNotice
};