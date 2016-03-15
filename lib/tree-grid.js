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
	        	$scope.$watch("selectedItem", function(newV, oldV){
	        		if(newV){
	        			debugger;
	        		}
	        	});
	        	$scope.changePage = function(factor){
	        		var nextPage = $scope.currentPage + factor;
	        		if(nextPage > 0 && nextPage < $scope.maxPageCount + 1){
	        			$scope.currentPage = nextPage;
	        			if(typeof $scope.onPageChange === "function"){
	        				$scope.onPageChange();
	        			}
	        		}
	        	};
	        }]
		};
	}])
	.directive("treeGridItem", [function(){
		return {
			restrict: 'E',
			templateUrl: '/lib/treeGridItem.html',
			scope: {
				model: '=',
				columns: '=',
				group: '=',
				parent: '=',
				selection: '='
			},
			transclude: true,
			controller:["$scope", function($scope){
				$scope.$watch("selectedItem", function(newV, oldV){
	        		$scope.selection = newV;
	        	});
				$scope.selectedChange = function(row){
					row.display = !row.display;
				};	
		
				$scope.markChilds = function(item, $event){
					var currentStatus = item.isChecked;
					if(currentStatus){
						$scope.selection = item;
					}
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
		}
	}]);
})(angular);