# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Final Product

!["Screenshot of URLs Page"](https://github.com/arms1997/tinyapp/blob/master/docs/url_home.PNG?raw=true)
*Screenshot of URLs Home Page*


!["Screenshot of URL Show Page"](https://github.com/arms1997/tinyapp/blob/master/docs/url_show.PNG?raw=true)
*Screenshot of URLs Show Page*

!["screenshot description"](https://github.com/arms1997/tinyapp/blob/master/docs/url_new.PNG?raw=true)
*Screenshot of Create new URL page*

!["screenshot description"](https://github.com/arms1997/tinyapp/blob/master/docs/url_login.PNG?raw=true)
*Screenshot of Login Page*

!["screenshot description"](https://github.com/arms1997/tinyapp/blob/master/docs/url_register.PNG?raw=true)
*Screenshot of Register Page*

## Dependencies

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cookie-session](https://www.npmjs.com/package/cookie-session)
- [method-override](https://www.npmjs.com/package/method-override)

## Development Dependencies

- [chai](https://www.chaijs.com/)
- [mocha](https://mochajs.org/)
- [nodemon](https://www.npmjs.com/package/nodemon)

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm run start` command.
- Once the server has started go to `localhost:3000/urls` in your browser
- You will be required to register for an account (this account will only exist temporarily while the server is running)
- Once registered you will automatically be logged in and can create new shortened urls!

## Notes
- You can access shortened URLs by clicking on the hyperlink in the urls_show page or by going to `localhost:3000/u/shortenedURL` where `shortenedURL` is the specific tinyURL you are trying to access
- Please note that you can only modify url's that belong to your account, you will automatically be redirected when trying to access and or modify a url that does not belong to you. 
- You will still be able to access shortened urls that do not belong to you by going to `localhost:3000/u/shortenedURL`

## Contact
- In the situation that you are facing problems starting up the application please contact me at armeen.hadizadeh@gmail.com

