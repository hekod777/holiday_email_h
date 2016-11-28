app.factory('CardFactory', function($http, $state){
	var emails = [];
	var CardFactory ={};

	CardFactory.getEmails = function(id){
		return $http.get('/api/card/' + id)
			.then(function(result){
				console.log('bbb');
				angular.copy(result.data, emails);
				return emails;
			})
	}

	CardFactory.getPendingEmails = function(id){
		return $http.get('/api/card/pending/' + id)
			.then(function(result){
				angular.copy(result.data, emails);
				return emails;
			})
	}

	CardFactory.getSentEmails = function(id){
		return $http.get('/api/card/sent/' + id)
			.then(function(result){
				angular.copy(result.data, emails);
				return emails;
			})
	}

	CardFactory.submitEmail = function(newEmail, id, status){
		return $http.post('/api/card/' + id, newEmail)
			.then(function(result){
				if (status == "all"){
					return CardFactory.getEmails(id);
				}
				if (status == "sent"){
					return CardFactory.getSentEmails(id);
				}
				if (status == "pending"){
					return CardFactory.getPendingEmails(id);
				}

			})
	}

	CardFactory.kill = function(emailId, userId, status){
		return $http.delete('/api/card/' + emailId)
			.then(function(result){
				if (status == "all"){
					return CardFactory.getEmails(userId);
				}
				if (status == "sent"){
					return CardFactory.getSentEmails(userId);
				}
				if (status == "pending"){
					return CardFactory.getPendingEmails(userId);
				}
			})
	}

	CardFactory.changeEmail = function(email){
		return $http.put('/api/card/' + email.id, email)
			.then(function(result){

			})
	}

	CardFactory.sentEmail = function(id, userId, status){
		return $http.put('/api/card/sent/' + id)
			.then(function(result){
				if (status == "all"){
					return CardFactory.getEmails(userId);
				}
				if (status == "sent"){
					return CardFactory.getSentEmails(userId);
				}
				if (status == "pending"){
					return CardFactory.getPendingEmails(userId);
				}
			})
	}


	return CardFactory;

})