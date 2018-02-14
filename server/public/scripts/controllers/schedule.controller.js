myApp.controller('ScheduleController', ['$http', '$mdMedia', '$mdSidenav', '$mdDialog', 'UserService', function ($http, $mdMedia, $mdSidenav, $mdDialog, UserService) {
    
    var self = this
    self.userObject = UserService.userObject
    self.message = 'Hello';
    self.$http = $http;
    self.appointment = [];
    self.slots = [];
    self.$mdMedia = $mdMedia;
    self.$mdDialog = $mdDialog;
    self.appointments = [];
    self.dates = [];
    

    // Configure dates
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();


    // Create date and slots array
    self.morningSlots = [{ h: '7', m: '0' },{ h: '8', m: '0' }, { h: '9', m: '0' }, { h: '10', m: '0' }, { h: '11', m: '0' }, { h: '12', m: '0' }];
    self.afternoonSlots =[{ h: '13', m: '0' }, { h: '14', m: '0' }, { h: '15', m: '0' }, { h: '16', m: '0' }, { h: '17', m: '0' }, { h: '18', m: '0' }];
    self.eveningSlots = [{ h: '19', m: '0' }, { h: '20', m: '0' }, { h: '21', m: '0' }, { h: '22', m: '0' }, { h: '23', m: '0' }];
    self.days = [{ dd: dd, mm: mm, yyyy: yyyy }, { dd: dd + 1, mm: mm, yyyy: yyyy }, { dd: dd + 2, mm: mm, yyyy: yyyy }, { dd: dd + 3, mm: mm, yyyy: yyyy }, { dd: dd + 4, mm: mm, yyyy: yyyy }, { dd: dd + 5, mm: mm, yyyy: yyyy }, { dd: dd + 6, mm: mm, yyyy: yyyy }, { dd: dd + 7, mm: mm, yyyy: yyyy }, { dd: dd + 8, mm: mm, yyyy: yyyy }, { dd: dd + 9, mm: mm, yyyy: yyyy }, { dd: dd + 10, mm: mm, yyyy: yyyy }, { dd: dd + 11, mm: mm, yyyy: yyyy }, { dd: dd + 12, mm: mm, yyyy: yyyy }, { dd: dd + 13, mm: mm, yyyy: yyyy }];
    self.slots = []
    self.timeFrames = ["Morning", "Afternoon", "Evening"];

    self.getAppointments = function (timeOfDay) {
        
       if (timeOfDay == "afternoon"){
           timeOfDay = self.afternoonSlots
       } else if (timeOfDay == 'morning'){
           timeOfDay = self.morningSlots
       } else if (timeOfDay == 'evening') {
            timeOfDay = self.eveningSlots
       }
        
        $http.get('/schedule').then(response => {
            

            self.appointments = response.data;
            

            self.dates = self.allot(timeOfDay, self.days, self.appointments);


        });
    }
    
    self.getAppointments(self.morningSlots)



    self.save = function (appointmentToSave) {

        appointmentToSave.active = true;
        self.$http.post('/schedule', { available_from: appointmentToSave.date }).then(res => {
            self.dates = self.allot(self.slots, self.days, self.appointments);
            if(self.selectedItem == 'morning') {
                self.getAppointments(self.morningSlots);
            } else if ( self.selectedItem == 'afternoon'){
                self.getAppointments(self.afternoonSlots)
            } else if( self.selectedItem == 'evening'){
                self.getAppointments(self.eveningSlots)
            } else self.getAppointments(self.morningSlots)
        });

    }





    self.allot = function (slots, days, appointments) {
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
                vm.save(answer.date);
            });

    }

    self.deleteTime = function (time) {
        $http({
            method: 'DELETE',
            url: '/schedule/' + time.available_time_id
        }).then(function (response) {
            self.getAppointments(self.morningSlots)
        })

    }

    self.getColor = function ($index) {
        var _d = ($index + 1) % 11;
        var bg = '';

        switch (_d) {
            case 1: bg = 'darkGrey'; break;
            default: bg = 'darkGrey'; break;
        }

        return bg;
    }


    self.openLeftMenu = function () {
        $mdSidenav('left').toggle();
    };


}])
















