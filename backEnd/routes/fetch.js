const express = require('express');
const router = express.Router();
const Auction = require('../models/auctions');
const Bidder = require('../models/bidder');
const Auctioneer = require('../models/auctioneer');
const AuctionHistory = require('../models/auctionsHistory');
const Cities = require('../models/cities')
const Category = require('../models/categories')

router.get('/auctions', (req,res) => {
    
    Auction.getAuctions((err, result) => {
        if(err)
        {
            console.log(err)
            res.json({success: false, msg:'Auction Uploaded Successfully'});
        }
        else {
            res.json({success: true, msg:'Auction Uploaded Succesfully', 
            data:result});
        }
      })
})
router.get('/auctionsHistory', (req,res) => {
    
    AuctionHistory.getAuctions((err, result) => {
        if(err)
        {
            console.log(err)
            res.json({success: false, msg:'Auction Uploaded Successfully'});
        }
        else {
            res.json({success: true, msg:'Auction Uploaded Succesfully', 
            data:result});
        }
      })
})
router.get('/auctioneers', (req,res) => {
    
Auctioneer.getAuctioneers((err, result) => {
        if(err)
        {
            console.log(err)
            res.json({success: false, msg:'Auction Uploaded Successfully'});
        }
        else {
            res.json({success: true, msg:'Auction Uploaded Succesfully', 
            data:result});
        }
      })
})
router.get('/bidders', (req,res) => {
    
    Bidder.getBidders((err, result) => {
        if(err)
        {
            console.log(err)
            res.json({success: false, msg:'Auction Uploaded Successfully'});
        }
        else {
            res.json({success: true, msg:'Auction Uploaded Succesfully', 
            data:result});
        }
      })
})
router.get('/cities', (req,res) => {
    
    Cities.getCities((err, result) => {
        if(err)
        {
            console.log(err)
            
        }
        else {
            res.json({success: true, msg:'Auction Uploaded Succesfully', 
            data:result});
        }
      })
})
router.get('/category', (req,res) => {
    
   Category.getCategory((err, result) => {
        if(err)
        {
            console.log(err)
            
        }
        else {
            res.json({success: true, msg:'Auction Uploaded Succesfully', 
            data:result});
        }
      })
})
module.exports = router;