const express = require("express");
const morgan = require("morgan")
const postBank = require("./postBank")

const app = express();

//middleware - used to help debug
app.use(morgan('dev'));

//static routing - here is allows access to the contents the public folder
app.use(express.static('public'))

app.get('/', (req, res) => {
  //first, get a list of posts
  const posts = postBank.list()

  //main route - prepare some html to send as output
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span><a href='/posts/${post.id}'>${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
     ).join('')}
    </div>
  </body>
  </html>`

  //send the page
  res.send(html);
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);

  //if id doesn't exist, pass the error to the error handler
  if (!post.id)
    next();

  const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      <div class='news-item'>
        <p>
          ${post.title} <small>(by ${post.name})</small>
        </p>
      </div>
      <div class='news-item'>
        <p>
          ${post.content}
        </p>
      </div>
    </body>
    </html>`

  res.send(html);
});

//error handler
app.use((err, req, res, next) => {
  //define the error page to return
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
    <header><img src="/logo.png"/>Wizard News</header>
    <div class='news-item'>
      <p>
        *POOF*
      </p>
    </div>
    <div class='news-item'>
      <p>
        Looks like this page has disappeared! Sorry about that.
      </p>
    </div>
  </body>
  </html>`

  //send page not found status
  res.status(404)
  
  //send page itself
  res.send(html);
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});