module.exports = function(server, logger) {
  
  var pjson = require('../package.json'); 

  server.get('/version', function (req, res, next) {
    res.send({ 
                'name': pjson.name,
                'version': pjson.version 
              });      
    return next();
  });  
};
