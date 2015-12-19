'use strict';

define(['ewgApp'], function(ewgApp) {

    var injectParams = ['$scope', '$upload', '$location', '$http'];

    var uploadReplayController = function($scope, $upload, $location, $http) {

        var vm = this;

        vm.errorMessage = null;
        $scope.state = 0;

        $scope.$watch('files', function() {
            if ($scope.files && $scope.files.length > 0) {
                $scope.state = 1;
                vm.upload($scope.files);
            }
        });

        vm.upload = function(files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    $upload.upload({
                        url: '/Replays/Upload',
                        file: file
                    }).progress(function(evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        vm.progress = progressPercentage;
                        console.log('progress: ' + progressPercentage + '% ' +
                            evt.config.file.name);
                    }).success(function(data, status, headers, config) {
                        if (data.success) {
                            $scope.state = 2;

                            vm.replayId = data.replayId;
                            vm.token = data.token;
                            return;
                        }

                        vm.errorMessage = data.message;
                    }).error(function() {
                        vm.errorMessage = "Could not upload file ;(";
                    });
                }
            }
        };

        vm.setTitle = function() {
            var requestObj = {
                replayId: vm.replayId,
                token: vm.token,
                newTitle: vm.title
            };

            $http.post('/Replays/SetTitle', requestObj).success(function(data, status, headers, config) {
                $location.path('/replays');
            });
        };
    };

    uploadReplayController.$inject = injectParams;

    ewgApp.register.controller('UploadReplayController', uploadReplayController);
});