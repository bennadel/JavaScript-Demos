
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
// import { SubModule } from "./sub.module";
import { subModuleRoutes } from "./sub.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		// SubModule, // <---- Import the feature module.
		RouterModule.forRoot(
			[
				...subModuleRoutes 
			],
			{
				// Tell the router to use the HashLocationStrategy.
				useHash: true
			}
		)
	],
	declarations: [
		AppComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
