'use strict';

angular.module('psychoreg')

    .controller('ChildrenController', ['$scope','AuthService', 'Child', function($scope, AuthService, Child) {

        $scope.showChildren = false;
        $scope.message = "Loading ...";
        $scope.children = [];
        //console.log('ChildrenController-AuthService.getUsernameId():' + AuthService.getUsernameId());

        // I can't make this damned where clause work! :(
        //$scope.children = Child.find({ where: {idPsycho: {eq: AuthService.getUsernameId()}}});

        Child.find()
        .$promise.then(
        function (response) {
            for (var i = response.length - 1; i >= 0; i--) {
                console.log(response[i].idPsycho + '_' + AuthService.getUsernameId());
                if (response[i].idPsycho == AuthService.getUsernameId()){
                    $scope.children.push(response[i]);
                }
            }
            $scope.showChildren = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
            if (response.status == 401){
                $scope.message = $scope.message + '. Please log in.';
            }
        });
    }])

    .controller('ChildController', ['$scope', '$stateParams', '$location', '$state', 'Customer', 'Child', 'Behaviour', 'AuthService', 'ngDialog', function($scope, $stateParams, $location, $state, Customer, Child, Behaviour, AuthService, ngDialog) {

        $scope.child = {firstName:"", lastName:"", sex:"Boy", birthDate:"", disorder:"Sleep", comments:""};
        $scope.disorders = ["Sleep", "Eating", "Encopresis"];

        if($stateParams.id){
        Child.findById({id: $stateParams.id})
        .$promise.then(
            function (response) {
                $scope.child = response;
                $scope.showChild = true;
                $scope.child.birthDate = new Date($scope.child.birthDate);
                $scope.child.behaviours = Behaviour.find({ filter: { where: { childrenId: $stateParams.id } } });
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
                console.log("Error: " + response.status + " " + response.statusText);
            }
        );
        }

        $scope.addChild = function(){
          $scope.child.date = new Date().toISOString();
          if(!$scope.child.token){
            $scope.child.token = Math.random().toString(36).substr(2);
          }
          if(!$scope.child.idPsycho){
            $scope.child.idPsycho = AuthService.getUsernameId();
          }
          console.log('Child:' + JSON.stringify($scope.child));
          Child.upsert($scope.child);
/*          Customer.findById({id: AuthService.getUsernameId()})
            .$promise.then(
                function (response) {
                    var customer = response;
                    customer.tokens.push($scope.child.token);
                    console.log('Customer:' + JSON.stringify(customer));
                    Customer.prototype.updateAttributes({id: AuthService.getUsernameId(), tokens : customer.tokens});
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                    console.log("Error: " + response.status + " " + response.statusText);
                }
            );*/
        }

        $scope.doDelete = function(){
          console.log('Deleting ' + $scope.child.id);
          Child.destroyById({id: $scope.child.id});
          $state.go('^.children', {}, {reload: true});
        }

        $scope.workInProgress = function(){
            var message = '\
                <div class="ngdialog-message">\
                <div><h3>Work in progress</h3></div>' +
                  '<div><p> Sorry, this does not work yet</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'

            ngDialog.openConfirm({ template: message, plain: 'true'});
        }
    }])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthService', '$localStorage', function ($scope, $state, $rootScope, ngDialog, AuthService, $localStorage) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(AuthService.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthService.getUsername();
    }
    else
    {
        var loginData = $localStorage.getObject('userinfo','{}');
        if (loginData){
            AuthService.login(loginData);
        }
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       AuthService.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthService.isAuthenticated();
        $scope.username = AuthService.getUsername();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthService.isAuthenticated();
        $scope.username = AuthService.getUsername();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthService', function ($scope, ngDialog, $localStorage, AuthService) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthService.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthService', function ($scope, ngDialog, $localStorage, AuthService) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {

        AuthService.register($scope.registration);
        
        ngDialog.close();

    };
}])
;