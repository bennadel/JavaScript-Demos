
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { TreeNode } from "./tree/tree.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<my-tree
			[rootNode]="tree"
			[selectedNode]="selectedTreeNode"
			(select)="handleSelection( $event )">
		</my-tree>
	`
})
export class AppComponent {
	
	public tree: TreeNode;
	public selectedTreeNode: TreeNode | null;

	// I initialize the app component.
	constructor() {

		this.selectedTreeNode = null;
		this.tree = {
			label: "first",
			children: [
				{
					label: "second-a",
					children: [
						{
							label: "third-first",
							children: [
								{
									label: "ferth",
									children: [
										{
											label: "fiver",
											children: []
										}
									]
								}
							]
						}
					]
				},
				{
					label: "second-b",
					children: [
						{
							label: "third",
							children: []
						}
					]
				}
			]
		};

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the selection event from the tree component.
	public handleSelection( node: TreeNode ) : void {

		this.selectedTreeNode = node;

		console.group( "Selected Tree Node" );
		console.log( "Label:", node.label );
		console.log( "Children:", node.children.length );
		console.groupEnd();

	}

}
