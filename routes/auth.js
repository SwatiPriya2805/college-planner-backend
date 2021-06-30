const express = require( 'express' );
const { 
    register,
    login,
    firstLogin
} = require( '../controllers/auth' );

const router = express.Router();

router.post( '/register', register );
router.post( '/login', login );
router.post( '/firstLogin', firstLogin);

module.exports = router;