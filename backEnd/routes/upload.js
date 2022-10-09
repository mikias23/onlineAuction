const express = require('express');
const router = express.Router();
const Upload = require('../helpers/storage')
const Location = require('../models/location');
const Rating = require('../models/rate');
const authJwt = require('../config/jwt');
const Auctions = require('../models/auctions')
const City = require('../models/cities');
const Category = require('../models/categories')
const bcrypt = require('bcryptjs');

router.post('/uploadAuction',  Upload.upload, (req,res) => {

     let itemsNames = req.body.name,
     itemPrices= req.body.pricePerItem,
     brand= req.body.brand,
     quantity = req.body.quantity,
     condition= req.body.condition, startDate = new Date(req.body.startDate) , endDate = new Date(req.body.endDate);
     startDate = startDate.getTime();
    endDate = endDate.getTime();

  
    let paymentDetails = {
        uploadFee:parseInt(req.body.uploadFee),
        generatedCode: req.body.generatedCode,
        paid:false
    }
    
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(paymentDetails.generatedCode, salt, (err,hash) => {
            if(err) throw err;
           paymentDetails.generatedCode = hash;
           let newAuction = Auctions({
            type: req.body.type,
            format:req.body.format,
            span: req.body.span,
            phone:req.body.phone,
            startDate: startDate,
            endDate:endDate,
            city: req.body.city,
            category:req.body.category,
            name: itemsNames,
            itemImagePath:[],
            itemPrices:itemPrices,
            quantity:quantity,
            brand:brand,
            startingBid: req.body.startingBid,
            auctioneerId:req.body.auctioneerId,
            city:req.body.city,
            paymentCode: req.body.generatedCode,
            subscribers: [],
            condition:condition,
            description:req.body.description,
            paymentDetails: paymentDetails
              
     
    })
    
Upload.saveAuction(newAuction).then(function(result){
    res.json({
        success:true,
        msg: 'Auction Uploaded',
        auctionId:result._id
    })
})

         

               
    })
})
})

    
router.post('/uploadLocation',(req,res) => {
  
    var newLocation = Location({
        city:req.body.city,
        name:req.body.name
    });
    Location.addLocation(newLocation, (err,result) => {
        if(err)
        {
            res.json({
                success:false,
                msg: 'Location not uploaded'
            })
        }
        else {
            res.json({
                success:true,
                msg: 'Location Uploaded'
            })
        }
    })
 
})
router.post('/addCity', Upload.uploadSingleCity, (req,res) => {

    var newCity = City({
        city:req.body.city
    })
    newCity.cityImagePath = Upload.getCityPicPath();
    City.addCity(newCity, (err,result) => {
        if(err)
        {
            res.json({
                success:false,
                msg: 'City Not uploaded'
            })
        }
        else {
            res.json({
                success:true,
                msg: 'City uploaded'
            })
        }
    })
 
})
router.post('/addCategory', (req,res) => {

    var newCategory = Category({
        name:req.body.name
    })
    
    Category.addCategory(newCategory, (err,result) => {
        if(err)
        {
            res.json({
                success:false,
                msg: 'Category Not uploaded'
            })
        }
        else {
            res.json({
                success:true,
                msg: 'Category uploaded'
            })
        }
    })
 
})
router.post('/rateHouse',(req,res) => {
  
    var newRate= Rating({
        Comfort:req.body.Comfort,
        Correspondance:req.body.Correspondance,
        ProblemFix:req.body.ProblemFix,
        Security:req.body.Security,
        Pricing:req.body.Pricing,
        Overall:req.body.Overall,
        Comment:req.body.Comment,
        ratorPhone:req.body.ratorPhone,
        ratedDate:req.body.ratedDate,
        houseId:req.body.houseId
    });

    var checkRate ={
        ratorPhone:req.body.ratorPhone,
        houseId:req.body.houseId
    }
    Rating.checkRate(checkRate, (err, result) => {
        if(result)
        {
            res.json({
                success:false,
                msg: 'House Rated before by this user'
            })
        }
        else {
            Rating.addRate(newRate, (err,result) => {
                if(err)
                {
                    res.json({
                        success:false,
                        msg: 'Rate Not uploaded'
                    })
                }
                else {
                    res.json({
                        success:true,
                        msg: 'Rate Uploaded'
                    })
                }
            })
        }
    })
    
 
})
module.exports = router;