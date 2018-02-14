myApp.service('HomeService', ['$http', '$log', function ($http, $location, $log) {
  var self = this;
  self.searchResults = { list: [] }
  self.slides = [];



  //GET request for all issues for home page search. 


  self.issuesTwo = { list: [] };

  self.getIssues = function () {
    $http({
      method: 'GET',
      url: '/home/issues'
    }).then(function (response) {
      self.issuesTwo.list = response.data;

    });
  }


  self.newIssue = function (issue) {
    alert("Please pick an issue from the list.");
  }

  // GET request for a list of insurance types
  self.insurance = { list: [] };

  self.getInsurance = function () {
    $http({
      method: 'GET',
      url: '/home/insurance'
    }).then(function (response) {
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

    }).then(function(){
      while (self.slides.length > 0){
        self.slides.pop();
      }
      for (var i =0; (i < 5) && (i<self.searchResults.list.length) ; i++){
        self.slides.push(self.searchResults.list[i]);
      }
    })
  }


  self.newInsurance = function (issue) {
    alert("Please select an insurance plan from the list.");
  }





}]);

