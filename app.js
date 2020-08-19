const express = require('express');
const morgan = require('morgan');
const postBank = require('./postBank');
const postList = require('./views/postList');
const postDetails = require('./views/postDetails');
const pageNotFound = require('./views/pageNotFound');

const app = express();

//middleware - used to help debug
app.use(morgan('dev'));

//static routing - here is allows access to the contents the public folder
app.use(express.static('public'));

app.get('/', (req, res) => {
  //get a list of posts
  const posts = postBank.list();

  //send the page
  res.send(postList(posts));
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);

  //if id doesn't exist, pass the error to the error handler
  if (!post.id)
    next();

  //send the page
  res.send(postDetails(post));
});

//error handler
app.use((err, req, res, next) => {
  //send page not found status
  res.status(404);
  
  //send page itself
  res.send(pageNotFound());
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});