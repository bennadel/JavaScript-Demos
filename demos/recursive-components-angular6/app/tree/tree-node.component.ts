
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";

// Import the application components and services.
import { TreeNode } from "./tree.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-tree-node",
	inputs: [ "node", "selectedNode" ],
	outputs: [ "selectEvents: select" ],
	host: {
		"[class.selected]": "( node === selectedNode )"
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./tree-node.component.less" ],
	template:
	`
		<a (click)="selectEvents.emit( node )" class="label">
			{{ node.label }}
		</a>

		<div *ngIf="node.children.length" class="children">

			<ng-template ngFor let-child [ngForOf]="node.children">

				<my-tree-node
					[node]="child"
					[selectedNode]="selectedNode"
					(select)="selectEvents.emit( $event )">
				</my-tree-node>

			</ng-template>

		</div>
	`
})
export class TreeNodeComponent {

	public node: TreeNode | null;
	public selectedNode: TreeNode | null;
	public selectEvents: EventEmitter<TreeNode>;
	
	// I initialize the tree node component.
	constructor() {

		this.node = null;
		this.selectedNode = null;
		this.selectEvents = new EventEmitter();

	}

}
