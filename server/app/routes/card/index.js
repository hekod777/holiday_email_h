const express = require('express');
const router = express.Router();
const User = require('../../../db').models.user;
const Email = require('../../../db').models.email;
const Contact = require('../../../db').models.contact;


router.get('/sent/:id', function(req,res,next){
	Email.findAll({
		where:{
			userId: req.params.id,
			isSent: true,
		}
	})
		.then(function(results){
			res.send(results);
		})
		.catch(next);
})

router.get('/pending/:id', function(req,res,next){
	Email.findAll({
		where:{
			userId: req.params.id,
			isSent: false,
		}
	})
		.then(function(results){
			res.send(results);
		})
		.catch(next);
})


router.get('/:id', function(req, res, next){
	Email.findAll({
		where:{
			userId: req.params.id
		}
	})
		.then(function(results){
			res.send(results);
		})
		.catch(next);
});


// router.post('/:id', function(req,res,next){
// 	Email.create({
// 		emailAddress:req.body.emailAddress,
// 		toWhom: req.body.toWhom,
// 		fromWhom: req.body.fromWhom,
// 		reason: req.body.reason,
// 		userId: req.params.id,
// 		template: req.body.template,
// 	})
// 		.then(function(result){
// 			res.send(result)
// 		})
// 		.catch(next);
// })


router.post('/:id', function(req,res,next){
	console.log(req.body.emailAddress);
	Contact.findOrCreate({
		where:{
			emailAddress: req.body.emailAddress,
		},
		defaults:{
			toWhom: req.body.toWhom,
			userId: req.params.id,
		}

	})
		.then (function(){
			Email.create({
				emailAddress:req.body.emailAddress,
				toWhom: req.body.toWhom,
				fromWhom: req.body.fromWhom,
				reason: req.body.reason,
				userId: req.params.id,
				template: req.body.template,
			})
				.then(function(result){
					res.send(result)
				})
		})
		.catch(next);
})




router.delete('/:id', function(req, res, next){
	Email.destroy({
		where:{
			id: req.params.id
		}
	})
		.then(function(){
			res.sendStatus(200);
		})
		.catch(next);
})


router.put('/:id', function(req, res, next){
	Email.update({
		emailAddress: req.body.emailAddress,
		toWhom: req.body.toWhom,
		fromWhom: req.body.fromWhom,
		reason: req.body.reason,
	},{
		where:{
			id: req.params.id
		}
	})
		.then(function(result){
			res.send(result);
		})
		.catch(next);
})


router.put('/sent/:id', function(req,res,next){
	Email.update({
		isSent: true
	},{
		where:{
			id: req.params.id
		}
	})
		.then(function(result){
			res.send(result);
		})
		.catch(next);
})

module.exports = router;