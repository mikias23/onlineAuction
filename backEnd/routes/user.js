'use strict';
const express = require('express');
const router = express.Router();
const Auctioneer = require('../models/auctioneer');
const Bidder = require('../models/bidder')
const jwt = require('jsonwebtoken');
const authJwt = require('../config/jwt');
const CheckUpdate=  require('./checkUpdate/checkUpdate')
const Admin = require('../models/admin')
const Upload = require('../helpers/storage')
const fs= require('fs');
const path = require('path');

const updateInterval = require('./checkupdate/test/updateInterval.json');
const Auctions= require('../models/auctions')
const AuctionsHistory= require('../models/auctionsHistory')


router.get('/getInterval', (req, res) => {

  let interval = updateInterval.interval
    return res.json({
        success:true,
        interval: interval
    })

})

router.post('/updateInterval', (req, res) => {

    let interval = {
        hrs : req.body.hrs,
        mins: req.body.mins,
        days:req.body.days
    }
    , saveInterval;
    interval.days = interval.days * 24*60*60*1000;
    interval.hrs = interval.hrs * 60*60*1000;
    interval.mins = interval.mins * 60*1000;
  
    saveInterval = interval.days + interval.hrs + interval.mins
    let lastUpdatedDate = updateInterval.lastUpdatedDate
    
    let obj = {
        interval: saveInterval,
        lastUpdatedDate: lastUpdatedDate
      }
      console.log(obj)
       fs.writeFile(
        path.join(__dirname, 'checkUpdate/test', 'updateInterval.json'), JSON.stringify(obj),(err, data) => {
            if(!err)
            {
                return res.json({
                    success:true,
                    msg: 'success update', 
                    interval:saveInterval
                })
            } 
            else {
                throw err
            }

        })


    
   
  
  })
router.post('/register', Upload.uploadSingle, (req,res) => {
    const bidderOrAuctioneer = req.body.type;

    if(bidderOrAuctioneer === 'bidder')
    {
        let bidder = new Bidder({
             
            username:req.body.username,
            phone:req.body.phone,
            firstName: 'fgfgfg',
            lastName: req.body.lastName,
            email: req.body.email,
            password:req.body.password,
            profilePicPath: 'dddfdfdf'

        })
        let  Credential = {username: bidder.username, phone: bidder.phone  } 
        Bidder.authenticateUser(Credential, (err, user) => {
    
            if(!user)
            {

                bidder.profilePicPath =  Upload.getProfilePicPath();

                Bidder.addUser(bidder, (err,user) => {
                   
                    if(err){
                     res.json({success:false, msg:"Failed to register Auctioneer"});
                         }
                     else {
                         res.json({success: true, msg:'Auctioneer registered'});
                           }
                })
               
           }
           else {
               if(bidder.username == "Admin" || bidder.username == "admin" || bidder.username == "Administrator" || bidder.username == "administrator" ||
               bidder.username == "admin")
               {
    
                   res.json({success:false, msg:"Change Username "});
               }
               else
               {
    
                if(bidder.username == user.username)
                   res.json({success:false, msg:"Change username, username already Exists"});
                else 
                {
                res.json({success:false, msg:"Change Phone,  phone number already used"});
    
                }    
               }
    
    
    
        }
     })

    }
    else {
        let auctioneer= new Auctioneer({
             
            username:req.body.username,
            phone:req.body.phone,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password:req.body.password,
            bussinessType: req.body.bussinessType,
            profilePicPath: ''
            ,
            approved:false

        })
        let  Credential = {username: auctioneer.username, phone: auctioneer.phone  } 
        Auctioneer.authenticateUser(Credential, (err, user) => {
    
           if(!user)
           {
            auctioneer.profilePicPath =  Upload.getProfilePicPath();
              Auctioneer.addUser(auctioneer, (err,user) => {
                   if(err){
                    res.json({success:false, msg:"failed to register Auctioneer"});
                     
                   }
                    else {
                        res.json({success: true, msg:'Auctioneer registered'});
                        
                  }
               })
           }
           else {
               if(auctioneer.username == "Admin" || auctioneer.username == "admin" || auctioneer.username == "Administrator" || auctioneer.username == "administrator" ||
               auctioneer.username == "admin")
               {
    
                   res.json({success:false, msg:"Change Username "});
               }
               else
               {
    
                if(auctioneer.username == user.username)
                   res.json({success:false, msg:"Change username, username already Exists"});
                else 
                {
                res.json({success:false, msg:"Change Phone,  phone number already used"});
    
                }    
               }
    
    
    
           }
        })
    }


})
router.post('/login',(req,res) => {
 let authenticateUser = {
            username:req.body.username,
            password:req.body.password
         };
         console.log(authenticateUser)
        let loginCredential = { username : authenticateUser.username, phone:null}
    if(req.body.type === 'adminstrator')
    {
        console.log('asas')
        Admin.authenticateUser(loginCredential, (err,user) => {
            if(err){
                return res.json({
                    success:false,
                    msg:'something Went Wrong'
                })
            }
         if(!user){
             console.log(user)
                return res.json({
                    success:false,
                    msg:'Incorrect Username'
                })
            }
            
            if(user.passwordChanged)
            {
                Admin.comparePassword(authenticateUser.password, user.password, (err, isMatch) =>
                {
    
                   
                    if(err){
                        res.json(
                            {
                                success:false, 
                                msg:"unkown error"});
                            }
                        else {
                            if(isMatch)
                            {
                           var token  = jwt.sign({_id: user._id}, 'secret', {
                              expiresIn: 604800
                          });
                          lastHopeForToday(); 
                            return res.json({
                                success:true,
                                msg:'success',
                                user:user,
                                token:token,
                                userType:'admin'
                            })
                           }
        
                           else {
                            return res.json({
                                success:false,
                                msg:'Incorrect Password'
                            })
                           }
                                               
                      }
        
                }) 
            }
           
            else {
  
                if(authenticateUser.password === user.password)
                {
                        
                           var token  = jwt.sign({_id: user._id}, 'secret', {
                              expiresIn: 604800
                          });
                          lastHopeForToday();
    
                            return res.json({
                                success:true,
                                msg:'success',
                                user:user,
                                token:token,
                                userType:'admin'
                            })
                }
           else {
                     return res.json({
                                success:false,
                                msg:'Incorrect Password'
                            })
                  }
                                               
                       
                
            }
    
         })
     
    }
    else if(req.body.type === 'bidder')
    {
        Bidder.authenticateUser(loginCredential, (err,user) => {
            if(err){
                return res.json({
                    success:false,
                    msg:'something Went Wrong'
                })
            }
         if(!user){
             console.log(user)
                return res.json({
                    success:false,
                    msg:'Incorrect Username'
                })
            }
         
        Bidder.comparePassword(authenticateUser.password, user.password, (err, isMatch) =>
            {

               
                if(err){
                    res.json(
                        {
                            success:false, 
                            msg:"unkown error"});
                        }
                    else {
                        if(isMatch)
                        {
                       var token  = jwt.sign({_id: user._id}, 'secret', {
                          expiresIn: 604800
                      });
                      
                        return res.json({
                            success:true,
                            msg:'success',
                            user:user,
                            token:token,
                            userType:'bidder'
                        })
                       }
    
                       else {
                        return res.json({
                            success:false,
                            msg:'Incorrect Password'
                        })
                       }
                                           
                  }
    
            }) 
    
         })
    }

    else {
    Auctioneer.authenticateUser(loginCredential, (err,user) => {
        if(err){
            return res.json({
                success:false,
                msg:'something Went Wrong'
            })
        }
     if(!user){
            return res.json({
                success:false,
                msg:'Incorrect Username'
            })
        }
    Auctioneer.comparePassword(authenticateUser.password, user.password, (err, isMatch) =>
        {
            if(err){
                res.json(
                    {
                        success:false, 
                        msg:"unkown error"});
                    }
                else {
                    if(isMatch)
                    {
                   var token  = jwt.sign({_id: user._id}, 'secret', {
                      expiresIn: 604800
                  });
                    return res.json({
                        success:true,
                        msg:'success',
                        user:user,
                        token:token,
                        userType:'auctioneer'

                    })
                   }

                   else {
                    return res.json({
                        success:false,
                        msg:'Incorrect Password'
                    })
                   }
                                       
              }

        }) 

     })
    }
  

})

