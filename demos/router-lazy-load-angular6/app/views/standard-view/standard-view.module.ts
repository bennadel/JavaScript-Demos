
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { ActivityViewModule } from "./activity-view/activity-view.module";
import { LearnViewModule } from "./learn-view/learn-view.module";
import { PeopleViewModule } from "./people-view/people-view.module";
import { ProjectsViewModule } from "./projects-view/projects-view.module";
import { PrototypesViewModule } from "./prototypes-view/prototypes-view.module";
import { SharedModule } from "~/app/shared/shared.module";
import { StandardViewComponent } from "./standard-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		ActivityViewModule,
		LearnViewModule,
		PeopleViewModule,
		ProjectsViewModule,
		PrototypesViewModule,
		SharedModule
	],
	declarations: [
		StandardViewComponent
	]
})
export class StandardViewModule {
	
	static routes: Routes = [
		{
			path: "",
			component: StandardViewComponent,
			children: [
				...ActivityViewModule.routes,
				...LearnViewModule.routes,
				...PeopleViewModule.routes,
				...ProjectsViewModule.routes,
				...PrototypesViewModule.routes,

				// Handle the "no route" case.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "projects"
				}
			]
		}
	];

}
