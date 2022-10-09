const express = require('express');
const router = express.Router();
const Auctions = require('../models/auctions');
const jwt = require('jsonwebtoken');

const fs = require('fs')
const Admin = require('../models/admin');
const Auctioneer  = require('../models/auctioneer');
const Bidder = require('../models/bidder');
const Category = require('../models/categories');
const City = require('../models/cities');
const AuctionsHistory = require('../models/auctionsHistory');

router.post('/subscribe', (req,res) => {
  
    var subscriber = {
        bidderId: req.body.bidderId,
        auctionId:req.body.auctionId,
        phone:req.body.phone
    }
    console.log(subscriber, 'sdsd')
    Auctions.addSubscriber(subscriber, (err, result)=> {
        if(err)
        {
           throw err;
         //   res.json({
        //     success:false,
        //     msg:'Rent Record Saved But not added to history'
        // })
        }
        else {
            res.json({
                success:true,
                msg:'Rent Record Saved But not added to history'
            })
        }
    })

})


router.post('/unsubscribe', (req,res) => {
  
    var unsubscribe = {
        bidderId: req.body.bidderId,
        auctionId: req.body.auctionId
    }
    Auctions.removeSubscriber(unsubscribe, (err, result)=> {
        if(err)
        {
           throw err;
        //    res.json({
        //     success:false,
        //     msg:'Rent Record Saved But not added to history'
        // })
        }
        else {
            res.json({
                success:true,
                msg:'Rent Record Saved But not added to history'
            })
        }
    })

})

router.post('/removeBid', (req,res) => {
  
    var removeBid = {
        bidderId: req.body.bidderId,
        auctionId: req.body.auctionId
    }
    Auctions.removeBid(removeBid, (err, result)=> {
        if(err)
        {
           throw err;
        //    res.json({
        //     success:false,
        //     msg:'Rent Record Saved But not added to history'
        // })
        }
        else {
            res.json({
                success:true,
                msg:'Rent Record Saved But not added to history'
            })
        }
    })

})
router.post('/phoneAuthentication', (req,res) => {
  
  let userType = {
    type:req.body.type,
    phone:req.body.phone
  } 
  if(userType.type === 'admin')
  {
    Admin.findOneByPhone(userType.phone, (err, result) => {
    
           if(err)
           {
            return res.json({
                success:false,
                msg:'Sorry we could not find a user with the entered phone number'
            })
           }
           else {
            return res.json({
                success:true,
                id: result._id,
                username: result.username
            })
           }
       })
  }
  else if(userType.type === 'admin')
  {
    Auctioneer.findOneByPhone(userType.phone, (err, result) => {
    
        if(err)
        {
         return res.json({
             success:false,
             msg:'Sorry we could not find a user with the entered phone number'
         })
        }
        else {
         return res.json({
             success:true,
             id: result._id,
             username: result.username
         })
        }
    })
  }
  else {

    Bidder.findOneByPhone(userType.phone, (err, result) => {
    
        if(err)
        {
         return res.json({
             success:false,
             msg:'Sorry we could not find a user with the entered phone number'
         })
        }
        else {
         return res.json({
             success:true,
             id: result._id,
             username: result.username
         })
        }
    })
  }


})
router.post('/deleteRating', (req,res) => {
  
    var deleteRating = {
        bidderId: req.body.bidderId,
        auctionId: req.body.auctionId
    }
    AuctionsHistory.deleteRating(deleteRating, (err, result)=> {
        if(err)
        {
           throw err;
        //    res.json({
        //     success:false,
        //     msg:'Rent Record Saved But not added to history'
        // })
        }
        else {
            res.json({
                success:true,
                msg:'Rating Deleted'
            })
        }
    })

})

// remove auctions 

