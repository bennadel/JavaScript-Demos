
// Import the core angular services.
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { TagsInputComponent } from "./tags-input.component";
import { TagsInputCoreComponent } from "./tags-input-core.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		CommonModule
	],
	exports: [
		TagsInputComponent,
		TagsInputCoreComponent
	],
	declarations: [
		TagsInputComponent,
		TagsInputCoreComponent
	]
})
export class TagsInputModule {
	// ...
}
