
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface TreeNode {
	label: string;
	children: TreeNode[];
}

@Component({
	selector: "my-tree",
	inputs: [ "rootNode", "selectedNode" ],
	outputs: [ "selectEvents: select" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./tree.component.less" ],
	template:
	`
		<my-tree-node
			[node]="rootNode"
			[selectedNode]="selectedNode"
			(select)="selectEvents.emit( $event )">
		</my-tree-node>
	`
})
export class TreeComponent {

	public rootNode: TreeNode | null;
	public selectedNode: TreeNode | null;
	public selectEvents: EventEmitter<TreeNode>;
	
	// I initialize the tree component.
	constructor() {

		this.rootNode = null;
		this.selectedNode = null;
		this.selectEvents = new EventEmitter();

	}

}
