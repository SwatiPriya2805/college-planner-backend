const express = require( 'express' );
const { 
    getClub,
    getClubEvent,
    //deleteClub,
    patchClubEvent
} = require( '../controllers/club' );

const { authenticate} = require( '../middleware/auth' );

const router = express.Router();

router.get('/', authenticate, getClub);
router.get('/:name', authenticate, getClubEvent);
router.post('/add/:name',authenticate, patchClubEvent);
//router.patch('/:clubId',authenticate, deleteClub);

module.exports = router;