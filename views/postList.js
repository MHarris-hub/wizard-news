const html = require('html-template-tag');
const timeAgo = require('node-time-ago');

//main route (main page list of posts) - prepare some html to send as output
module.exports = (posts) => html `<!DOCTYPE html>
    <html>
    <head>
        <title>Wizard News</title>
        <link rel='stylesheet' href='/style.css' />
    </head>
    <body>
        <div class='news-list'>
        <header><img src='/logo.png'/>Wizard News</header>
        ${posts.map(post => html `
            <div class='news-item'>
            <p>
                <span class='news-position'>${post.id}. ▲</span><a href='/posts/${post.id}'>${post.title}</a>
                <small>(by ${post.name})</small>
            </p>
            <small class='news-info'>
                ${post.upvotes} upvotes | ${timeAgo(post.date)}
            </small>
            </div>`
        )}
        </div>
    </body>
    </html>`;