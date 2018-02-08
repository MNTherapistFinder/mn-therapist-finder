myApp.controller('UserController', ['$scope', '$mdSidenav', 'UserService', function ($scope, $mdSidenav, UserService) {
  console.log('UserController created');
  var vm = this;
  vm.therapist = UserService.therapist;
  $scope.therapist = UserService.therapist;
  vm.therapistOld = UserService.therapistOld;
  vm.therapistObjectsEqual = true;




  vm.issues = UserService.issues;
  vm.healthcare = UserService.healthcare;
  vm.specialties = UserService.specialties;

  vm.getTherapist = UserService.getTherapist;
  vm.getIssuesList = UserService.getIssuesList;
  vm.getHealthcareList = UserService.getHealthcareList;
  vm.getSpecialtiesList = UserService.getSpecialtiesList;
  vm.saveProfile = UserService.saveProfile;

  vm.deleteUserIssue = UserService.deleteUserIssue;
  vm.deleteHealthcare = UserService.deleteHealthcare;
  vm.deleteSpecialty = UserService.deleteSpecialty;

  vm.addUserIssue = UserService.addUserIssue;
  vm.addHealthcareProvider = UserService.addHealthcareProvider;
  vm.addSpecialty = UserService.addSpecialty;

  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.client = filestack.init("AfkCNgWSJyFwF5crXkNAVz");

  vm.autocompleteDemoRequireMatch = true;
  vm.transformChip = UserService.transformChip;
  vm.insuranceDropDown = UserService.insuranceDropDown;
  vm.specialtiesDropDown = UserService.specialtiesDropDown;
  vm.strugglesDropDown = UserService.strugglesDropDown;

  vm.getTherapist();
  vm.getIssuesList();
  vm.getHealthcareList();
  vm.getSpecialtiesList();

  vm.openLeftMenu = function () {
    $mdSidenav('left').toggle();
  };


  $scope.issueIdToPass = 'hey'
  $scope.editEmailIcon = false;

  vm.hello = function () {
    console.log('please work');
  }

  console.log(vm.therapist.list);
  vm.openPicker = function (userPhoto, userid) {
    console.log('in filestack');
    vm.client.pick({
      fromSources: ["local_file_system", "imagesearch", "facebook", "instagram", "dropbox"],
      transformations:{
        crop:{      
        force:true,
        aspectRatio:1}}
    }).then(function (response) {
      // declare this function to handle response
      console.log(response.filesUploaded[0].url);
    });
  }

  vm.checkTherapistObjects = function () {
    console.log('in function')
    if (vm.therapist == vm.therapistOld) {
      console.log('true hit')
      vm.therapistObjectsEqual = true
    } else {
      console.log('false hit');
      vm.therapistObjectsEqual = false;
    }
  }
vm.updateProfile = function(therapist) {
console.log(therapist)
}

  vm.findNameById = function (arr, theId) {
    for (var i=0;i<arr.length;i++){
      if (arr[i].id == theId) {
        return arr[i]
      }
    }
  }

  console.log(vm.findNameById([{ id: 1 }, { id: 2 }], 1));


}]);



myApp.directive('googleplace', function () {
  var minnesotaBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(43.306193, -96.547852),
      new google.maps.LatLng(48.673733, -89.692383))

  return {
      require: 'ngModel',
      link: function (scope, element, attrs, model) {
          var options = {
              bounds: minnesotaBounds,
          };

          scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
          var geocoder = new google.maps.Geocoder();

          google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
              geocoder.geocode({ 'address': element.val() }, function (results, status) {

                  if (status === 'OK') {
                      var lat = results[0].geometry.location.lat();
                      var lng = results[0].geometry.location.lng();
                      scope.$apply(function () {
                          model.$setViewValue({ lng: lng,lat:lat, addressString: element.val() });
                      });
                  }
              });

              // console.log(element.val())
              // scope.$apply(function () {
              //     model.$setViewValue({});
              // });
          });
      }
  };
});