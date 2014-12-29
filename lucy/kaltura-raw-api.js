var FS = require('fs');
var KalturaConstants = require('./kaltura/KalturaTypes.js');
var Kaltura = require('./kaltura/KalturaClient.js');
var KalturaCreds = JSON.parse(FS.readFileSync('kaltura-creds.json'));

var Config = new Kaltura.KalturaConfiguration(KalturaCreds.partner_id);
var KalturaClient = new Kaltura.KalturaClient(Config);

var Session = null;

var initialize = function(callback) {
  KalturaClient.session.start(function(session) {
    KalturaClient.setKs(session);
    Session = session;
    callback();
  }, KalturaCreds.admin_secret, KalturaCreds.user_id, KalturaConstants.KalturaSessionType.ADMIN,
     KalturaCreds.partner_id, KalturaCreds.session_length);
}

exports.getMedia = function(filterOptions, callback) {
  if (!Session) return initialize( function() {exports.getMedia(filterOptions, callback)} );
  var filter = new Kaltura.objects.KalturaMediaEntryFilter();
  for (var key in filterOptions) {
    filter[key] = filterOptions[key];
  }
  var pager = new Kaltura.objects.KalturaFilterPager();
  KalturaClient.media.listAction(function(results) {
    callback(null, results.objects);
  }, filter, pager);
}
