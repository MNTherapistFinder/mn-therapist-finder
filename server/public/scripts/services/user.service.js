myApp.service('UserService', function ($http, $location) {
  var self = this;
  self.userObject = { list: [] };
  self.therapist = { list: [] }
  self.issues = { list: [] }
  self.healthcare = { list: [] }
  self.specialties = { list: [] }
  self.therapistOld = { list: [] }

  self.therapistObjectsEqual;

  self.insuranceDropDown = [];
  self.specialtiesDropDown = [];
  self.strugglesDropDown = [];

  self.checkTherapistObjects = function () {
    if (angular.equals(self.therapist, self.therapistOld)) {
      // self.therapistObjectsEqual = true;
      return true
    } else {
      // self.therapistObjectsEqual = false;
      return false;
    }
  }


  self.transformChip = function (chip) {
    // If it is an object, it's already a known chip
    if (angular.isObject(chip)) {
      return chip;
    }
  }


  self.getuser = function () {
    self.insuranceDropDown = [];
    self.specialtiesDropDown = [];
    self.strugglesDropDown = [];
    $http.get('/user').then(function (response) {
      if (response.data.email) {
        self.userObject.list = response.data;
        // user has a curret session on the server
        // self.userObject.email = response.data.email;
      } else {
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
      $location.path("/home");
    });
  },

    self.logout = function () {
      $http.get('/user/logout').then(function (response) {
        self.insuranceDropDown = [];
        self.specialtiesDropDown = [];
        self.strugglesDropDown = [];
        $location.path("/home");
      });
    }

  self.getTherapist = function () {
    $http.get('/user/therapist').then(function (response) {
      self.therapist.list = response.data;
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
        // if (!self.someVar) {
        self.therapistOld.list = angular.copy(self.therapist.list);
        self.checkTherapistObjects();
        // self.someVar = true

      })
  }

  self.getIssuesList = function () {
    $http.get('user/issues').then(function (response) {
      self.issues.list = response.data;
    })
  }

  self.addUserIssue = function (issueId) {
    $http({
      url: 'user/issues',
      method: 'POST',
      data: { id: issueId }
    }).then(function (response) {
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
      self.insuranceDropDown = [];
      self.specialtiesDropDown = [];
      self.strugglesDropDown = [];
      self.getTherapist();
    })
  }

  self.getHealthcareList = function () {
    $http.get('user/healthcare').then(function (response) {
      self.healthcare.list = response.data
    })
  }

  self.addHealthcareProvider = function (insuranceId) {
    $http({
      url: 'user/healthcare',
      method: 'POST',
      data: { id: insuranceId }
    }).then(function (response) {
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
      self.insuranceDropDown = [];
      self.specialtiesDropDown = [];
      self.strugglesDropDown = [];
      self.getTherapist();
    })
  }


  self.getSpecialtiesList = function () {
    $http.get('user/specialty').then(function (response) {
      self.specialties.list = response.data;
    })
  }

  self.addSpecialty = function (specialtyId) {
    $http({
      url: 'user/specialty',
      method: 'POST',
      data: { id: specialtyId }
    }).then(function (response) {
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
      self.insuranceDropDown = [];
      self.specialtiesDropDown = [];
      self.strugglesDropDown = [];
      self.getTherapist();
    })
  }

  self.saveProfile = function (therapistObject) {
    $http({
      url: 'user/therapist',
      method: 'PUT',
      params: therapistObject
    }).then(function (response) {
      self.insuranceDropDown = [];
      self.specialtiesDropDown = [];
      self.strugglesDropDown = [];
      self.getTherapist();
    })
  }


});
