import _ from 'lodash';

class ReplaysUploadController {
  constructor($scope, $routeParams, $location, ReplaysService) {
    this.errorMessage = null;
    $scope.state = 0;

    $scope.$watch('files', () => {
      if ($scope.files && $scope.files.length > 0) {
        $scope.state = 1;
        this.upload($scope.files);
      }
    });
  }

  upload(files) {
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        $upload.upload({
          url: '/Replays/Upload',
          file: file,
        }).progress((evt) => {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          this.progress = progressPercentage;
          console.log('progress: ' + progressPercentage + '% ' +
              evt.config.file.name);
        }).success((data, status, headers, config) => {
          if (data.success) {
            $scope.state = 2;

            this.replayId = data.replayId;
            this.token = data.token;
            return;
          }

          this.errorMessage = data.message;
        }).error(() => {
          this.errorMessage = 'Could not upload file ;(';
        });
      }
    }
  }

  setTitle() {
    var requestObj = {
      replayId: this.replayId,
      token: this.token,
      newTitle: this.title,
    };

    $http.post('/Replays/SetTitle', requestObj).success(function(data, status, headers, config) {
      $location.path('/replays');
    });
  }
}

ReplaysUploadController.$inject = ['$scope', '$routeParams', '$location', 'ReplaysService'];
export default ReplaysUploadController;
