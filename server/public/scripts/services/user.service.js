myApp.service('UserService', function ($http, $location) {
  console.log('UserService Loaded');
  var self = this;
  self.userObject = { list: [] };
  self.therapist = { list: [] }
  self.issues = { list: [] }
  self.healthcare = { list: [] }
  self.specialties = { list: [] }
  self.therapistOld = { list: [] }

  self.insuranceDropDown = [];
  self.specialtiesDropDown = [];
  self.strugglesDropDown = [];


  self.transformChip = function (chip) {
    console.log('transform chip', chip);

    // If it is an object, it's already a known chip
    if (angular.isObject(chip)) {
      return chip;
    }
  }


  self.getuser = function () {
    self.insuranceDropDown = [];
    self.specialtiesDropDown = [];
    self.strugglesDropDown = [];
    console.log('UserService -- getuser');
    $http.get('/user').then(function (response) {
      if (response.data.email) {
        self.userObject.list = response.data;
        // user has a curret session on the server
        // self.userObject.email = response.data.email;
        console.log('UserService -- getuser -- User Data: ', self.userObject.list);
      } else {
        console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

    self.logout = function () {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function (response) {
        console.log('UserService -- logout -- logged out');
        self.insuranceDropDown = [];
        self.specialtiesDropDown = [];
        self.strugglesDropDown = [];
        $location.path("/home");
      });
    }

  self.getTherapist = function () {
    console.log('hit');
    $http.get('/user/therapist').then(function (response) {
      self.therapist.list = response.data;
      console.log('insurance ids', self.therapist.list[0].insurance_id);
      console.log('specialty ids', self.therapist.list[0].specialty_id);
      console.log('struggle ids', self.therapist.list[0].issueid);
      for (var i = 0; i < self.therapist.list[0].insurance_id.length; i++) {
        self.insuranceDropDown.push({ id: self.therapist.list[0].insurance_id[i] })
      };
      for (var i = 0; i < self.therapist.list[0].specialty_id.length; i++) {
        self.specialtiesDropDown.push({ id: self.therapist.list[0].specialty_id[i] })
      };
      for (var i = 0; i < self.therapist.list[0].issueid.length; i++) {
        self.strugglesDropDown.push({ id: self.therapist.list[0].issueid[i] })
      };

    })
      .then(function (response) {
        if (!self.someVar) {
          self.therapistOld.list = angular.copy(self.therapist.list);
          self.someVar = true
        }
      })
  }

  self.getIssuesList = function () {
    $http.get('user/issues').then(function (response) {
      self.issues.list = response.data;
      console.log(self.issues.list);
    })
  }

  self.addUserIssue = function (issueId) {
    $http({
      url: 'user/issues',
      method: 'POST',
      data: { id: issueId }
    }).then(function (response) {
      console.log(response);
      self.insuranceDropDown = [];
      self.specialtiesDropDown = [];
      self.strugglesDropDown = [];
      self.getTherapist();
    })
  }
  self.deleteUserIssue = function (issueId) {
    $http({
      url: 'user/issues',
      method: 'DELETE',
      params: { issues_id: issueId }
    }).then(function (response) {
      console.log(response);
      self.insuranceDropDown = [];
      self.specialtiesDropDown = [];
      self.strugglesDropDown = [];
      self.getTherapist();
    })
  }

  self.getHealthcareList = function () {
    $http.get('user/healthcare').then(function (response) {
      self.healthcare.list = response.data
      console.log(response.data);
    })
  }

  self.addHealthcareProvider = function (insuranceId) {
    console.log('hit add healthcare');

    $http({
      url: 'user/healthcare',
      method: 'POST',
      data: { id: insuranceId }
    }).then(function (response) {
      console.log(response);
      self.insuranceDropDown = [];
      self.specialtiesDropDown = [];
      self.strugglesDropDown = [];
      self.getTherapist();
    })
  }

  self.deleteHealthcare = function (healthcareId) {
    $http({
      url: 'user/healthcare',
      method: 'DELETE',
      params: { id: healthcareId }
    }).then(function (response) {
      console.log(response);
      self.insuranceDropDown = [];
      self.specialtiesDropDown = [];
      self.strugglesDropDown = [];
      self.getTherapist();
    })
  }


  self.getSpecialtiesList = function () {
    $http.get('user/specialty').then(function (response) {
      self.specialties.list = response.data
      console.log(response.data);
    })
  }

  self.addSpecialty = function (specialtyId) {
    console.log(specialtyId);
    $http({
      url: 'user/specialty',
      method: 'POST',
      data: { id: specialtyId }
    }).then(function (response) {
      console.log(response);
      self.insuranceDropDown = [];
      self.specialtiesDropDown = [];
      self.strugglesDropDown = [];
      self.getTherapist();
    })
  }


  self.deleteSpecialty = function (specialtyId) {
    $http({
      url: 'user/specialty',
      method: 'DELETE',
      params: { id: specialtyId }
    }).then(function (response) {
      console.log(response);
      self.insuranceDropDown = [];
      self.specialtiesDropDown = [];
      self.strugglesDropDown = [];
      self.getTherapist();
    })
  }

  self.saveProfile = function (therapistObject) {
    console.log(therapistObject);
    therapistObject.lng = therapistObject.workplace_street_address.lng;
    therapistObject.lat = therapistObject.workplace_street_address.lat;
    therapistObject.workplace_street_address = therapistObject.workplace_street_address.addressString;
    $http({
      url: 'user/therapist',
      method: 'PUT',
      data: therapistObject
    }).then(function (response) {
      console.log(response)
      self.insuranceDropDown = [];
      self.specialtiesDropDown = [];
      self.strugglesDropDown = [];
      self.getTherapist();
    })
  }


});
