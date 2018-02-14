myApp.controller('DirectoryController', function(DirectoryService) {
    var vm = this;
    vm.getTherapistInfo = DirectoryService.getTherapistInfo;
    vm.therapistInfo = DirectoryService.therapistInfo;
    vm.showTherapistInfo = DirectoryService.showTherapistInfo;
    vm.getTherapistModalInfo = DirectoryService.getTherapistModalInfo;
    vm.therapistModalInfo = DirectoryService.therapistModalInfo;
    vm.close = DirectoryService.close;

    vm.openLeftMenu = DirectoryService.openLeftMenu;
    // vm.startOpen = DirectoryService.startOpen;
    
    DirectoryService.getTherapistInfo();
  });
  