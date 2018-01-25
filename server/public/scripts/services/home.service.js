myApp.service('HomeService', function($http, $location){
    console.log('HomeService Loaded');
    var self = this;

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


});
  