var mongoose = require('mongoose');

//our class schema
var ClassSchema=mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    instructor: {
        type: String
    },
    lessons: [{
        lesson_number: {type: Number},
        lesson_title: {type: String},
        lesson_body: {type: String}
    }]
});

// To make it available outside
var Class = module.exports = mongoose.model('Class', ClassSchema);

// To fetch all classes
module.exports.getClasses = function(callback, limit){
    Class.find(callback).limit(limit);
}
// To fetch single class
module.exports.getClassById = function(id, callback){
    Class.findById(id, callback);
} 