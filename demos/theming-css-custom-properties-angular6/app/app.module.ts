
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppCanvasComponent } from "./app-canvas.component";
import { AppComponent } from "./app.component";
import { AppHeaderComponent } from "./app-header.component";
import { AppLPanelComponent } from "./app-lpanel.component";
import { AppRPanelComponent } from "./app-rpanel.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule
	],
	declarations: [
		AppCanvasComponent,
		AppComponent,
		AppHeaderComponent,
		AppLPanelComponent,
		AppRPanelComponent
	]
})
export class AppModule {
	// ...
}
