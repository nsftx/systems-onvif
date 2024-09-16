var Hikvision = require('./lib/onvif').Hikvision

var hik = new Hikvision({
    hostname: '172.20.46.34',
    username: 'admin',
    password: 'admin123'
});

hik.getData('Streaming/channels', function(response) {
    console.log(response);
});