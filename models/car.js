var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
 

//Create a schema
var Car = new Schema({
 vin: {
    type: String,
    
  },
  images: {
    type: String,
    
  },
  comments: String,
  
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  },
  
});



//Auto set the modified date prior to save
Car.pre('save', function(next){
  this.modified = new Date().toISOString();
  next();
});



module.exports  = mongoose.model('Car', Car);