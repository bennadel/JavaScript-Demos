
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { BingoBoardComponent } from "./bingo-board.component";
import { FormComponent } from "./form.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	providers: [],
	declarations: [
		AppComponent,
		BingoBoardComponent,
		FormComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