router.post('/removeAuction', (req, res) => {
   
    let auctionId = req.body._id, imagePath = req.body.itemImagePath;
    console.log('sdsdd')
    Auctions.removeAuction(auctionId, (err, result)=> {
        if(err)
        {
           console.log(err)
          res.json({
         success:false,
           msg:'Auction Not deleted '
    })
        }
        else {
            unlinkImage(imagePath);
            res.json({
                success:true,
                msg:'Auction deleted successfully'
            })
        }
    })
})
router.post('/removeAuctionHist', (req, res) => {
   
    let auctionId = req.body.id;
    AuctionsHistory.removeAuction(auctionId, (err, result)=> {
        if(err)
        {
 
          res.json({
         success:false,
           msg:'Auction Not deleted'
    })
        }
        else {
     
            res.json({
                success:true,
                msg:'Auction deleted successfully'
            })
        }
    })
})
function unlinkImage(path)
{
   
    for(let i = 0 ; i< path.length; i++)
    {
       let imagePath =   path[i].split('images');
       
     
        fs.unlinkSync(`./images/${imagePath[1]}`, (err) => {
            if(err)
            {
                console.log(err)
                res.json({
               success:false,
                 msg:'Auction Not deleted '
                })
            }
        });
 

    }
   
}
router.post('/submitBid', (req,res) => {
  
    var bid = {
        bidderId: req.body.bidderId,
        auctionId:req.body.auctionId,
        bidAmount:req.body.bidAmount,
        bidderPhone:req.body.bidderPhone
    }
    console.log(bid, 'sdsd')
    Auctions.submitBid(bid, (err, result)=> {
        if(err)
        {
           throw err;
        //    res.json({
        //     success:false,
        //     msg:'Rent Record Saved But not added to history'
        // })
        }
        else {
            res.json({
                success:true,
                msg:'Bid Submitted'
            })
        }
    })

})
router.post('/editUser', (req, res) => {
    let obj = req.body.form,
    hashPassword = false, id=obj.id;
      if(obj.password !== '')
      {
       hashPassword = true;
     
      }

    storeObjtoBeUpdated ={
        
       
    };
    var token  = jwt.sign({_id: id}, 'secret', {
        expiresIn: 604800
    });
    for (var [key, value] of Object.entries(obj)) {
       
        if( value !== '' && key !== 'type' && key !== 'id' && key !== 'confirmPassword')
        {
            storeObjtoBeUpdated[key]=value;
        }
      }
   
     if(obj.type === 'admin')
      {
         Admin.updateAdminProfile(storeObjtoBeUpdated, hashPassword, obj.id, (err,result) => {
            if(err)
            {
               throw err;
            //    res.json({
            //     success:false,
            //     msg:'Rent Record Saved But not added to history'
            // })
            }
            else {
                res.json({
                    success:true,
                    msg:'Profile Updated successfully',
                    user:result,
                    token:token
                })
            }
         })
      }
      else if(obj.type === 'bidder')
      {
       Bidder.updateBidderProfile(storeObjtoBeUpdated, hashPassword, id, (err,result) => {
        if(err)
        {
           throw err;
        //    res.json({ 
        //     success:false,
        //     msg:'Rent Record Saved But not added to history'
        // })
        }
        else {
            res.json({
                success:true,
                msg:'Profile Updated successfully',
                user:result,
                token:token
            })
        }
     })
      }
      else {
        Auctioneer.updateAuctioneerProfile(storeObjtoBeUpdated, hashPassword, id, (err,result) => {
            console.log(result)

            if(err)
            {
                console.log(result)
               throw err;
            //    res.json({
            //     success:false,
            //     msg:'Rent Record Saved But not added to history'
            // })
            }
            else {
                res.json({
                    success:true,
                    msg:'Profile Updated successfully',
                    user:result,
                    token:token
                })
            }
         })
      }

})
router.post('/rateAuction', (req,res) => {

    var rate = {
        bidderId: req.body.bidderId,
        auctionId:req.body.auctionId,
        rating:req.body.rating,
        Comment:req.body.comment
    }
    console.log(rate)
     
    

    AuctionsHistory.rate(rate, (err, result)=> {
        if(err)
        {
           throw err;
        //    res.json({
        //     success:false,
        //     msg:'Rent Record Saved But not added to history'
        // })
        }
        else {
            res.json({
                success:true,
                msg:'Rating successful'
            })
        }
    })

})


