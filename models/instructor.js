var mongoose = require('mongoose');

//Schema for instructors
var InstructorSchema = mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type:String
    },
    username: {
        type: String
    },
    address: [{
        street_address:{type: String},
        city:{type: String},
        state:{type: String},
        zip:{type: String}
    }],
    email: {
        type: String
    },
    classes: [{
        class_id: {type: [mongoose.Schema.Types.ObjectId]},
        class_title: {type: String}
    }]
    

});
var Instructor = module.exports = mongoose.model('instructor', InstructorSchema);