function lastHopeForToday()
{
    let currentDate = new Date().getTime(), lastUpdatedDate = updateInterval.lastUpdatedDate, interval = updateInterval.interval, auctionsExpired = new Array(), expiredAuctionsId = new Array();

     lastUpdatedDate = lastUpdatedDate + interval ;
     console.log( 'admin')

        if(currentDate  > lastUpdatedDate )
        {
             
         let obj = {
           interval: interval,
           lastUpdatedDate: currentDate
         }
          fs.writeFile(
           path.join(__dirname, 'checkUpdate/test', 'updateInterval.json'), JSON.stringify(obj),(err, data) => {
             Auctions.getAuctions((err,result) => {
           
                if(err)
                {
                }
               result.forEach((res) => {
                if(res.endDate < currentDate)
                {
                   auctionsExpired.push(res);
                   expiredAuctionsId.push(res._id)
                }

               })

          for(let i = 0 ; i < auctionsExpired.length; i++)
          {
            console.log(auctionsExpired[i])
            let tempo = new AuctionsHistory({
                type:auctionsExpired[i].type,
                format:auctionsExpired[i].format,
                span:auctionsExpired[i].span,
                startDate: auctionsExpired[i].startDate,
                endDate:auctionsExpired[i].endDate,
                city : auctionsExpired[i].city,
                category:auctionsExpired[i].category,
                name:auctionsExpired[i].name,
                itemImagePath:auctionsExpired[i].itemImagePath,
                itemPrices: auctionsExpired[i].itemPrices,
                quantity:auctionsExpired[i].quantity,
                brand:auctionsExpired[i].brand,
                subscribers: auctionsExpired[i].subscribers,
                phone:auctionsExpired[i].phone,
                startingBid:auctionsExpired[i].startingBid,
                auctioneerBid:auctionsExpired[i].auctioneerBid,
                auctioneerId: auctionsExpired[i].auctioneerId,
                paymentDetails: auctionsExpired[i].paymentDetails,
                description:auctionsExpired[i].description


            })
            console.log(tempo, 'to auctionExpire', auctionsExpired)
            AuctionsHistory.addAuction(tempo, (err, result)=> {
                if(err)
                {
                   console.log('sth wrong not uploaded')
                   console.log(err)
                }
                else {
                    console.log('uploaded')
                }
            })
             Auctions.removeAuction(expiredAuctionsId[i], (err, result)=> {
                 if(err)
                 {
                    console.log('not deleted')
                 }
                 else {
                     console.log('deleted')
                 }
             })

          }

         
             })
    
          })
        }
    
}
router.get('/profile', authJwt, (req,res) => {
    return res.json({
        success:false,
        msg:'something Went Wrong'
    })
})

module.exports = router;