const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authJwt = require('../config/jwt');
const CheckUpdate=  require('./checkUpdate/checkUpdate')
const Admin = require('../models/admin')



router.post('/password', (req, res) => {

    let authenticatePassword = {
        password : req.body.passwordFilled,
        hashed: req.body.currentPassword,
        type: req.body.type
    
    }
    console.log(authenticatePassword)
    if(authenticatePassword.type === 'admin')
    {
        Admin.comparePassword(authenticatePassword.password, authenticatePassword.hashed, (err, isMatch) =>  {
            console.log(isMatch)

                if(err)
                {
                    res.json(
                        { success:false, 
                            msg:"unkown error"});
                }
                
                 if(isMatch)
                 {
                    return res.json({
                        success:true
                    })
                 }
                 else{
                    return res.json({
                        success:false,
                        msg:'Incorrect Password continue with Password Forget '
                    })
                 }
            })

    }else {
        User.comparePassword(authenticatePassword.password, authenticatePassword.hashed, (err, isMatch) =>
            {

                console.log('user', isMatch)

                if(err)
                {
                    res.json(
                        { success:false, 
                            msg:"unkown error"});
                }
                
                 if(isMatch)
                 {
                    return res.json({
                        success:true
                    })
                 }
                 else{
                    return res.json({
                        success:false,
                        msg:'Incorrect Password continue with Password Forget '
                    })
                 }
            })
        
    }

})

router.post('/updateProfile', (req, res) => {
    
    let dataToBeUpdated = {
        id: req.body.id,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        username:req.body.username,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password,
        passwordChanged:req.body.passwordChanged,
        userType:req.body.userType

    }

console.log('userType', dataToBeUpdated.userType )
    if(dataToBeUpdated.userType === 'Admin')
    {
     Admin.updateAdminProfile(dataToBeUpdated, (err) => {
       if(err)
       {
        return res.json({
            success:false,
            msg:'Something went wrong'
        })
       }
       else {
        return res.json({
            success:true,
            msg:'Update Succesfull'
        })
       }
     })
    }
    else {
        console.log(dataToBeUpdated)
        User.updateUserProfile(dataToBeUpdated, (err) => {
            if(err)
            {
             return res.json({
                 success:false,
                 msg:'Something went wrong'
             })
            }
            else {
             return res.json({
                 success:true,
                 msg:'Update Succesfull'
             })
            }
          })
    }
})
router.post('/phone', (req,res) => {
    let dataReceived = {
        phonenumber:req.body.phonenumber,
        type:req.body.type
    }
    dataReceived.phonenumber =  (dataReceived.phonenumber).substring(1);
    dataReceived.phonenumber =      '+251' + dataReceived.phonenumber;

   if(dataReceived.type === 'user')
   {
       User.findOneByPhone(dataReceived.phonenumber, (err, result) => {
        console.log(result)
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
    Admin.findOneByPhone(dataReceived.phonenumber, (err, result) => {
        console.log(result)
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
router.post('/changePassword', (req, res) => {
    let data = {
        password:req.body.password,
        type: req.body.type,
        id:req.body.id
    }
    if(data.type === 'user')
    {
         User.changePassword(data, (err, result) => {
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
    else {
        Admin.changePassword(data, (err, result) => {
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
module.exports = router;