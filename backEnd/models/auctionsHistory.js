const mongoose = require('mongoose');


const AuctionsHistorySchema = mongoose.Schema({

    type:{
        type: String,
        required: true
    },
    format:{
        type: String,
        required: true
        },
    span: {
        type:Number,
        required: true
    },
    startDate: {
        type: Number,
        required: true
    },
    endDate: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    name: [],
    itemImagePath:[],
    itemPrices:[],
    quantity:[],
    brand:[],
    subscribers:[
        {
            bidderId:{
                type: String,
                required: true  
            },
            bidAmount:{
                type: Number,
                required:true
                
            },
            bidderPhone: {
                type: String,
                required: true  
            }
        }
    ],
    paymentDetails:{
        uploadFee:Number,
        generatedCode: String,
        paid: Boolean
    },
    phone: {
        type: String,
        required: true
    },
    startingBid: {
        type: String,
        required: true
    },
    auctioneerId: {
        type:String,
        required: true
    }
    , 
    ratings : [
        {
            bidderId:{
                type: String,
                required: true  
            },
            rating:{
                type: Number,
                required:true
                
            },
             comment: {
                type: String
            }
        }
 
    ],

    description: {
        type: String,
        required: true
    },
});


const AuctionsHistory = module.exports = mongoose.model('AuctionsHistory', AuctionsHistorySchema);

module.exports.addAuction = function(auctionHistory, callback){
     auctionHistory.save(callback);
};
module.exports.getAuctions = function(callback) {
     
        AuctionsHistory.find({}, callback)
 }

module.exports.rate = function(rate,callback) {
     

     
    AuctionsHistory.updateOne({_id: rate.auctionId}, 
        {$set : {ratings: {"bidderId": rate.bidderId, "rating":rate.rating, "comment": rate.Comment} }} , {upsert:false},  callback);
 }

module.exports.deleteRating = function (obj, callback)
{
    AuctionsHistory.findOneAndUpdate( 
        { _id :obj.auctionId} , 
        { $pull : { ratings : { "bidderId" : obj.bidderId } } } , 
        { "multi" : true }, callback
    )
}
module.exports.removeAuction = function(id, callback) {
    const query = {_id: id};
    AuctionsHistory.deleteOne(query,callback)
 }
 module.exports.removeAll = function(callback)
 {
 AuctionsHistory.deleteMany({}, callback);
 }
 