
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<ul
			(click.capture)="logEvent( $event )"
			(click)="logEvent( $event )">

			<li>
				<a (click.once)="logClick( 'Testing .once' )">
					Testing <code>.once</code>
				</a>
			</li>
			<li>
				<a (click.self)="logClick( 'Testing .self' )">
					Testing <code>.self</code>
				</a>
			</li>
			<li>
				<a (click.once.self)="logClick( 'Testing .once.self' )">
					Testing <code>.once.self</code>
				</a>
			</li>
			<li>
				<a (click.stop)="logClick( 'Testing .stop' )">
					Testing <code>.stop</code>
				</a>
			</li>
			<li>
				<a href="https://google.com" (click.prevent)="logClick( 'Testing .prevent' )">
					Testing <code>.prevent</code>
				</a>
			</li>
			<li>
				<a
					href="https://google.com"
					target="_blank"
					(click.once.self.prevent)="logClick( 'Testing .once.self.prevent' )">
					Testing <code>.once.self.prevent</code>
				</a>
			</li>
			<li>
				<a (click.prevent.passive)="logClick( 'Testing .prevent.passive' )">
					Testing <code>.prevent.passive</code>
				</a>
			</li>
		</ul>
	`
})
export class AppComponent {

	// I log the click on the Anchor tag.
	public logClick( message: string ) : void {

		console.group( "Local Event Log" );
		console.log( message );
		console.groupEnd();

	}


	// I log the click at the parent (list) level.
	public logEvent( event: MouseEvent ) : void {

		console.group( "Parent Event Log" );
		console.log( "type:", event.type );
		console.log( "default prevented:", event.defaultPrevented );
		console.log( "phase:", event.eventPhase );
		console.log( "target:", event.target );
		console.groupEnd();

	}

}
