'use strict';

angular.module('psychoreg', ['ui.router','ngResource','ngDialog', 'lbServices'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html'
                        //,controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })

            // route for the children page
            .state('app.children', {
                url:'children',
                views: {
                    'content@': {
                        templateUrl : 'views/children.html',
                        controller  : 'ChildrenController'                  
                    }
                }
            })

            // route for the child page
            .state('app.child', {
                url:'child/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/child.html',
                        controller  : 'ChildController'                  
                    }
                }
            })
        
            ;
    
        $urlRouterProvider.otherwise('/');
    })
;
