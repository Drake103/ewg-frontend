'use strict';

define(['ewgApp'], function (ewgApp) {

    var defaultPageSize = 15;

    var injectParams = ['$scope', '$location', '$http', '$routeParams', 'dialogs'];

    var replaysController = function ($scope, $location, $http, $routeParams, dialogs) {

        var vm = this,
            replayId = $routeParams.view || -1,
            pageNumber = $routeParams.page || 1,
            search = $routeParams.search;

        vm.currentPage = pageNumber;
        vm.searchStr = search;

        var onReplaysCountLoaded = function (startIndex, pageSize, searchText) {
            var requestObj = { startIndex: startIndex, pageSize: pageSize, searchText: searchText };

            $http.get('/Replays/List', { params: requestObj }).success(function (data, status, headers, config) {
                vm.replays = data;
            });
        };

        var loadReplays = function (searchText) {
            var requestObj = { params: { searchText: searchText } };

            $http.get('/Replays/GetCount', requestObj).success(function (data, status, headers, config) {
                    vm.totalCount = data;

                    vm.totalPages = Math.floor(data / defaultPageSize) + 1;

                    var list = [];
                    for (var i = 1; i <= vm.totalPages; i++) {
                        list.push(i);
                    }

                    vm.pages = list;

                    var startIndex = (vm.currentPage - 1) * defaultPageSize;

                    if (vm.totalCount < startIndex) {
                        //$location.path('/replays');
                        return;
                    }

                    onReplaysCountLoaded(startIndex, defaultPageSize, searchText);
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        };

        loadReplays(vm.searchStr);

        vm.browsePage = function (aPageNumber) {
            $location.search('page', aPageNumber).search('view', null).search('search', null);
            vm.currentPage = aPageNumber;
            loadReplays(null);
        };

        vm.browseReplay = function (aReplayId) {
            $location.search('page', null).search('view', aReplayId).search('search', null);
            var dlg = dialogs.create('/app/views/replays/replayCardModal.html', 'ReplayCardController', aReplayId);
            dlg.result.then(function () {
                $location.search('page', vm.currentPage).search('search', vm.searchStr).search('view', null);
                replayId = -1;
            }, function () {
                $location.search('page', vm.currentPage).search('search', vm.searchStr).search('view', null);
                replayId = -1;
            });
        };

        vm.stopPropagation = function (e) {
            e.stopPropagation();
        };

        vm.search = function (text) {
            $location.search('search', text).search('page', null);
            vm.currentPage = 1;

            loadReplays(text);
        };

        $scope.$watch('vm.searchStr', function(newVal, oldVal) {
            if (newVal != oldVal) {
                vm.search(newVal);
            }
        });
        

        if (replayId > 0) {
            vm.browseReplay(replayId);
        }

        return vm;
    };

    replaysController.$inject = injectParams;

    ewgApp.register.controller('ReplaysListController', replaysController);
});