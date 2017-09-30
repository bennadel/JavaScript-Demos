
// Import the core angular services.
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import the application components and services.
import { CoreModule } from "./shared/core.module";
import { ShellViewComponent } from "./views/shell-view.component";
import { ShellViewModule } from "./views/shell-view.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		// BrowserAnimationsModule,
		BrowserModule,
		CoreModule,
		ShellViewModule,
		RouterModule.forRoot(
			// I'm building the entire route tree with nested route configurations at 
			// boot-time. Currently, this feels like the lesser of all evils. With this
			// approach, I am not sure if I will ever have the ability to lazy-load? But,
			// this feels more straight-forward than anything I've seen so far. Nested 
			// routes seems to be a thing of much discussion, even today.
			// --
			// Read More: https://github.com/angular/angular/issues/10958
			// Read More: https://github.com/angular/angular/issues/10647
			ShellViewModule.routes,
			{
				// Tell the router to use the HashLocationStrategy.
				useHash: true,
				enableTracing: false
			}
		)
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
	],
	bootstrap: [
		ShellViewComponent
	]
})
export class AppModule {
	// ...
}
