(function(angular){
	var module = angular.module("components",[]);
	module.directive("treeGrid", [function(){
		return {
			restrict: 'E',
			templateUrl: 'treeGrid.html',
			scope: {
	            columns: '=',
	            data: '=',
	            model: "=",
	            onSelected: "&"
	        },
	        controller: ["$scope", "$filter", function($scope, $filter){
	        	$scope.toggle = function(row){
	        		row.display = !row.display;
	        		$scope.onChildSelected(row, false);
	        	};

	        	$scope.onChildSelected = function(selected, isChild, $event){
	        		selected.isChild = isChild;
	        		if($event){
	        			  $event.cancelBubble = true;
	        		}
	        		if($scope.onSelected){
	        			$scope.onSelected({"row" : selected, "isChild" : isChild});
	        		}
	        	};
	        }]
		};
	}])
	module.directive('ngIndeterminate', function($compile) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attributes) {
	            scope.$watch(attributes['ngIndeterminate'], function (value) {
	                element.prop('indeterminate', !!value);
	            });
	        }
	    };
	});
	module.directive("treeGridItem", [function(){
		return {
			restrict: 'E',
			templateUrl: 'treeGridSelectionItem.html',
			scope: {
				model: '=',
				columns: '=',
				group: '=',
				parent: '='
			},
			controller:["$scope", function($scope){
				if($scope.columns.columnType === "radio"){
					return;
				}
				$scope.markChilds = function(item, $event){
					var currentStatus = item.isChecked;
					if(this.parent){
						this.parent.indetermine = false;
						var list = this.parent.childs;
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
						if(item.childs && item.childs.length > 0){
							angular.forEach(item.childs, function(current){
								current.isChecked = item.isChecked;
							})
						}
					}
				};
			}]
		}
	}]);
})(angular);