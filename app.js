import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import connectDB from './config/db.js';
import cors from 'cors'

import adminRouter from './routes/admin.js';
import usersRouter from './routes/users.js';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(import.meta.url);

var app = express();



app.use(logger('dev'));
app.use(json());
app.use(cors())
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

connectDB();

app.use('/admin', adminRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
