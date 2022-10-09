const fs= require('fs');
const path = require('path');
const Auctions = require('../../models/auctions') 
const updateInterval = require('./test/updateInterval.json')


module.exports.CheckForUpdate = async function()
{  
  let currentDate = new Date().getTime(), lastUpdatedDate = updateInterval.lastUpdatedDate, auctionsExpired = new Array(), expiredAuctionsId = new Array();

    
   if(currentDate > lastUpdatedDate)
   {
      console.log(lastUpdatedDate)
    let obj = {
      interval: 10,
      lastUpdatedDate: currentDate
    }
     fs.writeFile(
      path.join(__dirname, '/test', 'updateInterval.json'), JSON.stringify(obj),(err, data) => {
        return res.json({
          success:false,
          msg:'something Went Wrong'
      })
     })
      }
 }
 

    
       
