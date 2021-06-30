const express = require( 'express' );
const { 
    getNotes,
    postNotes,
    deleteNotes,
    getTimetable,
    postTimetable,
    deleteTimetable
} = require( '../controllers/department' );

const { authenticate} = require( '../middleware/auth' );

const router = express.Router();

router.get('/notes', authenticate, getNotes);
router.get('/timetable', authenticate, getTimetable);
router.post('/notes',authenticate, postNotes);
router.post('/timetable',authenticate, postTimetable);
router.patch('/notes/:notesId',authenticate, deleteNotes);
router.patch('/timetable/:timetableId',authenticate, deleteTimetable);

module.exports = router;