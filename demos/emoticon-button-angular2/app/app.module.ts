
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { EmoticonButtonComponent } from "./emoticon-button.component";

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule ],
	declarations: [ 
		AppComponent,
		EmoticonButtonComponent
	]
})
export class AppModule {
	// ...
}
