const express = require( 'express' );
const { 
    getNotice,
    postNotice,
    deleteNotice
} = require( '../controllers/notice' );

const { authenticate} = require( '../middleware/auth' );

const router = express.Router();

router.get('/', authenticate, getNotice);
router.post('/',authenticate, postNotice);
router.patch('/:noticeId',authenticate, deleteNotice);

module.exports = router;