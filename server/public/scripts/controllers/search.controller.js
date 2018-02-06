myApp.controller('SearchController', function(HomeService) {
    console.log('InfoController created');
    var vm = this;
    vm.message = 'hey'
    vm.searchResults = HomeService.searchResults

  });
  