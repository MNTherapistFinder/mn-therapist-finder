myApp.controller('UserController', ['$scope','$mdSidenav', 'UserService', function ($scope,$mdSidenav, UserService) {
  console.log('UserController created');
  var vm = this;
  vm.therapist = UserService.therapist;
  vm.issues = UserService.issues;
  vm.healthcare = UserService.healthcare;
  vm.specialties = UserService.specialties;
  
  oldest = angular.copy(vm.therapist)

  vm.getTherapist = UserService.getTherapist;
  vm.getIssuesList = UserService.getIssuesList;
  vm.getHealthcareList = UserService.getHealthcareList;
  vm.getSpecialtiesList = UserService.getSpecialtiesList;
  
  vm.deleteUserIssue = UserService.deleteUserIssue;
  vm.deleteHealthcare = UserService.deleteHealthcare;
  vm.deleteSpecialty = UserService.deleteSpecialty;
  
  vm.addUserIssue = UserService.addUserIssue;
  vm.addHealthcareProvider = UserService.addHealthcareProvider;
  vm.addSpecialty = UserService.addSpecialty;
  
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.client = filestack.init("AfkCNgWSJyFwF5crXkNAVz");

  vm.getTherapist();
  vm.getIssuesList();
  vm.getHealthcareList();
  vm.getSpecialtiesList();

  vm.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };


  $scope.issueIdToPass = 'hey'
  $scope.editEmailIcon = false;

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

  vm.aFunction =function(){
    console.log(vm.therapist);
  }
}]);
