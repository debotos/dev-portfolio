//////////////////////////////////////////////
//           GET PROJECT DETAILS
/////////////////////////////////////////////
module.exports = app => {
  app.get('/test', function(req, res) {
    res.json({
      title: 'API Testing',
      info: 'API Working...'
    });
  });
};
