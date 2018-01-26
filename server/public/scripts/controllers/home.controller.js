myApp.controller('HomeController', function(HomeService) {
    console.log('HomeController created');
    var vm = this;

    vm.searchIssues = HomeService.searchIssues;
    vm.issues = HomeService.issues;
    vm.selectedItemChange = HomeService.selectedItemChange;
    vm.searchTextChange   = HomeService.searchTextChange;


    HomeService.searchIssues();
  });
  