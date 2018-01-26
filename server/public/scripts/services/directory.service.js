myApp.service('DirectoryService', function ($http, $location) {
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

});
