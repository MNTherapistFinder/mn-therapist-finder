myApp.service('HomeService', function($http, $location){
    console.log('HomeService Loaded');
    var self = this;

self.issues = {list:[]};


//GET request for zip code search
self.searchZipCodes = function(){
  console.log('searchZipCodes clicked');
  
    $http({
      method: 'GET',
      url: '/zipCodes'
    }).then(function (response) {
      console.log('response from searchZipCodes', response);
      self.zipCodes = response.data;
 
  });
}



//GET request for all issues for home page search.
self.searchIssues = function(){
  console.log('searchIssues clicked');
  
    $http({
      method: 'GET',
      url: '/home/issues'
    }).then(function (response) {
      console.log('response from searchIssues', response);
      self.issues.list = response.data;
      
  });
}

self.searchTextChange = function (text) {
  console.log('Text changed to ' + text);
  
}

self.selectedItemChange = function (item) {
  console.log('Item changed to ' + JSON.stringify(item));

}



});
  
