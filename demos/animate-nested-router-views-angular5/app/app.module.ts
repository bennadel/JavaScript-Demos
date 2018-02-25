
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ModalOneViewComponent } from "./modal-one-view.component";
import { ModalTwoViewComponent } from "./modal-two-view.component";
import { ModalViewComponent } from "./modal-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		RouterModule.forRoot(
			[
				{
					path: "app",
					children: [
						{
							path: "modal",
							component: ModalViewComponent,
							children: [
								{
									path: "one",
									component: ModalOneViewComponent
								},
								{
									path: "two",
									component: ModalTwoViewComponent
								}
							]
						}
					]
				}
			],
			{
				// Tell the router to use the HashLocationStrategy.
				useHash: true,
				enableTracing: false
			}
		)
	],
	declarations: [
		AppComponent,
		ModalOneViewComponent,
		ModalTwoViewComponent,
		ModalViewComponent
	],
	providers: [
		// CAUTION: We don't need to specify the LocationStrategy because we are setting
		// the "useHash" property in the Router module above (which will be setting the
		// strategy for us).
		// --
		// {
		// 	provide: LocationStrategy,
		// 	useClass: HashLocationStrategy
		// }
	]
})
export class AppModule {
	// ...
}
