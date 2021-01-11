
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { DraggableBlockComponent } from "./draggable-block.component";
import { TimelineMapComponent } from "./timeline-map.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	providers: [],
	declarations: [
		AppComponent,
		DraggableBlockComponent,
		TimelineMapComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
