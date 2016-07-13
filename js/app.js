var module = angular.module('TamHuynhWebsite', ['ngAnimate', 'ngRoute', 'ngMaterial'])

module.config(function ($routeProvider, $mdThemingProvider) {
  $routeProvider
    .when('/profile', {
      templateUrl: 'templates/profile.html',
      controller: 'ProfileController',
      title: 'Profile'
    })
    .when('/education', {
      templateUrl: 'templates/education.html',
      controller: 'EducationController',
      title: 'Education'
    })
    .when('/experience', {
      templateUrl: 'templates/experience.html',
      controller: 'ExperienceController',
      title: 'Experience'
    })
    .when('/contact', {
      templateUrl: 'templates/contact.html',
      controller: 'ContactController',
      title: 'Contact'
    })
    .otherwise({
      redirectTo: '/profile'
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('red');
});

module.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (current.hasOwnProperty('$$route')) {
            $rootScope.title = current.$$route.title;
            // $('.button-collapse').sideNav('hide');
        }
    });
}]);

module.controller('MainController', function($scope, $mdSidenav, $location) {
  $scope.toggleSideNav = function() {
    $mdSidenav('left-sidenav').toggle();
  };

  $scope.changeView = function(view){
    $location.path(view); // path not hash
  };
});

module.controller('ProfileController', function($scope) {
  $scope.message = 'Profile'
});

module.controller('EducationController', function($scope) {
  $scope.message = 'Education'
});

module.controller('ExperienceController', function($scope) {
});

module.controller('ContactController', function($scope) {
});
