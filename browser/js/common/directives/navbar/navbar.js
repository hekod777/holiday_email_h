app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, ZCartFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.cart = ZCartFactory.cart;

            scope.items = [
                // { label: 'Home', state: 'home' },
                // { label: 'Products', state: 'product' },
                // { label: 'User Management', state: 'userMgmt', auth: "admin" },
                // { label: 'Product Management', state: 'productMgmt', auth: "admin" },
                // { label: 'Order Management', state: 'orderlist', auth: "admin" },
                // { label: 'My Profile', state: 'userProfile({id: user.id})', auth: "user" },
                { label: 'Holiday Card', state: 'card({status:"all"})', auth:"user"},
                { label: 'Contact Management', state: 'contact', auth:"user"}
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.isAuthorized = function(type) {
                return AuthService.isAuthorized(type);
            }

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
