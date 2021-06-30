const express = require( 'express' );
const { 
    getCalendar
} = require( '../controllers/club' );

const { authenticate} = require( '../middleware/auth' );

const router = express.Router();

router.get('/', authenticate, getCalendar);

module.exports = router;