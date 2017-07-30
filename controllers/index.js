const mongoose = require('mongoose');
const userInf  = mongoose.model('userInf');

//GET
exports.findAllUser = function(req, res) {
  userInf.find(function(err, clinica) {
    if(err) res.status(500, err.message);
    console.log('GET /clinica')
    res.status(200).jsonp(clinica);
  });
};

//GET  with specified ID
exports.findById = function(req, res) {
  userInf.findById(req.params.id, function(err, clinica) {
    if(err) return res.status(500, err.message);
    console.log('GET /clinica/' + req.params.id);
	res.status(200).jsonp(clinica);
  });
};

//POST
exports.addUser = function(req, res) {
  console.log('POST');
  console.log(req.body);

  const users = new userInf({
		name:   req.body.name,
		email:  req.body.email,
		gender: req.body.gender,
		age:    req.body.age
  });
    
  users.save(function(err, clinica) {
    if(err) return res.status(500, err.message);
    res.status(200).jsonp(clinica);
  });
};

//PUT
exports.updateUser = function(req, res) {
  userInf.findById(req.params.id, function(err, userInfo) {
    userInfo.name   = req.body.name;
	userInfo.email  = req.body.email;
	userInfo.gender = req.body.gender;
	userInfo.age    = req.body.age;

    userInfo.save(function(err, Clinica) {
	  if(err) return res.status(500, err.message);
      res.status(200).jsonp(Clinica);
	});
  });
};

//DELETE
exports.deleteUser = function(req, res) {
  userInf.findById(req.params.id, function(err, clinicaInfo) {
    clinicaInfo.remove(function(err) {
      if(err) return res.status(500, err.message);
      res.status(200).send('The user has been removed');
    })
  });
};
