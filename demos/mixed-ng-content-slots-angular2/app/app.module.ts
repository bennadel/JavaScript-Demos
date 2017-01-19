
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./layout.component";

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule ],
	declarations: [ 
		AppComponent,
		LayoutComponent
	]
})
export class AppModule {
	// ...
}