router.post('/changePassword', (req, res) => {
    let data = {
        password:req.body.password,
        type: req.body.type,
        id:req.body.id
    }
    if(data.type === 'admin')
    {
         Admin.changePassword(data, (err, result) => {
            console.log(result)
            if(err)
            {
                return res.json({
                    success:false,
                    msg:'Not updated'
                })
            }
            else {
                return res.json({
                    success:true,
                    msg:'Password Changed'
                })
            }
         })
    }
    else if(data.type === 'bidder') {
        Bidder.changePassword(data, (err, result) => {
            if(err)
            {
                return res.json({
                    success:false,
                    msg:'Not updated'
                })
            }
            else {
                return res.json({
                    success:true,
                    msg:'Password Changed'
                })
            }
         })
    }

    else {
        Bidder.changePassword(data, (err, result) => {
            if(err)
            {
                return res.json({
                    success:false,
                    msg:'Not updated'
                })
            }
            else {
                return res.json({
                    success:true,
                    msg:'Password Changed'
                })
            }
         })
    }
})


router.post('/deleteUser', (req, res) => {


    let objUser = {
        type: req.body.type,
        id:req.body.id
    }
    if(objUser.type === 'bidder')
    {

        Bidder.deleteUser(objUser.id, (err,result) => {
            if(err)
            {
                throw err
            }
            else {
           res.json({
                  success:true,
                  msg:'Bidder Deleted'
              })
            }
        })
    }
    else {
        Auctioneer.deleteUser(objUser.id, (err,result) => {
            if(err)
            {
                throw err
            }
            if(result){


   Auctions.deleteManyAuction(objUser.id, (err, result) => {
    if(err)
    {
         throw err
    }
    if(result){  
         res.json({
                  success:true,
                  msg:'Auctioneer and auctions posted deleted successfully'
              })
            
    }
   })
            }
        })
    }
 
})


router.post('/deleteCategory', (req,res) => {

    let id = req.body.id;
    Category.deleteCategory(id, (err, result) => {
        if(err)
        {
            throw err
        }
        else {
       res.json({
              success:true,
              msg:'Category Deleted Successfully'
          })
        }
    })


})
router.post('/deleteCity', (req,res) => {

    let id = req.body.id;
    City.deleteCity(id, (err, result) => {
        if(err)
        {
            throw err
        }
        else {
       res.json({
              success:true,
              msg:'City Deleted Successfully'
          })
        }
    })


})
 router.post('/approveAuctioneer', (req,res) => {

     let obj = {
         id:req.body.id,
         approved:req.body.approved
     }

     Auctioneer.approveAuction(obj, (err, result) => {
         if(err)
         {
             throw err
         }
         else {
        res.json({
               success:true,
               msg:'sd'
           })
         }
     })


})

router.post('/validatePaymentCode', (req,res) => {

    let obj  = {
        code : req.body.code,
        auctionId: req.body.auctionId
    }
    Auctions.validatePaymentCode(obj, (err, result) => {
    //     if(err)
    //     {
    //         throw err
    //     }
    //     else {
    //    res.json({
    //           success:true,
    //           msg:'sd'
    //       })
    //     }
    let paymentDetails = result.paymentDetails;
  if(!paymentDetails.paid)
  {
    Auctions.comparePassword(obj.code,paymentDetails.generatedCode,  (err, isMatch) =>
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
                    return res.json({
                        success:true,
                        msg:'Correct Code', 
                        uploadFee: paymentDetails.uploadFee
                    })
                }
               else {
                return res.json({
                    success:false,
                    msg:'Incorrect Code'
                })
               }
                                   
          }

    }) 
  }
  else {
    return res.json({
        success:false,
        msg:'Payment has been Made to this Auction '
    })
  }




    })



})


router.post('/approvePayment', (req,res) => {
    let auctionId = req.body.auctionId;
    console.log(auctionId)
    Auctions.approvePayment(auctionId, (err, result)=> {
        if(err) 
    {
        return res.json({
            success:false,
            msg:'successful'
        })
    }   

    else {
        console.log('r')
        return res.json({
            success:true,
            msg:'unsucessfull'
        })
    }
})
})

