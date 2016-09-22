
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { MyChildComponent } from "./my-child.component";

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule ],
	declarations: [ 
		AppComponent,
		MyChildComponent
	]
})
export class AppModule {
	// ... nothing to do here.
}
