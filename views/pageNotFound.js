const html = require('html-template-tag');

//display an error if the page does not exist
module.exports = () => html `<!DOCTYPE html>
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