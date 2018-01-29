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
  
  self.appointmentForm = function (slot) {

    var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs')) && this.customFullscreen;
    this.$mdDialog.show({
        controller: function ($scope, $mdDialog, slot) {
            $scope.customer = {};
            $scope.customer.slot = slot;
            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        },
        templateUrl: '../views/partials/appointmentRequest.html',
        locals: {
            slot: slot
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
 