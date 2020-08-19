const html = require('html-template-tag');

//display when a post is clicked
module.exports = (post) => html `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel='stylesheet' href='/style.css' />
    </head>
    <body>
      <div class='news-list'>
      <header><img src='/logo.png'/>Wizard News</header>
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
    </html>`;