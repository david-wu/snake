var Food = require('./food.js');
var Segment = require('./segment.js');
var Snake = require('./snake.js');

module.exports = _.indexBy([Food, Segment, Snake], function(d){
    return d.configs.name;
});