router.post('/updateBidderNotify', (req, res) => {
    
    let obj = {
        id:req.body.id,
        auctionId:req.body.auctionId
    }
    console.log(obj)
    Auctions.updateBidderNotify(obj, (err, result)=> {
        if(err)
        {
            return res.json({
                success:false,
                msg:'successful'
            })
        }
        else
        {
            return res.json({
                success:true,
                msg:'successful'
            })
        }
    })
})

router.post('/removeAll', (req,res)=> {
    let type = req.body.type;
    
    switch(type)
    {
      case 'categories':
        {
  Category.removeAll((err,resul)=> {
        if(err)
        {
            return res.json({
                success:false,
                msg:'Somthing Went Wrong'
            })
        }
        else {
            return res.json({
                success:true,
                msg:'All Categories Deleted Successfully'
            })
        }
    })
      break;
        }
      case 'cities':
          {
           City.removeAll((err,result)=> {
                if(err)
                {
                    return res.json({
                        success:false,
                        msg:'Somthing Went Wrong'
                    })
                }
                else {
                    return res.json({
                        success:true,
                        msg:'All Cities Deleted Successfully'
                    })
                }
            })
       break;  
          }
      case 'auctions':
          {
            Auctions.removeAll((err,result)=> {
                if(err)
                {
                    return res.json({
                        success:false,
                        msg:'Somthing Went Wrong'
                    })
                }
                else {
                    return res.json({
                        success:true,
                        msg:'All Cities Deleted Successfully'
                    })
                }
            })
       break;  
          }
     case 'bidders':
          {
            Bidder.removeAll((err,result)=> {
                if(err)
                {
                    return res.json({
                        success:false,
                        msg:'Somthing Went Wrong'
                    })
                }
                else {
                    return res.json({
                        success:true,
                        msg:'All Cities Deleted Successfully'
                    })
                }
            })
       break;  
          }
      case 'auctioneers':
            {
                Auctioneer.removeAll((err,result)=> {
                    if(err)
                    {
                        return res.json({
                            success:false,
                            msg:'Somthing Went Wrong'
                        })
                    }
                    else {
                       Auctions.removeAll((err,result)=> {
                            if(err)
                            {
                                return res.json({
                                    success:false,
                                    msg:'Something Went Wrong'
                                })
                            }
                            else {
                                AuctionsHistory.removeAll((err,result)=> {
                                    if(err)
                                    {
                                        return res.json({
                                            success:false,
                                            msg:'Somthing Went Wrong'
                                        })
                                    }
                                    else {
                                        return res.json({
                                            success:true,
                                            msg:'All Cities Deleted Successfully'
                                        })
                                    }
                                })
                           
                            }
                        })
                
                    }
                })
         break;  
        }
        case  'histories' :{

            AuctionsHistory.removeAll((err,result)=> {
                if(err)
                {
                    return res.json({
                        success:false,
                        msg:'Somthing Went Wrong'
                    })
                }
                else {
                    return res.json({
                        success:true,
                        msg:'All Cities Deleted Successfully'
                    })
                }
            })
       break;  
           
        }

    }
  
})

router.post('/deactivateUser', (req, res) => {
    let obj = {
        type: req.body.type,
        _id: req.body._id
    }
    if(obj.type === 'auctioneer')
    {
        Auctioneer.deleteUser(obj._id, (err, result)=> {
            if(err)
            {
                return res.json({
                    success:false,
                    msg:'Somthing Went Wrong'
                })
            }
            else {    return res.json({
                success:true,
                msg:'deactiavted'
            })

            }
        })

    }
    else {
        Bidder.deleteUser(obj._id, (err, result)=> {
            if(err)
            {
                return res.json({
                    success:false,
                    msg:'Somthing Went Wrong'
                })
            }
            else {    return res.json({
                success:true,
                msg:'deactiavted'
            })

            }
        })

    }
   
})


module.exports = router;