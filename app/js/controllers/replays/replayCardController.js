'use strict';

define(['ewgApp'], function (ewgApp) {

    var injectParams = ['$log', '$scope', '$modalInstance', '$http', '$location', 'data'];

    var replayCardController = function ($log, $scope, $modalInstance, $http, $location, replayId) {
        $scope.opened = false;

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;

            
        }; // end open

        //$location.search('page', null).search('view', replayId);

        var requestObj = { replayId: replayId };

        $http.get('/Replays/Details', { params: requestObj }).success(function (data, status, headers, config) {
            $scope.replay = data;
        });

        $scope.done = function () {
            $modalInstance.close($scope.data);
        };

        $scope.copyToClipboard = function(text) {
            window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
        };
    };

    replayCardController.$inject = injectParams;

    ewgApp.controller('ReplayCardController', replayCardController);
});