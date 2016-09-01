/*
	@license Angular Treeview version 0.1.6-beta
	ⓒ 2016 AHN JAE-HA https://github.com/disfeng/angular.treeview.lifecpp
	License: MIT


	[TREE attribute]
	angular-treeview: the treeview directive
	tree-id : each tree's unique id.
	tree-model : the tree model on $scope.
	node-id : each node's id
	node-label : each node's label
	node-children: each node's children

	<div
		data-angular-treeview="true"
		data-tree-id="tree"
		data-tree-model="roleList"
		data-node-id="roleId"
		data-node-label="roleName"
		data-node-children="children" >
	</div>
*/

(function ( angular ) {
	'use strict';

	angular.module( 'angularTreeview', [] ).directive( 'treeModel', ['$compile', function( $compile ) {
		return {
			restrict: 'A',
			link: function ( scope, element, attrs ) {
				//tree id
                var open = false;
		var treeId = attrs.treeId;
                if(treeId=='search'){
                    open = true;
                }
				//tree model
				var treeModel = attrs.treeModel;

				//node id
				var nodeId = attrs.nodeId || 'id';

				//node label
				var nodeLabel = attrs.nodeLabel || 'label';

				//children
				var nodeChildren = attrs.nodeChildren || 'children';

				//tree template
				var template =
					'<ul>' +
						'<li data-ng-repeat="node in ' + treeModel + '" data-role-id="{{node.id}}" ng-class=\"{true: \'pro\', false: \'pub\'}[node.permission]\">' +
							'<i class="collapsed" data-ng-show="(node.isParent && !node.collapsed) && (!node.isMath && node.isParent)" data-ng-click="' + treeId + '.selectNodeLabel(node)"></i>' +
							'<i class="expanded" data-ng-show="(node.isParent && node.collapsed) || (node.isMath && node.isParent)" data-ng-click="' + treeId + '.selectNodeLabel(node)"></i>' +
							'<i class="normal" data-ng-hide="node.isParent"></i> ' +
							'<span data-ng-class="node.selected" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +
							'<div data-ng-show="node.collapsed || node.isMath" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + '></div>' +
						'</li>' +
					'</ul>';

        var template_search =
            '<ul>' +
                '<li data-ng-repeat="node in ' + treeModel + '">' +
                    '<i class="collapsed" data-ng-show="node.' + nodeChildren + '.length && node.collapsed" data-ng-click="' + treeId + '.selectNodeLabel(node)"></i>' +
                    '<i class="expanded" data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="' + treeId + '.selectNodeLabel(node)"></i>' +
                    '<i class="normal" data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
                    '<span data-ng-class="node.selected" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +
                    '<div data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + '></div>' +
                '</li>' +
            '</ul>';
				//check tree id, tree model
				if( treeId && treeModel ) {

					//root node
					if( attrs.angularTreeview ) {

						//create tree object if not exists
						scope[treeId] = scope[treeId] || {};

						//if node head clicks,
						scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function( selectedNode ){

							//Collapse or Expand
							selectedNode.collapsed = !selectedNode.collapsed;
						};
						//if node label clicks,
						scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function( selectedNode ){
                            selectedNode.collapsed = !selectedNode.collapsed;
							//remove highlight from previous node
							if( scope[treeId].currentNode && scope[treeId].currentNode.selected ) {
								scope[treeId].currentNode.selected = undefined;
							}
							//set highlight to selected node
							selectedNode.selected = 'selected';

							//set currentNode
							scope[treeId].currentNode = selectedNode;
						};
					}
          if(open){
              element.html('').append( $compile( template_search )( scope ) );
          }else{
              //Rendering template.
              element.html('').append( $compile( template )( scope ) );
          }
				}
			}
		};
	}]);
})( angular );
