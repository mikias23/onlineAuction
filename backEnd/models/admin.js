const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const AdminSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
       type: String,
       required: true
    },
    phone: {
        type:String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    passwordChanged : {
        type: Boolean,
        required: true
    },
    profilePicPath: {
        type:String,
        required: true
    },

})


const Admin = module.exports = mongoose.model('Admin', AdminSchema);


// module.exports.getUserById = function(id, callback){
//     User.findById(id,callback);
// }
module.exports.getAdmin= function(callback)
{
    Admin.find({}, callback)
}
module.exports.updateAdminProfile = function(data, hashPassword,  id,  callback)
{
    data['passwordChanged'] = true;
    const query = {_id: data.id };

    if(hashPassword)
    {
        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(data.password, salt, (err,hash) => {
                if(err) throw err;
                data.password = hash;
                Admin.findOneAndUpdate({_id: id},{ $set: data}, callback);

            })
        })
    }
    else {
        Admin.findOneAndUpdate({_id: id},  { $set: data},  callback);

    }


  
    
 
}
module.exports.authenticateUser = function(credentials, callback){
    console.log('In Admin ')
       
        Admin.findOne({username : credentials.username},callback)

    

    
 }
 module.exports.findOneByPhone = function(phone, callback)
{

    let query = {phone : phone}

    Admin.findOne(query, callback);

}

module.exports.changePassword = function(data, callback) {

    let query = {
        _id: data.id
    }
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(data.password, salt, (err,hash) => {
            if(err) throw err;
            data.password = hash;
           
            Admin.findOneAndUpdate(query, {password:data.password}  , {upsert:false},  callback);
        })
    })

}

module.exports.comparePassword = function(candidatePasword, hash , callback){
    console.log(candidatePasword , hash)
     bcrypt.compare(candidatePasword , hash ,(err, isMatch) => {

         if(err) throw err;

         callback(null, isMatch);
        
     })
 }


