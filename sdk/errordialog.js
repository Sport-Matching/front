/**
 * Created by robin on 4/24/16.
 */

(function () {
    angular.module("appSdk").factory("errorDialogMd", ['$mdDialog', function ($mdDialog) {
        var Factory = {};

        Factory.errorMessage = function(data)
        {
            var message = data.Data;
            message += " (HTTP code: " + data.Status + ")";
            return message;
        };

        Factory.errorDialog = function(data)
        {
            $mdDialog.show(
                $mdDialog.alert()
                    // .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Error')
                    .textContent(Factory.errorMessage(data))
                    .ok('OK')
            );
        };

        return Factory;
    }]);
})();