(function(angular){
	angular.module("components",[])
		.directive('ngIndeterminate', function($compile) {
		    return {
		        restrict: 'A',
		        link: function(scope, element, attributes) {
		            scope.$watch(attributes['ngIndeterminate'], function (value) {
		                element.prop('indeterminate', !!value);
		            });
		        }
		    };
	});
})(angular);