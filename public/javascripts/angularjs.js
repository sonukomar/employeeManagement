(function() {
    'use strict';

    var app = angular.module('empManagement', ['ui.grid']);

    app.controller('loginController', function($scope, $http) {

        var headerTemplate = '<div style="margin-left: -5px!important;border-right: 2px solid #fff!important;">';
        var cellTemp1 = '<div style="padding: 5px;color:#333333!important;background-color: transparent!important;font-family: Arial, sans-serif;cursor:pointer;" click-id  class="idcbmbdfc{{$index+1}}">{{MODEL_COL_FIELD}}</div>'

        $scope.gridOptions = {
            paginationPageSizes: [25, 50, 100],
            paginationPageSize: 50,
            enablepagination: 1,
            enableFiltering: false,
            enablePaginationControls: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 0,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            minRowsToShow: 250,
            columnDefs: [{
                    name: 'opertions',
                    displayName: null,
                    cellClass: 'bordernone',
                    width: '2%',
                    enableSorting: false,
                    headerCellTemplate: headerTemplate,
                    headerCellClass: 'borderheadnone',
                    cellTemplate: 'javascripts/colOnemsg.html',
                    enableColumnMenu: false
                },
                {
                    field: 'name',
                    displayName: 'Name',
                    width: "*",
                    resizable: false
                },
                {
                    field: 'desigination',
                    displayName: 'Designation',
                    width: "30%"
                },
                {
                    field: 'project',
                    displayName: 'Project',
                    width: "*"
                },
                {
                    field: 'salary',
                    displayName: 'Salary',
                    cellClass: 'ageCell',
                    headerCellClass: 'ageHeader',
                    width: "10%"
                }
            ],
        };



        $scope.gridOptions.onRegisterApi = function(gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.core.on.sortChanged($scope, $scope.sortChanged);
            $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200); //required for filter
        };

        $scope.login = function() {
            if ($scope.userName && $scope.password) {
                console.log("redirecting to user page")
            }

            $scope.getEmpDetails();
        }

        $scope.getEmpDetails = function() {
            
            $http.get('/getempdata').then(function(response) {
                $scope.IsLogin = false;
                console.log(response);
                $scope.gridOptions.data = [];
                $scope.gridOptions.data = response.data;

            });
        };

        $scope.newEmployee = {};

        $scope.addEmployee = function() {
           
            $http({
                    url: 'addempdata',
                    method: "POST",
                    headers: {'Content-Type': 'application/json '},
                    data: $scope.newEmployee
                })
                .then(function(response) {
                   if(response.data === "success"){
                        
                        $scope.getEmpDetails();
                        $scope.successful = true;
                        var user = $scope.newEmployee.name;
                        $scope.successMsg = "Employee" + " " + user + " " + "succefully added.";
                        $scope.newEmployee = {};
                        $('#addEmp').modal('hide');
                    }
                }, 
                function(response) { // optional
                    $scope.error = true;
                    $scope.errorMsg = response.data.error.errmsg;
                    $('#addEmp').modal('hide');
                });        
        };

        $scope.IsLogin = true;
    }); //END of controller

})(); //end of module