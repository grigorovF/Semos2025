const express = require('express');
const post = require('./handlers/postHandler');
const db = require('../../pkg/db/index');

const cors = require('cors');
const jwt = require('express-jwt');

const app = express();

db.init();
app.use(express.json());
app.use(cors());

app.use(
  jwt.expressjwt({
    algorithms: ['HS256'],
    secret: process.env.JWT_SECRET,
  })
);

app.post('/api/v1/posts/me', post.createByUser);
app.get('/api/v1/posts/me', post.getByUser);

app.get('/api/v1/posts', post.getAll);
app.get('/api/v1/posts/:id', post.getOne);
app.post('/api/v1/posts', post.create);
app.patch('/api/v1/posts/:id', post.update);
app.delete('/api/v1/posts/:id', post.delete);

app.listen(process.env.PORTPOST, (err) => {
  if (err) {
    console.log('Could not start service');
  }
  console.log(`service started successfully on port ${process.env.PORTPOST}`);
});
