# YuruCamp☆

> A Node.js web application project! Yuru Camp Themed! 〈(⁎￫‿ฺ￩)ノ･:*☆

## Live Demo

Coming Soon...

## Features (TO DO)

* Authentication:

  * User login with username and password
  * Admin sign-up with admin code
* Authorization:

  * One cannot manage posts and view user profile without being authenticated
  * One cannot edit or delete posts and comments created by other users
  * Admin can manage all posts and comments
* Manage campground posts with basic functionalities:

  * Create, edit and delete posts and comments
  * Upload campground photos
  * Display campground location on Google Maps
  * Search existing campgrounds
* Manage user account with basic functionalities:

  * Password reset via email confirmation
  * Profile page setup with sign-up
* Flash messages responding to users' interaction with the app
* Responsive web design

### Custom Enhancements Wao!! ̑̑ෆ(⸝⸝⸝◉⸝ ｡ ⸝◉⸝⸝⸝)

* Update campground photos when editing campgrounds
* Update personal information on profile page
* Improve image load time on the landing page using Cloudinary
* Use Helmet to strengthen security

## Getting Started (Don't, it's not ready yet! >_<)

> This app contains API secrets and passwords that have been hidden deliberately, so the app cannot be run with its features on your local machine. However, feel free to clone this repository if necessary.

### Clone or download this repository

```sh
git clone https://github.com/Crimson-Blade/yuru-camp.git
```

### Install dependencies

```sh
npm install
```

or

```sh
yarn install
```
### Start Development Server
```sh
node ./app.js
```
or, if you have `nodemon` installed
```sh
npm start
```

### Comments in code

Some comments in the source code are course notes and therefore might not seem necessary from a developer's point of view.

## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Google Maps APIs](https://developers.google.com/maps/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [async](http://caolan.github.io/async/)
* [crypto](https://nodejs.org/api/crypto.html#crypto_crypto)
* [helmet](https://helmetjs.github.io/)
* [joi](https://joi.dev/)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [morgan](https://www.npmjs.com/package/morgan)
* [nodemailer](https://nodemailer.com/about/)
* [moment](https://momentjs.com/)
* [cloudinary](https://cloudinary.com/)
* [geocoder](https://github.com/wyattdanger/geocoder#geocoder)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

### Platforms

* [Cloudinary](https://cloudinary.com/)
* [Heroku](https://www.heroku.com/)
* [Cloud9](https://aws.amazon.com/cloud9/?origin=c9io)

## License

#### [MIT](./LICENSE)
