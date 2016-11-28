app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('card', {
		url: '/card/:status',
		templateUrl: '/js/sendcard/Mcard.html',
		resolve: {
			emails: function(CardFactory, AuthService, Session, $timeout, $stateParams) {
				return AuthService.getLoggedInUser()
					.then(function(result){
						Session.user = result;
						console.log ('aaa');
						if($stateParams.status === "all"){
							return CardFactory.getEmails(Session.user.id);
						}

						if($stateParams.status === "sent"){
							return CardFactory.getSentEmails(Session.user.id);
						}

						if($stateParams.status === "pending"){
							return CardFactory.getPendingEmails(Session.user.id);
						}
					});
			},
			contacts: function(Session, AuthService, ContactFactory){
				return AuthService.getLoggedInUser()
					.then(function(result){
						return ContactFactory.getAll(Session.user.id);
					})
			},
		},
		controller: function(CardFactory, $scope, $state, Session, emails, $stateParams, contacts) {		
			// console.log(Session.user.id);
			$scope.emails = emails;
			// console.log($scope.emails);
			// console.log("state params are");
			// console.log($stateParams);
			$scope.contacts = contacts;

			$scope.newEmail = {};

			$scope.newEmail.fromWhom = Session.user.firstName + ' ' + Session.user.lastName;

			// console.log($scope.contacts);

			$scope.sentStatus = $stateParams.status == "sent" ? true: false;

			$scope.selection=[];
			$scope.toggleSelection= function (item, index){
				var idx = $scope.selection.findIndex(function(element){
					return element.id == item.id;
				})

				if(idx > -1){
					$scope.selection.splice(idx,1);
				} 
				else{
					item.gIndex = index;
					$scope.selection.push(item);
				}

				console.log(item.id);
				console.log($scope.selection.length);

			}


			$scope.show = Array($scope.emails.length).fill(false);


			$scope.goofy = {name: "goofy"};
			$scope.donald = {name: "donald"};

			$scope.canSendAll = true;

			$scope.searchEmail = function(){
				$state.go('card',{'status':'sent', 'search':$scope.search.email})
			}

			$scope.copyLast = function(){
				$scope.newEmail = Object.assign({},Session.lastEmail);
			}

			$scope.copy = function(email){
				$scope.newEmail = Object.assign({},email);
			}
			
			$scope.submitEmail = function(){
				Session.lastEmail = Object.assign({},$scope.newEmail);
				CardFactory.submitEmail($scope.newEmail, Session.user.id, $stateParams.status)
					.then(function(kkk){
						$scope.newEmail = null;
					})
			};

			$scope.kill = function(emailId){
				CardFactory.kill(emailId,Session.user.id, $stateParams.status);
			};

			$scope.edit = function(index){
				$scope.show[index] = true;
				$scope.canSendAll = false;				
			};

			$scope.submitChanges = function(email, index){
				$scope.show[index] = false;
				CardFactory.changeEmail(email);
				if ($scope.show.indexOf(true) == -1){
					$scope.canSendAll = true; 
				}

			};


			$scope.sendEmail = function(email, index){
				emailjs.send('default_service', email.template,{
					email: email.emailAddress, 
					toWhom: email.toWhom,
					fromWhom: email.fromWhom,
					reason: email.reason, 
				});
				CardFactory.sentEmail(email.id, Session.user.id, $stateParams.status);
			};

			$scope.sendAllEmails = function(emails){
				for (let i = 0; i< emails.length; i++){
					if (!emails[i].isSent){
						$scope.sendEmail(emails[i],i);
					}
				}
			};

			$scope.sendAllSelectedEmails = function(){
				for (let i = 0; i<$scope.selection.length; i++){
					if (!$scope.selection[i].isSent){
						$scope.sendEmail($scope.selection[i], $scope.selection[i].gIndex);
					}
				}
			}


			$scope.sentEmailOnly = function(){
				$state.go('card',{'status':'sent'});
			}

			$scope.allEmails = function(){
				$state.go('card',{'status':'all'});
			}

			$scope.pendingEmailOnly = function(){
				$state.go('card',{'status':'pending'});
			}
		}
	})
	

})