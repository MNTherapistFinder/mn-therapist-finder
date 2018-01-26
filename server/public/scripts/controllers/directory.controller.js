myApp.controller('DirectoryController', function(DirectoryService) {
    console.log('DirectoryController created');
    var vm = this;
    vm.getTherapistInfo = DirectoryService.getTherapistInfo;
    vm.therapistInfo = DirectoryService.therapistInfo;

    
    DirectoryService.getTherapistInfo();
  });
  