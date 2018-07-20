const path = require('path');
const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const axios = require('axios');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Var
const port = process.env.PORT || 5500;
const app = express();

let HOST_URL;
let EMAIL;
let MAP_API_KEY;
let MAILER_ID;
let MAILER_PASSWORD;
if (process.env.NODE_ENV === 'production') {
  HOST_URL = process.env.HOST_URL;
  EMAIL = process.env.EMAIL;
  MAP_API_KEY = process.env.MAP_API_KEY;
  MAILER_ID = process.env.MAILER_ID;
  MAILER_PASSWORD = process.env.MAILER_PASSWORD;
} else {
  HOST_URL = 'http://localhost:5000';
  EMAIL = 'debotosdas@gmail.com';
  MAP_API_KEY = ''; // @todo: Put google map api key
  MAILER_ID = ''; // @todo: Put you email here
  MAILER_PASSWORD = ''; // @todo: Put you password here
}

console.log('ENV => ');
console.log(process.env.HOST_URL);
console.log(process.env.EMAIL);
console.log(process.env.MAP_API_KEY);
console.log(process.env.MAILER_ID);
console.log(process.env.MAILER_PASSWORD);
console.log(
  process.env.MAILER_PASSWORD
    ? ''
    : 'Put your your mail & password for development testing!'
);

// general config
app.set('views', path.join(__dirname, 'views'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// Middleware
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Path to public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));

// API
require('./app/api/API')(app);

// Routes
// index page
app.get('/', function(req, res) {
  try {
    const getProfileData = () =>
      axios.get(`${HOST_URL}/api/profile/user/${EMAIL}`);
    const getPortfolioData = () =>
      axios.get(`${HOST_URL}/api/portfolio/user/${EMAIL}`);
    const getPortfolioCategoryData = () =>
      axios.get(`${HOST_URL}/api/portfolio/user/category/${EMAIL}`);
    const getBlogData = () => axios.get(`${HOST_URL}/api/blog/user/${EMAIL}`);

    const allResponse = axios
      .all([
        getProfileData(),
        getPortfolioCategoryData(),
        getPortfolioData(),
        getBlogData()
      ])
      .then(
        axios.spread(function(profileRes, categoryRes, portfolioRes, blogRes) {
          const profile = { map_api_key: MAP_API_KEY, ...profileRes.data };
          const portfolio = portfolioRes.data;
          const category = categoryRes.data;
          const blog = blogRes.data;
          // console.log('profile is => ', profile);
          // console.log('portfolio is =>', portfolio);
          // console.log('blog is =>', blog);
          res.render('index.ejs', { profile, category, portfolio, blog });
        })
      )
      .catch(ex => {
        console.log(
          `Error (Maybe API service ${HOST_URL} crashed!) => `,
          ex.response.data
        );
        res.status(404).render('404.ejs');
      });
  } catch (error) {
    console.error(`Error (Maybe API service ${HOST_URL} crashed!) => `, error);
    res.status(404).render('404.ejs');
  }
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: MAILER_ID,
      pass: MAILER_PASSWORD
    }
  });

  axios
    .get(`${HOST_URL}/api/profile/user/${EMAIL}`)
    .then(response => {
      let mailList = [response.data.email];
      console.log('Sending mail to =>', mailList);
      const mailOptions = {
        from: email, // sender address
        to: mailList, // list of receivers
        subject: `'${name}' ✔contact you via your portfolio`, // Subject line
        html: `
          <div>
            <h4>${name} Contact: ${email} [Use this mail to contact me]</h4>
            <hr/>
            <h5>Message Body: <br/></h5>
            <p>${message}</p>
          </div>
        ` // plain text body
      };

      transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log(err);
          res.status(404).json({
            type: 'danger',
            message: 'Something wrong in sending mail! Failed to send!!'
          });
        } else {
          console.log(info);
          res.status(200).json({
            type: 'success',
            message: '✔ Thanks, I will get back to you as soon as possible.'
          });
        }
      });
    })
    .catch(error => {
      console.log('Error occure => ', error);
      res.status(404).json({
        type: 'danger',
        message: 'Something wrong in sending mail! Failed to send!!'
      });
    });
});

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res) {
  res.redirect('/');
});

// Server Start
app.listen(port, () => {
  console.log('Server Started at port ', port);
});
