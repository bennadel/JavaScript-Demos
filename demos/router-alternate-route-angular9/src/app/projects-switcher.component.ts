
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

	private componentFactoryResolver: ComponentFactoryResolver;
	private userConfigService: UserConfigService;
	private viewContainerRef: ViewContainerRef;

	// I initialize the switcher component.
	// --
	// NOTE: The injected ViewContainerRef is the container that THIS COMPONENT is
	// rendered WITHIN - it is NOT the view for this component's contents.
	constructor(
		componentFactoryResolver: ComponentFactoryResolver,
		userConfigService: UserConfigService,
		viewContainerRef: ViewContainerRef
		) {

		this.componentFactoryResolver = componentFactoryResolver;
		this.userConfigService = userConfigService;
		this.viewContainerRef = viewContainerRef;
	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// Imagine that the UserConfigService holds the feature-flag that drives the
		// version of the Projects List that the user is going to see. In order to load
		// the selected component dynamically, we're going to use the Component Factory
		// Resolver and then load the selected component into the ViewContainerRef as a
		// SIBLING element to the Switcher (this) component (just like the RouterOutlet
		// directive does).
		var factory = ( this.userConfigService.isUsingNewHawtness )
			? this.componentFactoryResolver.resolveComponentFactory( ProjectsAltComponent )
			: this.componentFactoryResolver.resolveComponentFactory( ProjectsComponent )
		;

		// Insert as a SIBLING element.
		this.viewContainerRef.createComponent( factory );

	}

}
