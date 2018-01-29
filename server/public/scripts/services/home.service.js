myApp.service('HomeService',['$http', '$q', '$log',function($http, $location, $q, $log){
    console.log('HomeService Loaded');
    var self = this;




//GET request for all issues for home page search. 

self.selectedItemChange = function (item) {
  // $log.info('Item changed to ' + JSON.stringify(item));
  console.log('Item changed to ' + JSON.stringify(item));
  
}

self.issuesTwo = {list:[]};

self.searchIssues = function(){
    console.log('searchIssues run');
    
      $http({
        method: 'GET',
        url: '/home/issues'
      }).then(function (response) {
        console.log('response from searchIssues', response.data);
        self.issuesTwo.list = response.data;
        
    });
  }






}]);
  
