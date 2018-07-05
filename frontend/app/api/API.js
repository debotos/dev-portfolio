//////////////////////////////////////////////
//           GET PROJECT DETAILS
/////////////////////////////////////////////
module.exports = app => {
  app.get('/getProjectDetails', function(req, res) {
    res.json({
      title: 'Portfolio Projects',
      tag: 'javascript, css, html, ajax'
    });
  });

  app.get('/getBlogContent', function(req, res) {
    res.json({
      title: 'Single Blog Item By Debotos Das',
      tag: 'javascript, css, html, ajax'
    });
  });
};
