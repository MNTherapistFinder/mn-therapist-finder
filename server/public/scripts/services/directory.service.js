myApp.service('DirectoryService', function ($http, $location, $mdDialog, $mdSidenav, $mdMedia) {
  console.log('DirectoryService Loaded');
  var self = this;

  self.therapistInfo = { list: [] }
  self.therapistProfileInfo = { list: [] }
  self.therapistAppointments = { list: [] }
  // self.dayOneAppts = []

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
            self.therapistAppointments.list[i].available_times = moment(self.therapistAppointments.list[i].available_times).format('LLLL');
          }
          console.log('get TherapistAppts response is ', self.therapistAppointments.list) 

      }).then(function (){
        self.dateCompare();

      });
    } 



self.dateCompare = function(){
  
  for (var j = 0; j < self.therapistAppointments.list.length; j++){
    var therapistApptDate = moment(self.therapistAppointments.list[j].available_times).format('dddd MMM Do')
    // console.log('self.therapistAppointments.list[j].available_times',therapistApptDate );

    for (var i = 0; i < self.days.length; i++) {
      var dayDate = self.days[i].date
      // console.log('self.days[i]', dayDate);

      if (therapistApptDate === dayDate) {
        console.log('therapistApptDate', therapistApptDate);
              self.days[i].apptArray.push(moment(self.therapistAppointments.list[j].available_times).format('LT'))
              self.days[i].apptArray.reverse()
              
              console.log('in push dayOneAppts', self.days[i].apptArray);         

            } 
    }

  } 
 
}




self.appointmentForm = function (date, therapist_email) {
      console.log(date.available_times)
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && self.customFullscreen;
      $mdDialog.show({
          controller: function ($scope, $mdDialog, date, $http) {
              $scope.patient = {};
              $scope.patient.therapist_email = therapist_email
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


  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth(); //January is 0!
  var yyyy = today.getFullYear();

  var dayOne = { dd: dd, mm: mm, yyyy: yyyy };
  var dayTwo = {dd: dd + 1, mm: mm, yyyy: yyyy };
  var dayThree = {dd: dd + 2, mm: mm, yyyy: yyyy }
  var dayFour = {dd: dd + 3, mm: mm, yyyy: yyyy };

  self.days = [ {
                  date: moment(dayOne).format("dddd MMM Do"),
                  apptArray: []
                }, 
                {
                  date: moment(dayOne).add(1, 'days').format("dddd MMM Do"),
                  apptArray: []
                }, 
                {
                  date: moment(dayOne).add(2, 'days').format("dddd MMM Do"),
                  apptArray:[]
                },
                {
                  date: moment(dayOne).add(3, 'days').format("dddd MMM Do"),
                  apptArray: []},
                {
                  date: moment(dayOne).add(4, 'days').format("dddd MMM Do"),
                  apptArray: []
                }]


  self.dayOneAppts = [];

  // for (var i = 0; i < self.days.length; i++) {
  //   console.log('self.days[i]', self.days[i]);

  // }

  console.log('self.therapist.list',self.therapistAppointments);

  
  // for (var j = 0; j < self.therapistAppointments.list.length; j++){
  //   console.log('self.therapistAppointments.list[j].available_times',[j]);
    
  // }


  // self.getApptDays = function(){
  //   console.log('inGetApptDays');
  //   console.log('self.days', self.days);
  //   console.log('self.therapistAppointments.list', self.therapistAppointments);
  //   // console.log('dayOneAppts', self.dayOneAppts);
    
    
  //   var dayOneAppts = []
  //   for (var i = 0; i < self.days.length; i++) {
  //     var dayOneAppts = []
  //     var dayMomentified = moment(self.days[i]).format('MMM Do YY');
  //     console.log('momentified self.days', dayMomentified);
  
       
  //     for (var j = 0; j < self.therapistAppointments.list.length; j++) {
  //       var apptMomentified = moment(self.therapistAppointments.list[j].available_times).format('MMM Do YY');
  //       console.log('momentified self.therapistappts', apptMomentified);
        
  //       if (dayMomentified == apptMomentified ) {
          
  //       dayOneAppts.push(apptMomentified)
  //       console.log('in push', dayOneAppts);
        
  //       }
  //       }
  //   } return self.dayOneAppts;

  // }
  
  

  

  // self.days = 
  // [{ dd: dd, mm: mm, yyyy: yyyy }, 
  // {dd: dd + 1, mm: mm, yyyy: yyyy }, 
  // {dd: dd + 2, mm: mm, yyyy: yyyy }, 
  // {dd: dd + 3, mm: mm, yyyy: yyyy }];





});

