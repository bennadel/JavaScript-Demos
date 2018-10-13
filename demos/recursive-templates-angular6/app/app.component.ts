
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Tree {
	root: TreeNode;
}

interface TreeNode {
	label: string;
	children: TreeNode[];
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.htm"
})
export class AppComponent {
	
	public data: Tree;
	public selectedTreeNode: TreeNode | null;

	// I initialize the app component.
	constructor() {

		this.selectedTreeNode = null;
		this.data = {
			root: {
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
			}
		}

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I select the given tree node, and log it to the console.
	public selectNode( node: TreeNode ) : void {

		this.selectedTreeNode = node;

		console.group( "Selected Tree Node" );
		console.log( "Label:", node.label );
		console.log( "Children:", node.children.length );
		console.groupEnd();

	}

}
