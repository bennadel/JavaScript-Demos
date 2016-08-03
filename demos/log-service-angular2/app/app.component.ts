
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Logger } from "./default-log.service";

@Component({
	selector: "my-app",
	template:
	`
		<ul>
			<li><a (click)="test( 'log' )">Log something.</a></li>
			<li><a (click)="test( 'error' )">Error something.</a></li>
			<li><a (click)="test( 'info' )">Info something.</a></li>
			<li><a (click)="test( 'warn' )">Warn something.</a></li>
			<li><a (click)="testGroup()">Group something.</a></li>
		</ul>
	`
})
export class AppComponent {

	private logger: Logger;


	// I initialize the component.
	// --
	// NOTE: Even though we are requesting the class of TYPE "Logger", we're actually
	// going to receive the instance of ConsoleLogService since that is being overridden
	// at the platform level (ie, in the bootstrapping).
	constructor( logger: Logger ) {

		this.logger = logger;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I test the basic log levels of the logger.
	public test( level: string ) : void {

		this.logger[ level ]( "Dang, logService.%s() is kind of cool!", level );

	}


	// I test the grouping of log output.
	public testGroup() : void {

		this.logger.group( "Group Test" );
		this.logger.log( "Inside a group." );
		this.logger.error( "Inside a group." );
		this.logger.info( "Inside a group." );
		this.logger.warn( "Inside a group." );
		this.logger.groupEnd();

	}

}
