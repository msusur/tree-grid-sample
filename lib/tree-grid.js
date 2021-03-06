(function(angular){
	var module = angular.module("components")
	.directive("treeGrid", [function(){
		return {
			restrict: 'E',
			templateUrl: '/lib/treeGrid.html',
			scope: {
	            columns: '=',
	            data: '=',
	            model: '=',
	            maxPageCount: '=',
	            currentPage: '=',
	            selectedItem: '=',
	            onPageChange: '&'
	        },
	        controller: ["$scope", function($scope){
	        	$scope.currentPage = 1;
	        	if($scope.data && $scope.data.length > 0){
	        		$scope.selectedItem = $scope.data[0];
	        	}
	        	$scope.changePage = function(factor){
	        		var nextPage = $scope.currentPage + factor;
	        		if(nextPage > 0 && nextPage < $scope.maxPageCount + 1){
	        			$scope.currentPage = nextPage;
	        			if(typeof $scope.onPageChange === "function"){
	        				$scope.onPageChange();
	        			}
	        		}
	        	};
	        	$scope.selectedChange = function(row){
					row.display = !row.display;
				};	
				
				$scope.markChilds = function(item, $event){
					console.log($scope.selectedItem);
					if($scope.columns.columnType === "radio"){
						return;
					}

					var parent = this.parent;

					while(parent){
						parent.indetermine = false;
						var list = parent.children;
						for(var idx = 0; idx < list.length; idx ++){
							if(list[idx].isChecked !== currentStatus){
								parent.indetermine = true;
								break;
							}
						}
						if(!parent.indetermine){
							parent.isChecked = currentStatus;
						}

						parent = parent.parent;
					}
				
					if(item.children && item.children.length > 0){
						angular.forEach(item.children, function(current){
							current.isChecked = item.isChecked;
						})
					}
				};
	        }]
		};
	}]);
})(angular);