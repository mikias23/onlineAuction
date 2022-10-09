const multer = require('multer');
const Auctions = require('../models/auctions')

var auctionImageArray = new Array(), imageCity, imageLocation, profilePicPath='', cityImagePath = '';

const storageLocation= multer.diskStorage(
    {
       
        destination:(req, file, cb) => {
          
            cb(null, 'images/auctions')
        },
        filename:(req,file,cb) => {

         const fileName = `${Date.now()}_${file.originalname}`;
         imageLocation = "http://localhost:3000/images/auctions/"+ fileName;
         console.log(imageLocation)
         auctionImageArray.push(imageLocation);

         cb(null, fileName);
        }
    }
)
const storageLocationProfile= multer.diskStorage(
    {
       
        destination:(req, file, cb) => {

            cb(null, 'images/userProfile')
        },
        filename:(req,file,cb) => {

         const fileName = `${Date.now()}_${file.originalname}`;
        
         imageLocation = "http://localhost:3000/images/userProfile/"+ fileName;
         profilePicPath = imageLocation

         cb(null, fileName);
        }
    }
)
const storageLocationCity= multer.diskStorage(
    {
       
        destination:(req, file, cb) => {

            cb(null, 'images/cities')
        },
        filename:(req,file,cb) => {

         const fileName = `${Date.now()}_${file.originalname}`;
        
         imageLocation = "http://localhost:3000/images/cities/"+ fileName;
         cityImagePath = imageLocation
         cb(null, fileName);
        }
    }
)
const upload= multer({storage: storageLocation}).array('images');
const uploadSingle= multer({storage: storageLocationProfile}).single('images');


const uploadSingleCity= multer({storage: storageLocationCity}).single('images');

 module.exports.saveAuction =   function(newAuction)
  {
    console.log(auctionImageArray)
    newAuction.itemImagePath = auctionImageArray;
     auctionImageArray = [];
  const promise = new Promise( function(resolve, reject){
    Auctions.addAuction(newAuction, (err, result) => {  

        if(err)
        {   
         return false;
        }
        else {
        resolve(result)

        }})
  })
  return promise
        
 }

module.exports.getProfilePicPath = () => profilePicPath;
module.exports.getCityPicPath = () => cityImagePath;

module.exports.getAuctionPicPath = () =>
{
    for(let i = 0 ; i < auctionImageArray.length; i++)
    {
      
        return auctionImageArray;
    }

} 
module.exports.emptyAuctionPicPath = () =>
{
    auctionImageArray = [];
}

module.exports.upload = upload;
module.exports.uploadSingle = uploadSingle;
module.exports.uploadSingleCity = uploadSingleCity;