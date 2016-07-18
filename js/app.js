var module = angular.module('TamHuynhWebsite', ['ui.bootstrap', 'ngAnimate', 'ngRoute', 'ngMaterial'])

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
      templateUrl: 'templates/contact_mobile.html',
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

module.run(['$rootScope', function($rootScope) {
  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      if (current.hasOwnProperty('$$route')) {
          $rootScope.title = current.$$route.title;
      }
  });
}]);

module.factory('mdbottomSheetWrapper', ['$mdBottomSheet', function($mdBottomSheet) {
  var isOpen = false;

  var bottomSheetOption = {
    controller: 'ContactController',
    templateUrl: './templates/contact.html',
    parent: angular.element(document.querySelector('body'))
  };

  return {
    show: function() {
      return $mdBottomSheet.show(bottomSheetOption);
    },
    hide: function() {
      return $mdBottomSheet.hide();
    },
    setIsOpen: function(param) {
      isOpen = param;
    },
    getIsOpen: function() {
      return isOpen;
    }
  };
}]);

module.controller('MainController', function($scope, $mdSidenav, $location, $window, mdbottomSheetWrapper) {
  $scope.toggleSideNav = function() {
    $mdSidenav('left-sidenav').toggle();
  };

  $scope.changeView = function(view){
    $location.path(view);
  };

  $scope.toggleContact = function() {
    if ($window.innerWidth < 960) {
      $location.path('contact');
    } else {
      mdbottomSheetWrapper.show();  
    }
  }
});

module.controller('ProfileController', function($scope) {
  $scope.message = 'Profile';
});

module.controller('EducationController', function($scope) {
  $scope.message = 'Education';
});

module.controller('ExperienceController', function($scope, $timeout) {
  $scope.message = 'Experience';
  
  $scope.skillList = [
    { title:'Mobile Development',
      content: [
        { name: 'Android', maxValue: 50, currentValue: 0 },
        { name: 'UWP/Windows 10', maxValue: 60, currentValue: 0 }
      ]
    },
    { title:'Web Framework',
      content: [
        { name: 'Django', maxValue: 50, currentValue: 0 },
        { name: 'ASP.NET MVC', maxValue: 40, currentValue: 0 }
      ]
    },
    { title:'Frontend Framework',
      content: [
        { name: 'AngularJS', maxValue: 40, currentValue: 0 },
        { name: 'JQuery', maxValue: 30, currentValue: 0 }
      ]
    },
    { title:'Programming Language',
      content: [
        { name: 'Python', maxValue: 60, currentValue: 0 },
        { name: 'C#', maxValue: 70, currentValue: 0 },
        { name: 'Java', maxValue: 50, currentValue: 0 }
      ]
    },
  ];

  $timeout(function() {
    $scope.skillList.forEach(function(skillset) {
      skillset.content.forEach(function(skill) {
        skill.currentValue = skill.maxValue;
      });
    });
  }, 50);
});

module.controller('ContactController', function($scope, $location, $window, mdbottomSheetWrapper) {
  $scope.contacts = [
    { title:'Phone', 
      content: [
        { name: 'Phone', icon:'phone', content:'+84-936471994', color:'#60F654', action:'tel:', action_suffix:'' }
      ]
    },
    { title:'Email', 
      content: [
        { name: 'Outlook', icon:'envelope-o', content:'tamhuynh.msp@outlook.com', color:'#0073C6', action:'mailto:', action_suffix:'', extra_param: "_self" },
        { name: 'Gmail', icon:'envelope-o', content:'tamhuynh0407@gmail.com', color:'#D70000', action:'mailto:', action_suffix:'', extra_param: "_self" }
      ]
    },
    { title:'Social', 
      content: [
        { name: 'Skype', icon:'skype', content:'tamhuynh.0407', color:'#01A6E5', action: 'skype:', action_suffix:'?chat' },
        { name: 'Linkedin', icon:'linkedin-square', content:'http://www.linkedin.com/in/tamhuynhit', color:'#007BB6', action: '', action_suffix:'' },
        { name: 'Github', icon:'github', content:'http://www.github.com/tam0407', color:'#0D2636', action: '', action_suffix:'' }
      ]
    }
  ];

  $window.onresize = function() {
    if ($window.innerWidth >= 960) {
      if (!mdbottomSheetWrapper.getIsOpen()) {
        mdbottomSheetWrapper.show();
        $location.path('profile');
        mdbottomSheetWrapper.setIsOpen(true);
      }
    } else {
      if (mdbottomSheetWrapper.getIsOpen()) {
        mdbottomSheetWrapper.hide();
        $location.path('contact');
        mdbottomSheetWrapper.setIsOpen(false);
      }
    }
  };

  $scope.performContact = function(item) {
    // if (item.type == 'mail') {
    //   $window.open("mailto:" + item.content, "_self");
    // } else if (item.type == 'phone') {
    //   $window.open("tel:" + item.content);
    // } else if (item.type == 'skype') {
    //   $window.open("skype:" + item.content + "?chat");
    // } else if (item.type == 'link') {
    //   $window.open(item.content);
    // }
    $window.open(item.action + item.content + item.action_suffix, item.extra_param);
    mdbottomSheetWrapper.hide();
  }
});
