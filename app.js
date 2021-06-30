// connect to the DB
require( './data/init' );

const express = require( 'express' );
const morgan = require( 'morgan' );
const cors = require( 'cors' );

const { pageNotFoundHandler, errorHandler } = require( './middleware/errorHandler' );

const indexRouter = require( './routes/index' );
const noticeRouter = require( './routes/notice' );
const authRouter = require( './routes/auth' );
const departmentRouter = require( './routes/department' );
const clubRouter = require( './routes/club' );
const calendarRouter = require( './routes/calendar' );

const app = express();
app.use( cors() );

app.use( morgan( ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"' ) );

// sets req.body (parses incoming JSON content in request body)
app.use( express.json() );

app.use( express.urlencoded( { extended: false } ) );

// the middleware is said to be "mounted on the specified path"
app.use( '/', indexRouter );
app.use( '/auth', authRouter );
app.use( '/api/notice', noticeRouter );
app.use( '/api/department', departmentRouter);
app.use( '/api/club', clubRouter );
app.use( '/api/calendar', calendarRouter);
//concatenation -> /api/..... || /auth....


app.use( pageNotFoundHandler );
app.use( errorHandler );

const PORT = process.env.PORT || 3000;

app.listen(PORT, error => {
    if( error ) {
        return console.error( error.message );
    }

    console.log( `Server started on http://localhost:${PORT}` );
});