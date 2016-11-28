app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider.state('contact',{
		url:'/contact',
		templateUrl:'/js/m-contact/contact.html',
		resolve:{
			contacts: function(Session, AuthService, ContactFactory){
				return AuthService.getLoggedInUser()
					.then(function(result){
						return ContactFactory.getAll(Session.user.id);
					})
			}
		},
		controller: function($scope, contacts, ContactFactory, Session){
			$scope.contacts = contacts;
			$scope.show = Array($scope.contacts.length).fill(false);


			$scope.delete = function(id){
				ContactFactory.kill(id, Session.user.id);
			}

			$scope.edit = function(id, index){
				$scope.show[index] = true;
			}

			$scope.change = function(contact, index){
				$scope.show[index] = false;
				ContactFactory.change(contact, Session.user.id);
			}
		}
	})

})