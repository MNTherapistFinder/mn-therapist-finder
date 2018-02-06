myApp.controller('ScheduleController', ['$http', '$mdMedia', '$mdDialog','UserService', function ($http, $mdMedia, $mdDialog, UserService) {
    console.log('Schedule controller working')
    var self = this
    self.userObject = UserService.userObject
    self.message = 'Hello';
    self.$http = $http;
    self.appointment = [];
    self.slots = [];
    self.$mdMedia = $mdMedia;
    self.$mdDialog = $mdDialog;
    self.appointments = []
    self.dates = []

    // Configure dates
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();


    // Create date and slots array
    self.days = [{ dd: dd, mm: mm, yyyy: yyyy }, { dd: dd + 1, mm: mm, yyyy: yyyy }, { dd: dd + 2, mm: mm, yyyy: yyyy }, { dd: dd + 3, mm: mm, yyyy: yyyy }, { dd: dd + 4, mm: mm, yyyy: yyyy }, { dd: dd + 5, mm: mm, yyyy: yyyy }, { dd: dd + 6, mm: mm, yyyy: yyyy }, { dd: dd + 7, mm: mm, yyyy: yyyy }, { dd: dd + 8, mm: mm, yyyy: yyyy }, { dd: dd + 9, mm: mm, yyyy: yyyy }, { dd: dd + 10, mm: mm, yyyy: yyyy }, { dd: dd + 11, mm: mm, yyyy: yyyy }, { dd: dd + 12, mm: mm, yyyy: yyyy }, { dd: dd + 13, mm: mm, yyyy: yyyy }];
    self.slots = [{ h: '9', m: '0' },{ h: '9', m: '30' }, { h: '10', m: '30' }, { h: '11', m: '0' }, { h: '11', m: '30' }, { h: '12', m: '00' }, { h: '12', m: '30' }, { h: '13', m: '0' }, { h: '13', m: '30' }, { h: '14', m: '0' }, { h: '14', m: '30' }, { h: '15', m: '0' }, { h: '15', m: '30' }, { h: '16', m: '0' }, { h: '16', m: '30' }, { h: '17', m: '0' }, { h: '17', m: '30' }, { h: '18', m: '0' }, { h: '18', m: '30' }, { h: '19', m: '0' }, { h: '19', m: '30' }, { h: '20', m: '0' }, { h: '20', m: '30' }, { h: '21', m: '0' } ];
    self.timeFrames = ["Morning", "Afternoon", "Evening"];

    self.getAppointments = function () {
        console.log('get Hit');
        $http.get('/schedule').then(response => {
            console.log('response is in getAppointments, ', response.data)

            self.appointments = response.data
            console.log('self.appointments in get appointments function: ', self.appointments);
            self.dates = self.allot(self.slots, self.days, self.appointments);
            console.log(self.dates);
        });
    }
    self.getAppointments()



    self.save = function (appointmentToSave) {
        console.log(appointmentToSave);
        appointmentToSave.active = true;
        console.log('in save function. parameter passed is: ', appointmentToSave.date)
        console.log(appointmentToSave.date)
        self.$http.post('/schedule', {available_from: appointmentToSave.date}).then(res => {
            self.dates = self.allot(self.slots, self.days, self.appointments);
            self.getAppointments();
            // self.$http.get('/schedule').then(response => {
            //     console.log('GET REQUEST AFTER SAVE', response.data);
            //     self.appointments = response.data[0].available_times;
            //     self.dates = self.allot(self.slots, self.days, self.appointments);
            // });
        });

    }





    self.allot = function (slots, days, appointments) {
        console.log('slots:', slots);
        console.log('days:', days);
        console.log('appointments:', appointments);
        var a = [];
        _.each(days, function (d) {
            var k = new Date(d.yyyy, d.mm, d.dd);
            var v = [];
            _.each(slots, function (s) {
                var x = new Date(d.yyyy, d.mm, d.dd, s.h, s.m);
                var mx = moment(x);
                var active = true;
                _.each(appointments, function (g) {

                    var sdt = moment(new Date(g.available_times));
                    if (moment.duration(sdt.diff(mx))._milliseconds === 0) {
                        active = false;
                    }
                })
                v.push({ date: x, active: active });
            })
            a.push({ k: k, v: v });
        })
        return a;
    }



    self.showAdvanced = function (slot) {
        var vm = this;
        var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs')) && this.customFullscreen;
        this.$mdDialog.show({
            controller: function ($scope, $mdDialog, slot) {
                $scope.customer = {};
                $scope.customer.slot = slot;
                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };
            },
            // template: '<h1>HELLO SHOW ME PLEASE</h1>',
            templateUrl: '../views/partials/makeAvailable.html',
            locals: {
                slot: slot
            },
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        })
            .then(function (answer) {
                answer.date = answer.slot;
                console.log(answer.date);
                vm.save(answer.date);
            });

    }

    self.getColor = function ($index) {
        var _d = ($index + 1) % 11;
        var bg = '';

        switch (_d) {
            case 1: bg = 'green'; break;
            case 2: bg = 'darkBlue'; break;
            case 3: bg = 'blue'; break;
            case 4: bg = 'yellow'; break;
            case 5: bg = 'pink'; break;
            case 6: bg = 'darkBlue'; break;
            case 7: bg = 'purple'; break;
            case 8: bg = 'deepBlue'; break;
            case 9: bg = 'lightPurple'; break;
            case 10: bg = 'red'; break;
            default: bg = 'yellow'; break;
        }

        return bg;
    }


}])















// angular.module('myApp')
//   .component('schedule', {
//     templateUrl: '/views/templates/schedule.html',
//     controller: 'ScheduleController',
//     controllerAs: 'sc'
// })


