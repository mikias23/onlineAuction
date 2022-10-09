const mongoose = require('mongoose');


const locationSchema = mongoose.Schema({
     city:{
        type: String,
        required: true
    },
     name:{
       type: String,
       required: true
      }
});

const Location = module.exports = mongoose.model('Location', locationSchema);

module.exports.addLocation= function(newLocation, callback){

 newLocation.save(callback);
};

module.exports.getLocations = function(callback)
{
     Location.find({}, callback);
}
module.exports.deleteLocation = function(id, callback)
{

     Location.deleteOne({_id:id}, callback)
}
module.exports.deleteLocationByCityName = function(city, callback)
{
     Location.deleteMany({city:city}, callback);
}
