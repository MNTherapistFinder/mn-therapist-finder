myApp.controller('ModalController', function(DirectoryService, $routeParams, modalData) {
    console.log('ModalController created');
    var vm = this;

    vm.showTherapistInfo = DirectoryService.showTherapistInfo;
    vm.getTherapistModalInfo = DirectoryService.getTherapistModalInfo;
    vm.therapistModalInfo = DirectoryService.therapistModalInfo
    vm.close = DirectoryService.close;

    vm.closeToLogin = DirectoryService.closeToLogin;


    vm.modalData = modalData;

    
  });
  