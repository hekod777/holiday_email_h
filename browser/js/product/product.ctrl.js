//Products controller
app.controller('productCtrl', function($scope,productFactory,products){
	$scope.products = products;
	
	$scope.search = function(item){
		return (angular.lowercase(item.description).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
			angular.lowercase(item.title).indexOf(angular.lowercase($scope.query) || '') !== -1 );
	};

});

//Product Detail controller
app.controller('productDetailCtrl', function($scope, $stateParams,$state,product,ZCartFactory){
	$scope.id = $stateParams.id;
	$scope.product = product;
	$scope.reviews = product.reviews;
	$scope.product.quantity = 1;

	$scope.addInstrument = function(productQty,productId){
		console.log(productQty,productId);
		ZCartFactory.addItem(parseInt(productId),parseInt(productQty));
	};

});

//Product Managment controller
app.controller('productMgmtCtrl', function($scope, products){
	$scope.products = products;

	$scope.changeView = function(num){
		console.log(num);
		$scope.itemsPerPage = num;
	}

});