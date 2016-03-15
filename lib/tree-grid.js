(function(angular){
	var module = angular.module("components")
	.directive("treeGrid", [function(){
		return {
			restrict: 'E',
			//templateUrl: '/lib/treeGrid.html',
			templateUrl: '/lib/recursiveGrid.html',
			scope: {
	            columns: '=',
	            data: '=',
	            model: '=',
	            maxPageCount: '=',
	            currentPage: '=',
	            onSelected: '&',
	            onPageChange: '&'
	        },
	        controller: ["$scope", "$filter", function($scope, $filter){
	        	$scope.toggle = function(row){
	        		row.display = !row.display;
	        		
	        		$scope.onChildSelected(row, false);
	        	};
	        	$scope.currentPage = 1;

	        	$scope.changePage = function(factor){
	        		var nextPage = $scope.currentPage + factor;
	        		if(nextPage > 0 && nextPage < $scope.maxPageCount + 1){
	        			$scope.currentPage = nextPage;
	        			if(typeof $scope.onPageChange === "function"){
	        				$scope.onPageChange();
	        			}
	        		}
	        	};

	        	$scope.onChildSelected = function(selected, isChild, $event){
	        		selected.isChild = isChild;
	        		if($event){
	        			  $event.cancelBubble = true;
	        		}
	        		if(typeof $scope.onSelected === "function"){
	        			$scope.onSelected({"row" : selected, "isChild" : isChild});
	        		}
	        	};
	        }]
		};
	}])
	.directive("treeGridItem", [function(){
		return {
			restrict: 'E',
			templateUrl: '/lib/treeGridSelectionItem.html',
			scope: {
				model: '=',
				columns: '=',
				group: '=',
				parent: '=',
				onSelected: '&'
			},
			transclude: true,
			controller:["$scope", function($scope){
				if($scope.columns.columnType === "radio"){
					return;
				}

				$scope.markChilds = function(item, $event){
					var currentStatus = item.isChecked;
					if(this.parent){
						this.parent.indetermine = false;
						var list = this.parent.children;
						for(var idx = 0; idx < list.length; idx ++){
							if(list[idx].isChecked !== currentStatus){
								this.parent.indetermine = true;
								break;
							}
						}
						if(!this.parent.indetermine){
							this.parent.isChecked = currentStatus;
						}
					}else{
						if(item.children && item.children.length > 0){
							angular.forEach(item.children, function(current){
								current.isChecked = item.isChecked;
							})
						}
					}
				};
			}]
		}
	}]);
})(angular);