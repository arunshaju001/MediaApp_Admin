const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const db = require('./db');

const UserController = require('./user/UserController');
app.use('/admin/users', UserController);

const AuthController = require('./auth/AuthController');
app.use('/admin/api/auth', AuthController);

module.exports = app;