(function(angular){
	angular.module("components")
		.directive("searchBox", [function(){
			return {
				restrict: 'E',
				templateUrl: '/lib/searchBox.html',
				scope:{
					title: '=',
					inputText: '=',
					buttonModel: '=',
					onSearchClicked: '&'
				},
				controller:["$scope", function($scope){
					$scope.clicked = function(){
						$scope.onSearchClicked();
					};
				}]
			};
		}]);
})(angular);