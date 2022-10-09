const mongoose = require('mongoose');


const categorySchema = mongoose.Schema({
     name:{
        type: String,
        required: true
    }
});

const Category = module.exports = mongoose.model('Category', categorySchema);

module.exports.addCategory= function(newCategory, callback){
 newCategory.save(callback);
};

module.exports.getCategory = function(callback)
{
     Category.find({}, callback);
}

module.exports.deleteCategory = function (id, callback)
{    
 const query = {_id: id};
 console.log(query)
  Category.deleteOne(query, callback)
}

module.exports.removeAll = function(callback)
{
Category.deleteMany({}, callback);
}