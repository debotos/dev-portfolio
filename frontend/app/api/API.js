const axios = require('axios');

let HOST_URL;
let EMAIL;
if (process.env.NODE_ENV === 'production') {
  HOST_URL = process.env.HOST_URL;
  EMAIL = process.env.EMAIL;
} else {
  HOST_URL = 'http://localhost:5000';
  EMAIL = 'debotosdas@gmail.com';
}

/////////////////////////////////////////////
//           GET PROJECT DETAILS
/////////////////////////////////////////////
module.exports = app => {
  app.post('/api/profile', function(req, res) {
    const id = req.body.id;
    axios
      .get(`${HOST_URL}/api/portfolio/user/${EMAIL}`)
      .then(response => {
        const portfolio = response.data.portfolio.filter(
          singleItem => singleItem._id === id
        );
        if (portfolio.length > 0) {
          let user = response.data.user.name;
          return res.json({
            user: response.data.user.name,
            email: response.data.email,
            ...portfolio[0]
          });
        } else {
          return res.status(400).json({ error: 'Invalid Portfolio ID !' });
        }
      })
      .catch(ex => {
        console.log(`Error (Maybe API service ${HOST_URL} crashed!) => `, ex);
        return res.status(400).json('Internal Server Error!');
      });
  });

  app.post('/api/blog', function(req, res) {
    const id = req.body.id;
    axios
      .get(`${HOST_URL}/api/blog/user/${EMAIL}`)
      .then(response => {
        const blog = response.data.blog.filter(
          singleItem => singleItem._id === id
        );
        if (blog.length > 0) {
          let user = response.data.user.name;
          return res.json({
            user: response.data.user.name,
            email: response.data.email,
            ...blog[0]
          });
        } else {
          return res.status(400).json({ error: 'Invalid blog ID !' });
        }
      })
      .catch(ex => {
        console.log(`Error (Maybe API service ${HOST_URL} crashed!) => `, ex);
        return res.status(400).json('Internal Server Error!');
      });
  });
};
