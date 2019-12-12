var mongoose = require('mongoose');

//Schema for students
var StudentSchema = mongoose.Schema({
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
var Student = module.exports = mongoose.model('Student', StudentSchema);