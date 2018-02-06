var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngAnimate', 'angularUtils.directives.dirPagination']);

/// Routes ///
myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'HomeController as hc',
    }).when('/directory/therapists/:id', {
      templateUrl: '/views/templates/profile.html',
      controller: 'ProfileController as pc'
    }).when('/directory/therapists/:id/appointment', {
      templateUrl: '/views/templates/appointment.html',
      controller: 'ProfileController as pc'
    }).when('/appointment', {
        templateUrl: '/views/templates/appointment.html',
        controller: 'AppointmentController as ac'   
    }).when('/schedule', {
      templateUrl: '/views/templates/schedule.html',
      controller: 'ScheduleController as sc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    }) 
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/search', {
      templateUrl: '/views/templates/search.html',
      controller: 'SearchController as sc'
    })
    .when('/directory', {
      templateUrl: '/views/templates/directory.html',
      controller: 'DirectoryController as dc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});
