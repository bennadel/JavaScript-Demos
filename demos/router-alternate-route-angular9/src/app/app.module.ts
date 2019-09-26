
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ProjectDetailComponent } from "./project-detail.component";
import { ProjectsAltComponent } from "./projects-alt.component";
import { ProjectsComponent } from "./projects.component";
import { ProjectsSwitcherComponent } from "./projects-switcher.component";
import { UserConfigService } from "./user-config.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			[
				{
					path: "",
					pathMatch: "full",
					redirectTo: "app"
				},
				{
					path: "app",
					children: [
						{
							path: "projects",
							// NOTE: The Projects Switcher will dynamically load either
							// the ProjectsComponent or the ProjectsAltComponent as the
							// list-page implementation.
							component: ProjectsSwitcherComponent,
							children: [
								{
									path: ":projectID",
									component: ProjectDetailComponent
								}
							]
						}
					]
				}
			],
			{
				// Tell the router to use the hash instead of HTML5 pushstate.
				useHash: true,

				// Allow ActivatedRoute to inherit params from parent segments. This
				// will force params to be uniquely named, which will help with debugging
				// and maintenance of the app.
				paramsInheritanceStrategy: "always",

				// Enable the Angular 6+ router features for scrolling and anchors.
				scrollPositionRestoration: "enabled",
				anchorScrolling: "enabled",
				enableTracing: false
			}
		)
	],
	providers: [],
	declarations: [
		AppComponent,
		ProjectDetailComponent,
		ProjectsComponent,
		ProjectsAltComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}
