const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const AuctionSchema = mongoose.Schema({

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
    condition:[],
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
            },
            notify: {
                type:Boolean
            }
        }
    ],

    paymentDetails:{
        uploadFee:Number,
        generatedCode: String,
        paid: Boolean
    },
    description: {
        type: String,
        required: true
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
    },
    paymentCode: {
        type:String
    }
});


const Auction = module.exports = mongoose.model('Auction', AuctionSchema);

module.exports.addAuction = function(newAuction, callback){

     newAuction.save(callback);
};
module.exports.getAuctions = function(callback) {
console.log('sdsdsd')
    Auction.find({}, callback)
}
module.exports.addSubscriber = function(subscriber, callback) {
  

    Auction.findOneAndUpdate({_id: subscriber.auctionId}, 
        {$push : {subscribers: {"bidderId": subscriber.bidderId, "bidderPhone":subscriber.phone, "bidAmount": 0, "notify":false} }} , {upsert:false},  callback);


}
module.exports.removeSubscriber = function(unsubscribeObj, callback) {

    Auction.findOneAndUpdate( 
        { "_id" : unsubscribeObj.auctionId} , 
        { "$pull" : { "subscribers" : { "bidderId" :  unsubscribeObj.bidderId } } } , 
        { "multi" : true }, callback
    )
}


module.exports.updateBidderNotify = function(obj, callback)
{
    console.log(obj)
    Auction.findOneAndUpdate( 
        { _id : obj.auctionId, 
        subscribers:{ $elemMatch: {
            bidderId:obj.id}}},
        { $set : { "subscribers.$.notify": false} } 
        , callback)
}
module.exports.submitBid = function(bid, callback) {

  console.log(bid, 'yeah')
    Auction.findOneAndUpdate(
        {_id : bid.auctionId },
        { $set: { "subscribers.$[].notify" : true} },
        (err, result)=> {
            if(err)
            {

            }
            else {
                Auction.findOneAndUpdate( 
                    { _id : bid.auctionId, 
                    subscribers:{ $elemMatch: {
                        bidderId:bid.bidderId }}},
                    { $set : { "subscribers.$.bidAmount": bid.bidAmount,"subscribers.$.notify": false} } 
                    , callback)
            }
        }
     )

     


    

   
}
module.exports.removeBid = function(bid, callback) {
  console.log('reached')
  console.log(bid)
    Auction.findOneAndUpdate( 
        { _id : bid.auctionId, 
        subscribers:{ $elemMatch: {
            bidderId:bid.bidderId }}},
        { $set : { "subscribers.$.bidAmount": 0 } } 
        , callback)
    
 }
 module.exports.removeAuction = function(id, callback) {
    const query = {_id: id};
    Auction.deleteOne(query,callback)
 }

 module.exports.deleteManyAuction = function(id, callback)
 {
    let query = {auctionId: id}
    Auction.deleteMany(query,callback)
 }
 module.exports.validatePaymentCode = function(obj, callback)
 {
         
    Auction.findOne({_id :obj.auctionId},callback)
 }

 module.exports.approvePayment= function(auctionId, callback){



   let  query = {
        _id : auctionId
    }
    Auction.findOneAndUpdate( 
        query,
        { $set : { "paymentDetails.paid": true} } 
        , callback)
 }
 module.exports.comparePassword = function(candidatePasword, hash , callback){
    bcrypt.compare(candidatePasword , hash ,(err, isMatch) => {

        if(err) throw err;

        callback(null, isMatch);
       
    })


}

module.exports.removeAll = function(callback)
{
Auction.deleteMany({}, callback);
}
