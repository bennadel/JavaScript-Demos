
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { HashLocationStrategy } from "@angular/common";
import { Location } from "@angular/common";
import { LocationStrategy } from "@angular/common";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { FolderComponent } from "./folder.component";
import { FolderTreeComponent } from "./folder-tree.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	providers: [
		Location,
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		}
	],
	declarations: [
		AppComponent,
		FolderComponent,
		FolderTreeComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
