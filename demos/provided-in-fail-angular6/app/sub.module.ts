// Import the core angular services.
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { SubComponent } from "./sub.component";
import { SubAComponent } from "./sub-a.component";
import { SubBComponent } from "./sub-b.component";
import { SubCComponent } from "./sub-c.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export var subModuleRoutes: Routes = [
	{
		path: "sub",
		loadChildren: "./sub.module#SubModule" // <---- Layz loading the module.
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				// NOTE: Since this module is being lazy-loaded, the root segment has
				// already been defined (as part of the lazy-load configuration). As
				// such, the root segment here is empty.
				path: "",
				component: SubComponent,
				children: [
					{
						path: "a",
						component: SubAComponent
					},
					{
						path: "b",
						component: SubBComponent
					},
					{
						path: "c",
						component: SubCComponent
					}
				]
			}
		])
	],
	declarations: [
		SubComponent,
		SubAComponent,
		SubBComponent,
		SubCComponent
	]
})
export class SubModule {
	// ...
}
