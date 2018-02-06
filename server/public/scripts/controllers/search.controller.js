myApp.controller('SearchController', ['$mdDialog','$mdSidenav','$mdMedia','HomeService', function ( $mdDialog, $mdSidenav, $mdMedia, HomeService) {
    console.log('InfoController created');
    var vm = this;
    vm.message = 'hey'
    vm.searchResults = HomeService.searchResults;

    vm.openLeftMenu = function () {
        $mdSidenav('left').toggle();
    };

    vm.showTherapistInfo = function(event) {
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

}]);
