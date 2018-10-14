
// Import the core angular services.
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { TreeComponent } from "./tree.component";
import { TreeNodeComponent } from "./tree-node.component";

// Export the module data structures.
export { TreeNode } from "./tree.component"; 

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		CommonModule
	],
	exports: [
		// The root-level tree component is the only component that an external context
		// should be able to consume. We don't want people to break encapsulation and
		// try to use the TreeNodeComponent directly.
		TreeComponent
	],
	declarations: [
		TreeComponent,
		TreeNodeComponent
	]
})
export class TreeModule {
	// ...
}
