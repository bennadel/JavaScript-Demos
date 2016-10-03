
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { MyMoodComponent } from "./my-mood.component";
import { MyMoodFormDirective } from "./my-mood-form.directive";

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ BrowserModule, FormsModule ],
	declarations: [
		AppComponent,
		MyMoodComponent,
		MyMoodFormDirective
	]
})
export class AppModule {
	// ... nothing to do here.
}
