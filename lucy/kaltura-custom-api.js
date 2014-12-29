var Client = require('./kaltura-raw-api.js');


exports.getVideosAboutColumbia = function(callback) {
  return Client.getMedia({
    'nameLike': 'Columbia',
    'orderBy': '+createdAt',
  }, callback);
}
 

