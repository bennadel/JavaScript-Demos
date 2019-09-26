
// Import the core angular services.
import { Component } from "@angular/core";
import { ComponentFactoryResolver } from "@angular/core";
import { ViewContainerRef } from "@angular/core";

// Import the application components and services.
import { ProjectsAltComponent } from "./projects-alt.component";
import { ProjectsComponent } from "./projects.component";
import { UserConfigService } from "./user-config.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-projects-switcher",
	styles: [ `:host { display: none ; }` ],
	template:
	`
		<!-- Switcher for Projects variations. -->
	`
})
export class ProjectsSwitcherComponent {

	constructor(
		componentFactoryResolver: ComponentFactoryResolver,
		userConfigService: UserConfigService,
		viewContainerRef: ViewContainerRef
		) {

		var factory = ( userConfigService.isUsingNewHawtness )
			? componentFactoryResolver.resolveComponentFactory( ProjectsAltComponent )
			: componentFactoryResolver.resolveComponentFactory( ProjectsComponent )
		;

		viewContainerRef.createComponent( factory );

	}

}
