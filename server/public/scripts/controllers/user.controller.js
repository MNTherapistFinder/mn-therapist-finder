myApp.controller('UserController', ['$scope', '$mdToast', '$mdSidenav', 'UserService', function ($scope, $mdToast, $mdSidenav, UserService) {
  console.log('UserController created');
  var vm = this;
  vm.therapist = UserService.therapist;
  




  //list of autocomplete dropdowns for "struggles", "insurance", and "specialties"
  vm.issues = UserService.issues;
  vm.healthcare = UserService.healthcare;
  vm.specialties = UserService.specialties;

  //ajax get requests
  vm.getTherapist = UserService.getTherapist;
  vm.getIssuesList = UserService.getIssuesList;
  vm.getHealthcareList = UserService.getHealthcareList;
  vm.getSpecialtiesList = UserService.getSpecialtiesList;

  //ajax put request to save profile changes
  vm.saveProfile = UserService.saveProfile;

  //ajax delete requests to delete "chips"
  vm.deleteUserIssue = UserService.deleteUserIssue;
  vm.deleteHealthcare = UserService.deleteHealthcare;
  vm.deleteSpecialty = UserService.deleteSpecialty;

  //ajax post requests to add "chips"
  vm.addUserIssue = UserService.addUserIssue;
  vm.addHealthcareProvider = UserService.addHealthcareProvider;
  vm.addSpecialty = UserService.addSpecialty;


  vm.client = filestack.init("AfkCNgWSJyFwF5crXkNAVz");

 //functions for "chip" functionality
  vm.transformChip = UserService.transformChip;
  vm.insuranceDropDown = UserService.insuranceDropDown;
  vm.specialtiesDropDown = UserService.specialtiesDropDown;
  vm.strugglesDropDown = UserService.strugglesDropDown;

  //function to check if there has been user changes
  vm.checkTherapistObjects= UserService.checkTherapistObjects;

  //function calls to get therapist info, and lists of issues, insurance, and specialties
  vm.getTherapist();
  vm.getIssuesList();
  vm.getHealthcareList();
  vm.getSpecialtiesList();


  //opens sidenav
  vm.openLeftMenu = function () {
    $mdSidenav('left').toggle();
  };

  //when a chip is added, the chip id gets pushed into an array of the therapist's id's for issues
  vm.addIssueArray = function (id) {
    vm.therapist.list[0].issueid.push(id);
    vm.checkTherapistObjects();
  }

   //when a chip is deleted, the chip id gets removed from the array of the therapist's id's for issues
  vm.deleteIssueArray = function (id) {
    var index = vm.therapist.list[0].issueid.indexOf(id);
    if (index > -1) {
      vm.therapist.list[0].issueid.splice(index, 1);
      vm.checkTherapistObjects();

    }
  }


//when a chip is added, the chip id gets pushed into an array of the therapist's id's for specialties
  vm.addSpecialtyArray = function (id) {
    vm.therapist.list[0].specialty_id.push(id);
    vm.checkTherapistObjects();
  }

  //when a chip is added, the chip id gets removed from the array of the therapist's id's for specialties
  vm.deleteSpecialtyArray = function (id) {
    var index = vm.therapist.list[0].specialty_id.indexOf(id);
    if (index > -1) {
      vm.therapist.list[0].specialty_id.splice(index, 1);
      vm.checkTherapistObjects();

    }
  }

  //
  vm.addInsuranceArray = function (id) {
    vm.therapist.list[0].insurance_id.push(id);
    vm.checkTherapistObjects();

  }

  vm.deleteInsuranceArray = function (id) {
    var index = vm.therapist.list[0].insurance_id.indexOf(id);
    if (index > -1) {
      vm.therapist.list[0].insurance_id.splice(index, 1);
      vm.checkTherapistObjects();

    }
  }



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
      transformations: {
        crop: {
          force: true,
          aspectRatio: 1
        }
      }
    }).then(function (response) {
      // declare this function to handle response
      console.log(response.filesUploaded[0].url);
      vm.therapist.list[0].profile_picture = response.filesUploaded[0].url;

      vm.checkTherapistObjects();
      $scope.$apply();
      console.log(vm.therapist.list[0].profile_picture)
    });
  }

  // vm.checkTherapistObjects = function () {
  //   console.log('in function')
  //   if (vm.therapist == vm.therapistOld) {
  //     vm.therapistObjectsEqual = true
  //   } else {
  //     vm.therapistObjectsEqual = false;
  //   }
  // }
  vm.updateProfile = function (therapist) {
    console.log(therapist)
  }

  vm.findNameById = function (arr, theId) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == theId) {
        return arr[i]
      }
    }
  }

  $scope.showToast = function() {
    $mdToast.show (
       $mdToast.simple()
       .textContent('Your Profile Changes Have Been Made!')                       
       .hideDelay(3000)
       .position('bottom right')
       .theme('success-toast')
    );
 };


}]);



myApp.directive('googleplace2', function () {
  var minnesotaBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(43.306193, -96.547852),
    new google.maps.LatLng(48.673733, -89.692383))

  return {
    require: 'ngModel',
    scope: {
      'lat': '=',
      'lng': '='
    },
    link: function (scope, element, attrs, model) {
      var options = {
        bounds: minnesotaBounds,
      };

      scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
      var geocoder = new google.maps.Geocoder();

      google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
        geocoder.geocode({ 'address': element.val() }, function (results, status) {

          if (status === 'OK') {
            scope.lat = results[0].geometry.location.lat();
            scope.lng = results[0].geometry.location.lng();
            scope.$apply(function () {
              model.$setViewValue(element.val());
            });
          }
        });

      });
    }
  };
});

