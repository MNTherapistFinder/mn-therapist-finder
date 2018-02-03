myApp.service('DirectoryService', function ($http, $location, $mdDialog, $mdSidenav, $mdMedia) {
  console.log('DirectoryService Loaded');
  var self = this;

  self.therapistInfo = { list: [] }
  self.therapistProfileInfo = { list: [] }
  self.therapistAppointments = { list: [] }
  self.patient = {}

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



  self.getTherapistProfileInfo = function (therapistId) {
    console.log('in getTherapistProfileInfo');

    $http({
      method: 'GET',
      url: '/directory/therapistprofileinfo',
      params: therapistId
    }).then(function (response) {
      console.log('response from getTherapistProfileInfo', response);
      self.therapistProfileInfo.list = response.data;
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

self.getTherapistAppointments = function (therapistId) {
      console.log('in getTherapistAppointments');
  
      $http({
        method: 'GET',
        url: '/directory/appointments',
        params: therapistId
      }).then(function (response) {
        console.log('response from getTherapistAppointments', response);
        self.therapistAppointments.list = response.data;

        console.log('this is self.therapistAppointments before for loop', self.therapistAppointments.list)
          for (var i = 0; i < self.therapistAppointments.list.length;i++){
            console.log('inside for loop')
            self.therapistAppointments.list[i].available_times = moment(self.therapistAppointments.list[i].available_times).format('LLL');
          }
          console.log('response is ', self.therapistAppointments.list) 

      });
    } 


self.appointmentForm = function (date) {
      console.log(date.available_times)
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && self.customFullscreen;
      $mdDialog.show({
          controller: function ($scope, $mdDialog, date, $http) {
              $scope.patient = {};
              $scope.patient.date = date.available_times;
              $scope.answer = function (answer) {
                  $mdDialog.hide(answer);
                
              };
              $scope.emailRequest = function(patient) {
                console.log('patient', patient);
                $scope.truthValue = true
                $http({
                    url: '/email/appointment',
                    method: 'POST',
                    data: patient,
                }).then(function(response){
                    console.log(response.data);
                    if (response.data == 'sent'){
                        $scope.greeting = 'Email reqest has been sent'
                        console.log(self.greeting);
                    }
                })
              }
          },
          templateUrl: '../views/partials/appointmentRequest.html',
          locals: {
              date: date
          },
          clickOutsideToClose: true,
          fullscreen: useFullScreen
      })
          .then(function (answer) {
              answer.date = answer.slot;
              console.log(answer.date);
              self.save(answer.date);
          });
  
  }



  
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

