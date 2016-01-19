var Segment = require('./segment.js');
var Snake = require('./snake.js');
var Segments = require('./segments');

var allModels = _.indexBy([Segment, Snake], function(d){
    return d.configs.name;
});

_.extend(allModels, Segments);
module.exports = allModels;