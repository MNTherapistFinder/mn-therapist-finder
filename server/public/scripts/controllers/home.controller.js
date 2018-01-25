myApp.controller('HomeController', function(HomeService) {
    console.log('HomeController created');
    var vm = this;

    vm.searchZipCodes = HomeService.searchZipCodes;


  });
  