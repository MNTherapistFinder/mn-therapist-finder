myApp.controller('SearchController', ['$mdDialog', '$mdSidenav', '$mdMedia', '$scope','$routeParams', 'HomeService', function ($mdDialog, $mdSidenav, $mdMedia, $scope,$routeParams, HomeService) {
  console.log('SearchController created');
  var vm = this;
  vm.message = 'hey'
  vm.searchResults = HomeService.searchResults;
  vm.slides = HomeService.slides
  vm.isCarouselView = true

  vm.getSearchResults = HomeService.getSearchResults

  console.log(vm.searchResults);
  vm.openLeftMenu = function () {
    $mdSidenav('left').toggle();
  };

  vm.getSearchResults($routeParams);

  vm.showTherapistInfo = function (event) {
    console.log('showTherapistInfo clicked');
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
 


}]);
