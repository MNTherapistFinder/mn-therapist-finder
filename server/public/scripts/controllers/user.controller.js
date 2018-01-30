myApp.controller('UserController', ['$scope', 'UserService', function ($scope, UserService) {
  console.log('UserController created');
  var vm = this;
  vm.therapist = UserService.therapist;
  vm.issues = UserService.issues;
  vm.getTherapist = UserService.getTherapist;
  vm.getIssuesList = UserService.getIssuesList;
  vm.addUserIssue = UserService.addUserIssue;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.client = filestack.init("AfkCNgWSJyFwF5crXkNAVz");

  vm.getTherapist();
  vm.getIssuesList();

  $scope.issueIdToPass = 'hey'

  vm.hello = function (){
    console.log('please work');
  }

  console.log(vm.therapist.list);
  vm.openPicker = function (userPhoto, userid) {
    console.log('in filestack');
    vm.client.pick({
      fromSources: ["local_file_system", "imagesearch", "facebook", "instagram", "dropbox"]
    }).then(function (response) {
      // declare this function to handle response
      console.log(response.filesUploaded[0].url);
    });
  }
}]);
