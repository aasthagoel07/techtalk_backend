var techtalk = angular.module('techtalk', []);
//techtalk.config(['$routeProvider', function ($routeProvider) {
//    $routeProvider
//        .when('/', {
//            templateUrl: 'home.html',
//            controller: 'ULoginController'
//        })
//}])
//API URL for the server
var APIURL = "api/EventTables";



// LEGACY CODE FOR REGISTERING EVENT USING JQUERY


//Register Event Code for ID present in Event_Add Page
/*function registerEvent() {

    var edate = document.getElementById("eventDate").value;
    var tempdate = new Date(edate);
    //Get todays date for comparision regarding Past and upcoming
    var todayDate = new Date();
    //Convert date format to YYYY/MM/DD
    var formattedDate = convertDateFormatToYYYYMMDD(tempdate);
    if (tempdate > todayDate) {
        console.log("Upcoming");
        //Function that will call the API
        var isPassed = false;
        apiPushForRegisterEvent(isPassed, formattedDate);
    } else {
        console.log("Passed");
        if (confirm("You are about to add an already passed event. Continue?") == true) {
            //Function that will call the API
            var isPassed = true;
            apiPushForRegisterEvent(isPassed, formattedDate);

        } else
            console.log("False");
    }

}

//Function to convert Date format
function convertDateFormatToYYYYMMDD(tempDate) {
    var dd = tempDate.getDate();
    var mn = tempDate.getMonth() + 1;
    var yr = tempDate.getFullYear();
    var formattedDate = yr + "/" + mn + "/" + dd;
    return formattedDate;
}

//Function to call api for data insertion
function DefunctapiPushForRegisterEvent(boolPassedValue, dateValue) {

    var eventObject = {
        Ename: $('#eventName').val(),
        Pname: $('#presenterName').val(),
        Edes: $('#eventDes').val(),
        Edate: dateValue,
        isPassed: boolPassedValue
    };
    $.ajax({
        url: APIURL + "/PostEventTable",
        cache: false,
        type: 'POST',
        dataType: 'json',
        data: eventObject,
        success: function () {
            alert("Addition Successful")
        },
        error: function () {
            alert("Oops! Something went wrong")
        }

    })
}

*/


//Administrator Login Code
function admin_login() {
    location.href = 'admin_dashboard.html';
}

function user_l() {
    location.href = 'user_dashboard.html'
}



// ANGULAR JS IMPLEMENTATION

//USER Page Controller
techtalk.controller('EventController', function ($scope, $http) {
    $scope.getRequest = function () {
        $scope.rows =
            console.log("I've been pressed!");
        $http.get("/api/EventTables/GetEventTables")
            .then(function successCallback(response) {
                $scope.rows = response.data;
                var dupRow = $scope.rows[0]

            }, function errorCallback(response) {
                console.log("Unable to perform get request");
            });
    };
});


//Admin Page Controller
techtalk.controller('AdminController', function ($scope, $http) {
    $scope.getUpcomingEvents = function () {
        $scope.rows =
            $http.get("http://localhost:58492/api/EventTables/GetEventTables")
                .then(function successCallback(response) {
                    $scope.rows = response.data;
                    $scope.lenUpcoming = Object.keys(response.data).length;
                    console.log(lenUpcoming);
                }, function errorCallback(response) {
                    console.log("Unable to perform get request");
                });
    };

    $scope.getPastEvents = function () {
        $scope.rows =
            $http.get("http://localhost:58492/api/EventTables/GetPastEvents")
                .then(function successCallback(response) {
                    $scope.Pastrows = response.data;
                    $scope.lenPast = Object.keys(response.data).length;
                }, function errorCallback(response) {
                    console.log("Unable to perform get request");
                });
    };

});

//Add Event Page controller
techtalk.controller('AddEventController', function ($scope, $http) {
    //Register Event Code for ID present in Event_Add Page
    $scope.registerEvent = function () {

        var edate = document.getElementById("eventDate").value;
        var tempdate = new Date(edate);
        //Get todays date for comparision regarding Past and upcoming
        var todayDate = new Date();
        //Convert date format to YYYY/MM/DD
        var formattedDate = $scope.convertDateFormatToYYYYMMDD(tempdate);
        if (tempdate > todayDate) {
            console.log("Upcoming");
            //Function that will call the API
            var isPassed = false;
            $scope.apiPushForRegisterEvent(isPassed, formattedDate);
        } else {
            console.log("Passed");
            if (confirm("You are about to add an already passed event. Continue?") == true) {
                //Function that will call the API
                var isPassed = true;
                $scope.apiPushForRegisterEvent(isPassed, formattedDate);

            } else
                console.log("False");
        }

    }

    //Function to convert Date format
    $scope.convertDateFormatToYYYYMMDD = function (tempDate) {
        var dd = tempDate.getDate();
        var mn = tempDate.getMonth() + 1;
        var yr = tempDate.getFullYear();
        var formattedDate = yr + "/" + mn + "/" + dd;
        return formattedDate;
    }


    $scope.apiPushForRegisterEvent = function (boolPassedValue, dateValue) {

        var eventObject = {
            Ename: $('#eventName').val(),
            Pname: $('#presenterName').val(),
            Edes: $('#eventDes').val(),
            Edate: dateValue,
            isPassed: boolPassedValue
        };
        $http.post(APIURL + '/PostEventTable', eventObject)
            .then(function successCallback() {
                console.log("Success");
            }, function errorCallback() {
                console.log("Failed");
            });
    };
});
techtalk.controller("ALoginController", ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.username = '';
    $scope.password = '';
    $scope.responseMessage = '';
   // $scope.isSubmitButtonDisabled = false;

    $scope.loginSubmit1 = function () {

        var userdata = {
            'Admin_username': $scope.username,
            'Admin_password': $scope.password
        };

        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http.post('/api/Admin_Table/LoginCheck', userdata, config).then(function (successResponse) {
          
           // $scope.isSubmitButtonDisabled = true;
            $window.location.href = 'Admin_Dashboard.html'
            alert("Login Successfull");
        }, function (errorResponse) {

            $scope.responseMessage = 'Email or Password is incorrect';
        });
    }
}]);

techtalk.controller("ULoginController", ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.username = '';
    $scope.password = '';
    $scope.responseMessage = '';
    $scope.isSubmitButtonDisabled = false;

    $scope.uloginSubmit = function () {

        var userdata = {
            'user_username': $scope.username,
            'user_password': $scope.password
        };

        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http.post('/api/user_login/LoginCheck', userdata, config).then(function (successResponse) {

            $scope.isSubmitButtonDisabled = true;
            $window.location.href = 'user_dashboard.html'
            alert("Login Successfull");
        }, function (errorResponse) {

            $scope.responseMessage = 'Email or Password is incorrect';
        });
    }
}]);


