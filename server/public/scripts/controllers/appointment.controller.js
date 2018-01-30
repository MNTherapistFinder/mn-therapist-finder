myApp.controller('AppointmentController', ['$http', '$mdDialog','$mdMedia', function ($http, $mdDialog, $mdMedia) {
    console.log('AppointmentController loaded');
    var self = this;
    self.appointment = []
    self.$mdMedia = $mdMedia;
    self.$mdDialog = $mdDialog;

    self.getAppointment = function () {
      console.log('get appointment hit');
      $http.get('/schedule').then(response => {
          self.appointment = response.data
          console.log('this is self.appointment before for loop', self.appointment)
          for (var i = 0; i < self.appointment.length;i++){
            console.log('inside for loop')
            self.appointment[i].available_times = moment(self.appointment[i].available_times).format('LLL');
          }
          console.log('response is ', self.appointment) 

      });
  }
  self.getAppointment()
  
  self.appointmentForm = function (date) {
    console.log(date.available_times)
    var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs')) && this.customFullscreen;
    this.$mdDialog.show({
        controller: function ($scope, $mdDialog, date, $http) {
            $scope.patient = {};
            $scope.patient.date = date.available_times;
            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
              
            };
            $scope.emailRequest = function(patient) {
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



  }]);
 