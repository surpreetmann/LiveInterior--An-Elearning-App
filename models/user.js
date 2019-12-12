var mongoose = require('mongoose');

//For password encryption
var bcrypt = require('bcryptjs'); 

//User schema
var UserSchema = mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        bcrypt: true
    },
    type: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

//Getting user by its username
module.exports.getUserByUsername = function(username, callback){
    var userQuery= {username: username};
    User.findOne(query, callback);
}

//Getting user by its id
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

//Check is password is correct
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err)
            throw err;
        callback(null, isMatch);    
    });
}

//creating new Instructor user
module.exports.saveInstructor = function(newUser, newInstructor, callback){
    bcrypt.hash(newUser.password, 10, function(err, hash){
        if(err)
            throw err;
        //setting hash for password 
        newUser.password = hash;
        console.log("New Instructor user being saved.");
        async.parallel([newUser.save, newInstructor.save], callback);   
    });
}

// creating new Student user
module.exports.saveStudent = function(newUser, newStudent, callback){
    bcrypt.hash(newUser.password, 10, function(err, hash){
        if(err)
            throw err;
        //setting hash for password 
        newUser.password = hash;
        console.log("New Student user being saved.");
        async.parallel([newUser.save, newStudent.save], callback);   
    });
}