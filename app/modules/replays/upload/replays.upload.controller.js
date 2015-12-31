import _ from 'lodash';

class ReplaysUploadController {
  constructor($scope, $routeParams, $location, ReplaysService, Upload) {
    this.$scope = $scope;
    this.$location = $location;
    this.ReplaysService = ReplaysService;
    this.Upload = Upload;

    this.errorMessage = null;
    $scope.files = [];
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
        this._upload(files[i]);
      }
    }
  }

  _upload(file) {
    this.Upload.upload({
      url: this.ReplaysService.getUploadUrl(),
      file: file,
    }).progress((evt) => {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      this.progress = progressPercentage;
      console.log('progress: ' + progressPercentage + '% ' +
          evt.config.file.name);
    }).success((data, status, headers, config) => {
      if (data.success) {
        this.$scope.state = 2;

        this.replayId = data.replayId;
        this.token = data.token;
        return;
      }

      this.errorMessage = data.message;
    }).error(() => {
      this.errorMessage = 'Could not upload file ;(';
    });
  }

  setTitle() {
    this.ReplaysService.setTitle(this.replayId, this.token, this.title).then(() => {
      this.$location.path('/replays');
      this.$location.replace();
    });
  }
}

ReplaysUploadController.$inject = ['$scope', '$routeParams', '$location', 'ReplaysService', 'Upload'];
export default ReplaysUploadController;
