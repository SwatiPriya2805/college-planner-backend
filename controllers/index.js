// controllers -> index.js
const path = require( 'path' );

const getIndex = ( req, res/*, next */ ) => {
    res.render( 'index', {
        title: 'College Planner'
    });
};

module.exports = {
    getIndex
};