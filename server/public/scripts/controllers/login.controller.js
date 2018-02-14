myApp.controller('LoginController', function($http, $location, UserService, $mdDialog) {

    var vm = this;
    vm.truthValue = false;
    vm.user = {
      username: '',
      password: ''
    };
    vm.message = '';

    vm.login = function() {
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Enter your username and password!";
      } else {
        $http.post('/', vm.user).then(function(response) {
          if(response.data.email) {
            vm.user.username = '';
            vm.user.password = '';
            // location works with SPA (ng-route)
            $location.path('/user'); // http://localhost:5000/#/user
          } else {
            vm.message = "Wrong!!";
          }
        }).catch(function(response){
          vm.message = "Wrong!!";
        });
      }
    };

    vm.registerUser = function() {
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Choose a username and password!";
      } else {
        $http.post('/register', vm.user).then(function(response) {
          vm.showRegisterConfirm(event);
          vm.verifyEmail(vm.user.username);
          // $location.path('/home');
        }).catch(function(response) {
          vm.message = "Please try again."
        });
      }
    }

    vm.verifyEmail = function (aParam) {
      vm.truthValue = true

      $http({
          url: '/email/send',
          method: 'GET',
          params: {to: aParam}
      }).then(function(response){
          if (response.data == 'sent'){
              vm.greeting = 'Email has been sent to ' + vm.user.username + '. Please check Inbox!'
          }
      })
  }

  vm.showRegisterConfirm = function(event) {
    $mdDialog.show({
      parent: angular.element(document.body),
      templateUrl: '/views/partials/registerconfirm.modal.html',
      controller: 'ModalController as mc',
      targetEvent: event,
      clickOutsideToClose:false,
      fullscreen: vm.customFullscreen,
      locals: {
        modalData:{
          event: event
        }
      }

    })};

});

myApp.directive('pwCheck', function () {
	return {
		require: 'ngModel',
		link: function (scope, elem, attrs, ctrl) {
			scope.$watch(attrs.pwCheck, function (confirmPassword) {
    			var isValid = ctrl.$viewValue === confirmPassword;
    			ctrl.$setValidity('pwmatch', isValid);
            });
		}
	}
});