const express = require('express');
const router = express.Router();
const User = require('../../../db').models.user;
const Contact = require('../../../db').models.contact;


router.get('/:id', function(req,res,next){
	Contact.findAll({
		where:{
			userId: req.params.id,
		}
	})
		.then(function(results){
			res.send(results);
		})
		.catch(next);
})

router.delete('/:id', function(req,res,next){
	Contact.destroy({
		where: {
			id: req.params.id,
		}
	})
		.then(function(result){
			res.sendStatus(200);
		})
		.catch(next);
})

router.put('/', function(req,res,next){
	Contact.update({
		emailAddress: req.body.emailAddress,
		toWhom: req.body.toWhom,
	},{
		where:{
			id: req.body.id
		}
	})
		.then(function(result){
			res.send(result);
		})
		.catch(next);
})


module.exports = router;