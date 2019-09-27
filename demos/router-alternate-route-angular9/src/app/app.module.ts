
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
							// Normally, the "projects" path would load the existing
							// ProjectsComponent; however, imagine that we are currently
							// testing an alternate implementation of the design behind a
							// feature flag. In order to keep the Routes the same across
							// the experiment, we are going to use a "switcher" component
							// to act as a proxy that conditionally and dynamically loads
							// the appropriate version depending on the feature flag.
							// --
							// NOTE: The Projects Switcher will dynamically load either
							// the ProjectsComponent or the ProjectsAltComponent as a
							// "sibling" DOM element, just like the RouterOutlet does.
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
		// CAUTION: In all the demos (and the documentation) that I've seen about the
		// ComponentFactoryResolver, they always include the dynamic components as
		// "entryComponents"; however, that did not seem to work for me. For reasons I
		// don't fully understand, including the dynamic components as "declarations"
		// was sufficient to get this working.
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
