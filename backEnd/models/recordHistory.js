const mongoose = require('mongoose');


const RecordHistorySchema = mongoose.Schema({

    houseId:{
        type: String,
        required: true
    },
 
    clientPhone: {
        type:String,
        required: true
    }
    
    });


const RecordHistory = module.exports = mongoose.model('RecordHistory', RecordHistorySchema);



 module.exports.addRecord = function(record, callback){
    console.log(record)

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
 module.exports.getRecordHistoryByHouseIdAndPhone = function(record, callback){

    console.log(record)
        
        RecordHistory.find({ houseId: record.houseId, clientPhone:record.clientPhone

        },callback);
    }
module.exports.getRecords = function(callback){
  RecordHistory.find({}, callback);
        };


module.exports.deleteHistoryByHouseId= function(id, callback){
    console.log(id)
            const query = {houseId: id};
            console.log('reached her for sure' , query)
            console.log()
           RecordHistory.deleteMany(query,callback)
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
           RecordHistory.deleteMany(query,callback)
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
        