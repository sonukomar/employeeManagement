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
                    width: "20%"
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
                    width: "**"
                }
            ],
        }



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
        }

        $scope.newEmployee = {};

        $scope.addEmployee = function() {
            $http.get('/addempdata').then(function(response) {
                if(response.data === "success"){
                    $scope.gridOptions.data.push($scope.newEmployee);
                    $scope.successful = true;
                    $scope.successMsg = "Employee" + " " + $scope.newEmployee.name + " " + "succefully added."
                }
            },function(response){
                
                 $scope.error = true;
                 $scope.errorMsg = response.data.error.errmsg;
            });
           
        }

        $scope.IsLogin = true;
    }); //END of controller

})(); //end of module