
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			<a href="#">Native Href link</a> (experiment control)
		</p>

		<p class="actions">
			<a (click)="logClick( 'Item one' )">Item One</a>
			<a (click)="logClick( 'Item two' )">Item Two</a>
			<a (click)="logClick( 'Item three' )">Item Three</a>
			<a (click)="logClick( 'Item four' )">Item Four</a>
		</p>

		<!-- NOTE: The [x-no-tabbing] attribute will cause demo Directive to be omitted. -->
		<p class="actions">
			<a x-no-tabbing (click)="logClick( 'Item one' )">Item One</a>
			<a x-no-tabbing (click)="logClick( 'Item two' )">Item Two</a>
			<a x-no-tabbing (click)="logClick( 'Item three' )">Item Three</a>
			<a x-no-tabbing (click)="logClick( 'Item four' )">Item Four</a>
		</p>
	`
})
export class AppComponent {

	// I log the click event.
	public logClick( value: string ) : void {

		console.group( "Clicked Anchor" );
		console.log( value );
		console.groupEnd();

	}

}
