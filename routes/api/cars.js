var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Car = require('../../models/car');



/* GET a single car. */
router.get('/:vin', function(req,res){

  var vin = req.params.vin;

  Car.findOne({'vin':vin}, function(err, car){

    if(err){
      return res.json({'success':false, 'error': err});
    }

    return res.json({'success':true, 'car': car});

    res.render('cars/view'),{
      'car': car
    }
  });

});

//Create a car
router.post('/', function(req, res) {

  //On create we will only save a title. Model lifecycle hooks and the update
  //method will be used for completing the car
  Car.create(new Car({
    title: req.body.title
  }), function(err, car){
    if(err){
      return res.json({success: false, car: req.body, error: err});
    }

    return res.json({success: true, car: car});
  });

});






module.exports = router;