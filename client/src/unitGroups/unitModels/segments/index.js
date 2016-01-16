var BlueSegment = require('./blueSegment.js');
var GreenSegment = require('./greenSegment.js');
var OrangeSegment = require('./orangeSegment.js');
var PinkSegment = require('./pinkSegment.js');
var YellowSegment = require('./yellowSegment.js');

module.exports = _.indexBy([BlueSegment, GreenSegment, OrangeSegment, PinkSegment, YellowSegment], function(d){
    return d.configs.name;
});