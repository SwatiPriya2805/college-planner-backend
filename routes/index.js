const express = require( 'express' );
const { getIndex } = require( '../controllers/index' );

// helps modularize the routes
const router = express.Router();

router.get( '/', getIndex );

module.exports = router;