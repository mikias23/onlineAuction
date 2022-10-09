const mongoose = require('mongoose');


const citySchema = mongoose.Schema({
     city:{
        type: String,
        required: true
    },
     cityImagePath:{
       type: String,
       required: true
      }
});

const City = module.exports = mongoose.model('City', citySchema);

module.exports.addCity= function(newCity, callback){
console.log(newCity, 'sdsdsdsdsm')
 newCity.save(callback);
};

module.exports.getCities = function(callback)
{
     City.find({}, callback);
}


module.exports.deleteCity = function (id, callback)
{
  City.deleteOne({_id:id}, callback)
}
module.exports.removeAll = function(callback)
{
City.deleteMany({}, callback);
}