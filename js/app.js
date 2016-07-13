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
        }
    });
}]);

module.controller('MainController', function($scope, $mdSidenav, $location, $mdBottomSheet) {
  $scope.toggleSideNav = function() {
    $mdSidenav('left-sidenav').toggle();
  };

  $scope.changeView = function(view){
    $location.path(view);
  };

  $scope.toggleContact = function() {
    $mdBottomSheet.show({
      controller: 'ContactController',
      templateUrl: './templates/contact.html',
      parent: angular.element(document.querySelector('body'))
    });
  }
});

module.controller('ProfileController', function($scope) {
  $scope.message = 'Profile';
});

module.controller('EducationController', function($scope) {
  $scope.message = 'Education';
});

module.controller('ExperienceController', function($scope) {
  $scope.message = 'Experience';
});

module.controller('ContactController', function($scope, $mdBottomSheet) {
  $scope.contacts = [
    { title:'Phone', 
      content: [
        { name: 'Phone', icon:'phone', content:'+84-936471994' }
      ]
    },
    { title:'Email', 
      content: [
        { name: 'Outlook', icon:'envelope-o', content:'tamhuynh.msp@outlook.com' },
        { name: 'Gmail', icon:'envelope-o', content:'tamhuynh0407@gmail.com' }
      ]
    },
    { title:'Social', 
      content: [
        { name: 'Skype', icon:'skype', content:'tamhuynh.0407' },
        { name: 'Linkedin', icon:'linkedin-square', content:'www.linkedin.com/in/tamhuynhit' },
        { name: 'Github', icon:'github', content:'www.github.com/tam0407' }
      ]
    }
  ];

  $scope.performContact = function(type) {
    $mdBottomSheet.hide();
  }
});
