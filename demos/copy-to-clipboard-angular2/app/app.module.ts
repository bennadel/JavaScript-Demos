
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ClipboardDirective } from "./clipboard.directive";
import { ClipboardService } from "./clipboard.service";

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule ],
	providers: [ ClipboardService ],
	declarations: [ 
		AppComponent,
		ClipboardDirective
	]
})
export class AppModule {
	// ...
}
