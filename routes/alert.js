var express = require('express');
var router = express.Router();

/***********************************
 * alert REST API                  *
 * ------------------------------- *
 * This API will manage the CRUD   *
 * aspects of alert management.    *
 ***********************************/

/* Add alert */
router.post('/add', function(req, res, next) {
    // verify input
    var phoneNumber = req.body.phoneNumber;
    var emailAddress = req.body.emailAddress;
    var requestedAlerts = req.body.requestedAlerts;

    // TODO: do we want a maximum?
    // TODO: check for duplicates?
    if ((!phoneNumber && !emailAddress)
        || !requestedAlerts
        || !Array.isArray(requestedAlerts)
        || (requestedAlerts.length === 0)) {
        return res.json({ success: false, error: "WRONGARGS" });
    }

    // generate hash to identify this batch of requests
    var requestSeed = phoneNumber + emailAddress + requestedAlerts.join("");
    var hash = Math.abs(requestSeed.hashCode()).toString() + Date.now().toString();

    // add alerts to database
    var db = req.db;
    var alertCollection = db.get('alerts');
    var alerts = [];
    for (var i = 0; i < requestedAlerts.length; i++) {
        alerts.push({
            phoneNumber: phoneNumber,
            emailAddress: emailAddress,
            addressID: requestedAlerts[i],
            emailEnabled: false,
            phoneEnabled: false,
            requestHash: hash
        });
    }

    alertCollection.insert(alerts)
        .complete(function(err, doc) {
            if (err) { return res.json({ success: false, error: "DBERROR" }); }
            // TODO: send verification email/text
            return res.json({ success: true, hash: hash });
        });
});

/* Verify alert */
router.post('/verify', function(req, res, next) {
    // switch alert to active matching the requestHash
    var requestHash = req.body.requestHash;
    var device = req.body.device;

    if (!requestHash || !device) {
        return res.json({ success: false, error: "WRONGARGS" });
    }

    var updateObject = {};
    if (device == "phone") {
        updateObject.phoneEnabled = true;
    } else if (device == "email") {
        updateObject.emailEnabled = true;
    }

    var db = req.db;
    var alertCollection = db.get('alerts');
    // TODO: don't allow activation after 24 hours?
    alertCollection.update({ requestHash: requestHash },
                           { $set: updateObject })
                           .complete(function(err, doc) {
                               if (err) { return res.json({ success: false, error: "DBERROR" }); }
                               return res.json({ success: true });
                           });
});

/* Remove alert by ID (email) */
// XXX: text messages won't be able to have a link? must deregister all?
router.post('/remove', function(req, res, next) {
    var requestHash = req.body.requestHash;
    alertCollection.update({ requestHash: requestHash },
                           { $set: { emailAddress: "", emailEnabled: false } })
                           .complete(function(err, doc) {
                               if (err) { return res.json({ success: false, error: "DBERROR" }); }
                               return res.json({ success: true });
                           });
});

module.exports = router;

// string extension for conversion hashing to integer
String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (var i = 0, len = this.length; i < len; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
};
