myApp.controller('ProfileController', function(DirectoryService, $routeParams) {
    console.log('ProfileController created');
    var vm = this;

    vm.getTherapistInfo = DirectoryService.getTherapistInfo;
    vm.therapistProfileInfo = DirectoryService.therapistProfileInfo;
    DirectoryService.getTherapistProfileInfo($routeParams);

    vm.getTherapistAppointments = DirectoryService.getTherapistAppointments;
    vm.therapistAppointments = DirectoryService.therapistAppointments;
    vm.appointmentForm = DirectoryService.appointmentForm;
    vm.patient = DirectoryService.patient;
    vm.answer = DirectoryService.answer;

    DirectoryService.getTherapistAppointments($routeParams);

    vm.days = DirectoryService.days;
    vm.dateCompare = DirectoryService.dateCompare;

    vm.dayOneAppts = DirectoryService.dayOneAppts;

    vm.theDate = DirectoryService.theDate;

    vm.days = DirectoryService.days;


  });
  