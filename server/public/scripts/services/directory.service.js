myApp.service('DirectoryService', function ($http, $location, $mdSidenav, $mdMedia) {
  console.log('DirectoryService Loaded');
  var self = this;

  self.therapistInfo = { list: [] }

  // GET request for therapist information on main directory page
  self.getTherapistInfo = function () {
    console.log('in getTherapistInfo');

    $http({
      method: 'GET',
      url: '/directory/therapistinfo'
    }).then(function (response) {
      console.log('response from getTherapistInfo', response);
      self.therapistInfo.list = response.data;
    });
  } // end GET request for therapist information on main directory page

  self.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

  // self.startOpen = $mdMedia('gt-sm');

});





// FOR LATER
// function selectedIssuesArray(item){
//   var newIssueArray = []
//   vm.newIssueArray.push(item)
//   return vm.newIssueArray;
// }
