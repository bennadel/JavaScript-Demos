
// Import the core angular services.
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppIconComponent } from "./app-icon.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		CommonModule
	],
	exports: [
		AppIconComponent
	],
	declarations: [
		AppIconComponent
	]
})
export class IconsModule {
	// ...
}
