myApp.service('DirectoryService', function ($http, $location, $mdDialog, $mdSidenav, $mdMedia) {
  console.log('DirectoryService Loaded');
  var self = this;

  self.therapistInfo = { list: [] }

  // GET request for therapist information on main directory page
  self.getTherapistInfo = function () {
    console.log('in getTherapistInfo');

    $http({
      method: 'GET',
      url: '/directory/therapistinfo'
    }).then(function (response) {
      console.log('response from getTherapistInfo', response);
      self.therapistInfo.list = response.data;
    });
  } 


  self.showTherapistInfo = function(event) {
    console.log('showTherapistInfo clicked');
    $mdDialog.show({
      parent: angular.element(document.body),
      templateUrl: '/views/partials/therapist.modal.html',
      controller: 'ModalController as mc',
      targetEvent: event,
      clickOutsideToClose:true,
      fullscreen: self.customFullscreen,
      locals: {
        modalData:{
          event: event
        }
      }

    })};

  
  self.close = function() {
    $mdDialog.cancel();
  };

  self.closeToLogin = function() {
    $mdDialog.cancel();
    $location.path('/login');

  };
  

  self.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

  // self.startOpen = $mdMedia('gt-sm');

});

