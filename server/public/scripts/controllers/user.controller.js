myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var vm = this;
  vm.therapist = UserService.therapist;
  vm.getTherapist = UserService.getTherapist;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.client = filestack.init("AfkCNgWSJyFwF5crXkNAVz");

  vm.getTherapist();
  vm.openPicker = function (userPhoto, userid) {
    console.log('in filestack');
    vm.client.pick({
      fromSources: ["local_file_system", "imagesearch", "facebook", "instagram", "dropbox"]
    }).then(function (response) {
      // declare this function to handle response
      console.log(response.filesUploaded[0].url);
    });
  }
});
