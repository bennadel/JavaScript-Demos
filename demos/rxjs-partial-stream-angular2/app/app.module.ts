
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { BusinessService } from "./business.service";

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule, HttpModule ],
	providers: [ BusinessService ],
	declarations: [ AppComponent ]
})
export class AppModule {
	// ...
}
