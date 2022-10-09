const mongoose = require('mongoose');


const rateSchema = mongoose.Schema({
    Comfort:{
        type: String,
        required: true
    },
    Correspondance:{
       type: String,
       required:true
      },
    ProblemFix: {
        type:String,
        required: true
    },
    Security: {
        type: String,
        required: true
    },
    Pricing: {
        type: String,
        required: true
    },
    Overall: {
        type: String,
        required: true
    },
    Comment: {
        type: String 
    },
    ratorPhone: {
        type: String
    },
    ratedDate: {
        type: String
    },
    houseId: {
        type: String
    }

});


const Rate = module.exports = mongoose.model('Rate',rateSchema);

module.exports.addRate= function(newRate, callback){
   
 newRate.save(callback);
};
module.exports.checkRate = function(objCheck, callback)
{
    Rate.findOne({
        $and:[ 
          {ratorPhone: objCheck.ratorPhone }, {houseId: objCheck.houseId } 
        ]}, callback);
}
module.exports.getRatings = function(callback)
{
     Rate.find({}, callback);
}

module.exports.findByHouseID = function(houseId, callback)

{
    let houseI={houseId:houseId};
    Rate.find(houseI, callback);
}
module.exports.deleteByHouseId = function(houseId, callback)
{
    let houseIds={houseId:houseId};
    Rate.deleteMany(houseIds, callback);
}
module.exports.deleteRate = function(id, callback)
{

     Rate.deleteOne({_id:id}, callback)
}
