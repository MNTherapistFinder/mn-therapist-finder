myApp.controller('ProfileController', function(DirectoryService, $routeParams) {
    console.log('ProfileController created');
    var vm = this;

    vm.getTherapistInfo = DirectoryService.getTherapistInfo;
    vm.therapistProfileInfo = DirectoryService.therapistProfileInfo;
    DirectoryService.getTherapistProfileInfo($routeParams);
    
  });
  