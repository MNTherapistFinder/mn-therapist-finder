myApp.controller('DirectoryController', function(DirectoryService) {
    console.log('DirectoryController created');
    var vm = this;
    vm.getTherapistInfo = DirectoryService.getTherapistInfo;
    vm.therapistInfo = DirectoryService.therapistInfo;
    vm.showTherapistInfo = DirectoryService.showTherapistInfo;
    vm.getTherapistModalInfo = DirectoryService.getTherapistModalInfo;
    vm.therapistModalInfo = DirectoryService.therapistModalInfo;
    vm.close = DirectoryService.close;

    
    DirectoryService.getTherapistInfo();
  });
  