
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ChatComponent } from "./chat.component";
import { LayoutAComponent } from "./layout-a.component";
import { LayoutBComponent } from "./layout-b.component";
import { LayoutWrapperComponent } from "./layout-wrapper.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

var routes: Routes = [
	{
		// All routes in the application will share the "app" prefix.
		// --
		// NOTE: This shared prefix is here just to demonstrate that a non-empty ancestor
		// path is not sufficient for getting named-outlets to work. It's a direct-parent
		// segment kind of constraint.
		path: "app",
		children: [
			{
				// CAUTION: In order for the NAMED OUTLET child route to work (chat),
				// its parent segment must contain a non-empty path. As such, we're
				// using "main" for this wrapper component in order to ensure a non-
				// empty value.
				path: "main",
				component: LayoutWrapperComponent,
				children: [
					{
						path: "layout-a",
						component: LayoutAComponent
					},
					{
						path: "layout-b",
						component: LayoutBComponent
					},
					{
						outlet: "chat", // <--- Named outlet.
						path: "open",
						component: ChatComponent
					}
				]			
			}
		]
	},
	{
		path: "**",
		redirectTo: "/app/main/layout-a"
	}
];

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			routes,
			{
				// Tell the router to use the HashLocationStrategy.
				useHash: true
			}
		)
	],
	declarations: [
		AppComponent,
		ChatComponent,
		LayoutAComponent,
		LayoutBComponent,
		LayoutWrapperComponent
	],
	providers: [
		// CAUTION: We don't need to specify the LocationStrategy because we are setting
		// the "useHash" property in the Router module above.
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
