const request = require("request");
const xmlToJSON = require("xml2js").parseString;
const emptyFn = function() {}

var Hikvision = function(options, callback) {
	callback = callback || emptyFn;
	this.hostname = options.hostname;
	this.username = options.username;
	this.password = options.password;
	this.port = options.port || 80;
    this.timeout = options.timeout || 120000;
    
    this.preserveAddress = options.preserveAddress || false;
};

Hikvision.prototype.getData = function(isapi, callback) {
    var options = {
        uri: `http://${this.hostname}/ISAPI/${isapi}`,
        auth: {
            user: this.username,
            password: this.password,
            sendImmediately: false
        }
    };
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            xmlToJSON(body, function(err, result) {
                callback(result)
            });
        }
    });
};

Hikvision.prototype.putData = function(isapi, data, callback) {
    var options = {
        uri: `http://${this.hostname}/ISAPI/${isapi}`,
        auth: {
            user: this.username,
            password: this.password,
            sendImmediately: false
        },
        method: 'PUT',
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8'
        },
        body: data
    };
    request(options, function(error, response, body) {
        console.log(response);
        if (!error && response.statusCode == 200) {
            xmlToJSON(body, function(err, result) {
                if (err) {
                    callback(err);
                };
                callback(result)
            });
        } else {
            callback(error)
        }
    })
};

module.exports = {
	Hikvision: Hikvision
};