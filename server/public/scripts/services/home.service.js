myApp.service('HomeService', ['$http', '$log', function ($http, $location, $log) {
  console.log('HomeService Loaded');
  var self = this;
  self.searchResults = { list: [] }
  self.slides = [];



  //GET request for all issues for home page search. 


  self.issuesTwo = { list: [] };

  self.getIssues = function () {
    console.log('searchIssues run');

    $http({
      method: 'GET',
      url: '/home/issues'
    }).then(function (response) {
      console.log('response from searchIssues', response.data);
      self.issuesTwo.list = response.data;

    });
  }


  self.newIssue = function (issue) {
    alert("Please pick an issue from the list.");
  }

  // GET request for a list of insurance types
  self.insurance = { list: [] };

  self.getInsurance = function () {
    console.log('getInsurance run');

    $http({
      method: 'GET',
      url: '/home/insurance'
    }).then(function (response) {
      console.log('response from getInsurance', response.data);
      self.insurance.list = response.data;

    });
  }

  self.getSearchResults = function (searchObject) {
    $http({
      method: 'GET',
      url: '/home/search',
      params: {
        lng: searchObject.lng,
        lat: searchObject.lat,
        issue: searchObject.issue,
        healthcare: searchObject.healthcare
      }
    }).then(function (response) {
      self.searchResults.list = response.data;
      console.log(response.data);

    }).then(function(){
      for (var i =0; (i < 5) && (i<self.searchResults.list.length) ; i++){
        self.slides.push(self.searchResults.list[i]);
      }
    })
  }


  self.newInsurance = function (issue) {
    alert("Please select an insurance plan from the list.");
  }





}]);

