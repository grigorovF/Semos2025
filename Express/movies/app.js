const dotenv = require('dotenv');
const express = require('express');
const app = express();
const db = require('./pkg/db/index');

app.use (express.urlencoded({extended:true}));
app.use(express.json);

db.init();