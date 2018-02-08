myApp.controller('HomeController', ['$scope','$location', 'HomeService', function ($scope, $location, HomeService) {
    console.log('HomeController created');
    var vm = this;


    vm.issuesTwo = HomeService.issuesTwo;
    vm.getIssues = HomeService.getIssues;
    vm.getInsurance = HomeService.getInsurance;
    vm.insurance = HomeService.insurance;
    vm.newIssue = HomeService.newIssue;
    vm.newInsurance = HomeService.newInsurance;
    vm.getSearchResults = HomeService.getSearchResults

    HomeService.getIssues();
    HomeService.getInsurance();
    $scope.showme;
    $scope.showme2;

    vm.runOnEnter = function (vente) {
        if (event.keyCode == 13) {
            $scope.showme = true;

        }
    }

    vm.runOnEnter2 = function (vente) {
        if (event.keyCode == 13) {
            $scope.showme2 = true;

        }
    }



}]);


myApp.directive('googleplace', function () {
    var minnesotaBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(43.306193, -96.547852),
        new google.maps.LatLng(48.673733, -89.692383))

    return {
        require: 'ngModel',
        link: function (scope, element, attrs, model) {
            var options = {
                bounds: minnesotaBounds
            };

            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
            var geocoder = new google.maps.Geocoder();

            google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                geocoder.geocode({ 'address': element.val() }, function (results, status) {

                    if (status === 'OK') {
                        var lat = results[0].geometry.location.lat();
                        var lng = results[0].geometry.location.lng();
                        console.log('hey')
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

