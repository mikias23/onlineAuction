const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const AuctioneerSchema = mongoose.Schema({
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
    profilePicPath: {
        type:String,
        required: true
    },
    bussinessType : {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    approved: {
        type:Boolean
    }

})


const Auctioneer = module.exports = mongoose.model('Auctioneer', AuctioneerSchema);


// module.exports.getUserById = function(id, callback){
//     User.findById(id,callback);
// }
module.exports.authenticateUser = function(credentials, callback){

    if(credentials.phone )
    {
       Auctioneer.findOne({
            $or:[ 
              {username: credentials.username }, {phone: credentials.phone } 
            ]}, callback)
    
    }
    else {
       
       Auctioneer.findOne({username : credentials.username},callback)

    }

    
 }
module.exports.addUser = function(newAuctioneer, callback){
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newAuctioneer.password, salt, (err,hash) => {
            if(err) throw err;
            newAuctioneer.password = hash;
            newAuctioneer.save(callback);
        })
    })
}


module.exports.changePassword = function(data, callback) {

    let query = {
        _id: data.id
    }
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(data.password, salt, (err,hash) => {
            if(err) throw err;
            data.password = hash;
           
          Auctioneer.findOneAndUpdate(query, {password:data.password}  , {upsert:false},  callback);
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

 module.exports.getAuctioneers = function(callback) {
    
    Auctioneer.find({}, callback)
}
module.exports.getUsers = function(callback){
   User.find({}, callback)

 }
// module.exports.getUserByPhone = function(phone, callback){
//     let phonenumber = {phonenumber:phone}
//     User.find(phonenumber, callback)

// }

 module.exports.deleteUser= function(id, callback){
     const query = {_id: id};
     console.log(query)
   Auctioneer.deleteOne(query,callback)
 }


 module.exports.updateAuctioneerProfile = function(data, hashPassword,  id,  callback)
 {
     data['passwordChanged'] = true;
     const query = {_id: data.id };
 
     if(hashPassword)
     {
         bcrypt.genSalt(10, (err,salt) => {
             bcrypt.hash(data.password, salt, (err,hash) => {
                 if(err) throw err;
                 data.password = hash;
                Auctioneer.findOneAndUpdate({_id: id},{ $set: data}, callback);
 
             })
         })
     }
     else {
        Auctioneer.findOneAndUpdate({_id: id},  { $set: data},  callback);
 
     }
 
 
   
     
  
 }

module.exports.findOneByPhone = function(phone, callback)
{

    let query = {phone : phone}

    Auctioneer.findOne(query, callback);

}

 module.exports.approveAuction = function(obj, callback)
 {
    let query = {_id:obj.id}
    Auctioneer.findOneAndUpdate(query,
        {$set: {approved: obj.approved}}, callback
        )
 }
 module.exports.removeAll = function(callback)
{
Auctioneer.deleteMany({}, callback);
}


// module.exports.deleteAllUser= function(callback){
//     console.log('reached here')
//    User.deleteMany({ },callback)
// }
// module.exports.getUsers = function(callback)
// {
//     User.find({}, callback)
// }
// module.exports.updatePassword = function(updateUser, callback){
//     bcrypt.genSalt(10, (err,salt) => {
//         bcrypt.hash(updateUser.password, salt, (err,hash) => {

//             if(err) throw err;
//             updateUser.password = hash;
//             var query = {username : updateUser.username};

//             User.findOneAndUpdate(query, {password: updateUser.password},
//                 {upsert: true}, callback);

//         })
//         // MyModel.findOneAndUpdate(query, req.newData, {upsert: true}, function(err, doc) {
//         //     if (err) return res.send(500, {error: err});
//         //     return res.send('Succesfully saved.');
//         // });
//     })
// }


// module.exports.deleteUser= function(id, callback){
//     const query = {_id: id};
//    User.deleteOne(query,callback)
// };
// // module.exports.deleteHouses= function(id, callback){
// //     const query = {userID: id};
// //     if(id)
// //     {
// //         House.deleteMany({query},callback)
   
// //     }
// //     else {
// //         House.deleteMany({},callback)

// //     }
// // }