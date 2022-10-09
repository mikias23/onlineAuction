const mongoose = require('mongoose');


const RentRecordSchema = mongoose.Schema({

    houseId:{
        type: String,
        required: true
    },
    dateStart:{
       type:Number,
       required: true
    },
    dateEnd:{
        type:Number,
        required: true
     },

    clientPhone: {
        type:String,
        required: true
    }
    ,
    
    status: {
        type:String,
        required: true
    },
    rentPlan: {
        type:String,
        required: true
    }
    });


const RentRecord = module.exports = mongoose.model('RentRecord', RentRecordSchema);



 module.exports.addRecord = function(record, callback){
  
    record.save(callback);
    };

module.exports.accepted= function(responseObj, callback)
{
    RentRecord.findOneAndUpdate({houseId: responseObj.houseId }, {status: responseObj.response }, {
        new: true
      }, callback) 
}
module.exports.rejected = function(houseId, callback)
{
    RentRecord.remove({houseId: houseId}, callback);
}
 module.exports.getRecordById = function(id, callback){
        Record.findById(id,callback);
    }
module.exports.getRecords = function(callback){
  RentRecord.find({}, callback);
        };
module.exports.updateCollection = function(currentDate, callback)
{   
     RentRecord.updateMany(
    { dateEnd: { $lt: currentDate } },
    { $set: { "status" : 'over' } }, callback
 );

}

module.exports.deleteRecord= function(id, callback){
            const query = {_id: id};
           RentRecord.deleteOne(query,callback)
        };
 module.exports.deleteRecordByHouseId= function(id, callback){
       const query = {houseId: id};
       console.log(query)
       console.log('in Records')
           RentRecord.deleteOne(query,callback)
        };


module.exports.updateRecord = function(id, callback)
{
    const query = {_id:id};
    Record.findOneAndUpdate(query, {status: 'accepted'}  , {upsert:false},  callback);

} 

module.exports.extendRecord = function(record, callback)
{
    const query = {houseId: record.houseId };
    Record.findOneAndUpdate(query, {dateStart: record.dateStart, dateEnd: record.dateEnd, status: 'accepted'}  , {upsert:false},  callback);
}
module.exports.updateRecords = function(id, callback)
{
    const query = {_id:id};
    Record.findOneAndUpdate(query, {status: 'over'}  , {upsert:false},  callback);

}         
module.exports.deleteRecordBasedOnUserId= function(id, callback){
            const query = {userId: id};
           Record.deleteMany(query,callback)
        };
 module.exports.deleteRecords= function(id, callback){
            if(id)
            {
               Record.deleteMany({},callback)
           
            }
            else {
                Record.deleteMany({},callback)
        
            }
        };
        