app.factory('ContactFactory', function($http){
	var contacts = [];
	var ContactFactory = {};

	ContactFactory.getAll = function(id){
		return $http.get('/api/contact/' + id)
			.then(function(result){
				angular.copy(result.data, contacts);
				return contacts;
			})
	}

	ContactFactory.kill = function(id, userId){
		return $http.delete('/api/contact/' + id)
			.then(function(result){
				return ContactFactory.getAll(userId);
			})
	}

	ContactFactory.change = function(contact, userId){
		return $http.put('/api/contact', contact)
			.then(function(result){
				return ContactFactory.getAll(userId);
			})
	}

	return ContactFactory;
})