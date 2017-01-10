
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { GreeterService } from "./greeter.service";
import { NewableGreeterService } from "./greeter.service";

@Component({
	moduleId: module.id,
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<strong>Sarah:</strong> {{ sarah.getGreeting() }}<br />
		<strong>Tina:</strong> {{ tina.getGreeting() }}<br />
	`
})
export class AppComponent {

	// These two properties are going to be of Type GreeterService, once we instantiate
	// the GreeterService, which is itself of Type NewableGreeterService.
	public sarah: GreeterService;
	public tina: GreeterService;


	// I initialize the component.
	// --
	// NOTE: We are injecting the CLASS GreeterService, which is of Type NewableGreeterService
	// which means that it can be instantiated to create instance of Type GreeterService.
	constructor( GreeterService: NewableGreeterService ) {
		
		this.sarah = new GreeterService( "Sarah" );
		this.tina = new GreeterService( "Tina" );

	}

}
