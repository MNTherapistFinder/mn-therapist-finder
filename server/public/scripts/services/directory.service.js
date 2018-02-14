myApp.service('DirectoryService', function ($http, $location, $mdDialog, $mdSidenav, $mdMedia) {
  var self = this;

  self.therapistInfo = { list: [] }
  self.therapistProfileInfo = { list: [] }
  self.therapistAppointments = { list: [] }


  self.patient = {}

  // GET request for therapist information on main directory page
  self.getTherapistInfo = function () {

    $http({
      method: 'GET',
      url: '/directory/therapistinfo'
    }).then(function (response) {
      self.therapistInfo.list = response.data;
    });
  }



  self.getTherapistProfileInfo = function (therapistId) {
    $http({
      method: 'GET',
      url: '/directory/therapistprofileinfo',
      params: therapistId
    }).then(function (response) {
      self.therapistProfileInfo.list = response.data;
    });
  }


  self.showTherapistInfo = function (event) {
    $mdDialog.show({
      parent: angular.element(document.body),
      templateUrl: '/views/partials/therapist.modal.html',
      controller: 'ModalController as mc',
      targetEvent: event,
      clickOutsideToClose: true,
      fullscreen: self.customFullscreen,
      locals: {
        modalData: {
          event: event
        }
      }

    })
  };


  self.getTherapistAppointments = function (therapistId) {

    $http({
      method: 'GET',
      url: '/directory/appointments',
      params: therapistId
    }).then(function (response) {
      self.therapistAppointments.list = response.data;

      for (var i = 0; i < self.therapistAppointments.list.length; i++) {
        self.therapistAppointments.list[i].available_times = moment(self.therapistAppointments.list[i].available_times).format('LLLL');
      }

    }).then(function () {
      self.dateCompare();

    });
  }


  self.dateCompare = function () {

    for (var i = 0; i < self.days.length; i++) {
      dayDate = self.days[i].date
      firstDay = self.days[0].date
      self.days[i].apptArray = []


      for (var j = 0; j < self.therapistAppointments.list.length; j++) {
        therapistApptDate = moment(self.therapistAppointments.list[j].available_times).format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), '')


        if (therapistApptDate === dayDate) {
          self.days[i].apptArray.push({dateTimeThing: moment((self.therapistAppointments.list[j].available_times))})

        }
      }
    };


  }


  self.appointmentForm = function (date, therapist_email, therapist) {
    var date = moment(date, 'LT').format('LLL')
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && self.customFullscreen;
    $mdDialog.show({
      controller: function ($scope, $mdDialog, date, $http) {
        $scope.patient = {};
        $scope.patient.therapist = therapist
        $scope.patient.therapist_email = therapist_email
        $scope.patient.date = date;
        $scope.answer = function (answer) {
          $mdDialog.hide(answer);
        }
        $scope.close = function () {
          $mdDialog.cancel();
        };

        $scope.showApptConfirmModal = function (event) {
          $mdDialog.show({
            templateUrl: '/views/partials/apptRequestConfirm.modal.html',
            controller: "ModalController as mc",
            clickOutsideToClose: true,
            locals: {
              modalData: {
                event: event
              }
            }
          })
        };

        $scope.emailRequest = function (patient) {
          $scope.truthValue = true
          $http({
            url: '/email/appointment',
            method: 'POST',
            data: patient,
          }).then(function (response) {
            if (response.data == 'sent') {
              $scope.showApptConfirmModal();
              $scope.greeting = 'Email reqest has been sent'
            }
          })
        }
      },
      templateUrl: '../views/partials/appointmentRequest.html',
      locals: {
        date: date
      },
      clickOutsideToClose: false,
      fullscreen: useFullScreen
    })
      .then(function (answer) {
        answer.date = answer.slot;
        self.save(answer.date);
      });

  }

  self.close = function () {
    $mdDialog.cancel();
  };

  self.closeToLogin = function () {
    $mdDialog.cancel();
    $location.path('/login');

  };


  self.openLeftMenu = function () {
    $mdSidenav('left').toggle();
  };


  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth(); //January is 0!
  var yyyy = today.getFullYear();

  var dayOne = { dd: dd, mm: mm, yyyy: yyyy };


  self.days = [{
    date: moment(dayOne).format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
    apptArray: []
  },
  {
    date: moment(dayOne).add(1, 'days').format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
    apptArray: []
  },
  {
    date: moment(dayOne).add(2, 'days').format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
    apptArray: []
  },
  {
    date: moment(dayOne).add(3, 'days').format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
    apptArray: []
  },
  {
    date: moment(dayOne).add(4, 'days').format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
    apptArray: []
  },
  {
    date: moment(dayOne).add(5, 'days').format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
    apptArray: []
  },
  {
    date: moment(dayOne).add(6, 'days').format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
    apptArray: []
  },
  {
    date: moment(dayOne).add(7, 'days').format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
    apptArray: []
  },
  {
    date: moment(dayOne).add(8, 'days').format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
    apptArray: []
  },
  {
    date: moment(dayOne).add(9, 'days').format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
    apptArray: []
  },
  {
    date: moment(dayOne).add(10, 'days').format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
    apptArray: []
  },
  {
    date: moment(dayOne).add(11, 'days').format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
    apptArray: []
  },
  {
    date: moment(dayOne).add(12, 'days').format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
    apptArray: []
  },
  {
    date: moment(dayOne).add(13, 'days').format('dddd L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
    apptArray: []
  },
  ]



});

