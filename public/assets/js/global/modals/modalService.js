angular.module('musikdkModalModule', ['ui.bootstrap'])
.service('musikdkModal', ['$modal',
    function ($modal) {

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: '/app/partials/modal.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {

            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = modalDefaults;
            var tempModalOptions = modalOptions;

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {

                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.data = tempModalOptions;
                    $scope.data.ok = function (result) {
                        $modalInstance.close(result);
                    };
                    $scope.data.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                }
            }
            

            return $modal.open(tempModalDefaults).result;
        };

    }]);