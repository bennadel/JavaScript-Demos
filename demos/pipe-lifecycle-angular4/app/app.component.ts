
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template: 
	`
		<p>
			Use message:
			<a (click)="useMessage( 'Hello' )">Hello</a> |
			<a (click)="useMessage( 'Good-bye' )">Good-bye</a>
		</p>

		<p>
			Pure: {{ message | length }}<br />
			Pure: {{ message | length }}<br />
			Impure: {{ message | lengthImpure }}<br />
			Impure: {{ message | lengthImpure }}<br />
		</p>


		<!-- This will render a new set of pipes in the SAME COMPONENT. -->
		<p>
			<a (click)="toggleDiv()">Toggle Div</a>
		</p>

		<p *ngIf="isShowingDiv">
			Pure: {{ message | length }}<br />
			Impure: {{ message | lengthImpure }}
		</p>


		<!-- This will render a new set of pipes in a CHILD COMPONENT. -->
		<p>
			<a (click)="toggleChild()">Toggle Child</a>
		</p>

		<my-child 
			*ngIf="isShowingChild"
			[message]="message">
		</my-child>
	`
})
export class AppComponent {

	public isShowingChild: boolean;
	public isShowingDiv: boolean;
	public message: string;

	// I initialize the app component.
	constructor() {

		this.asyncGroup( "Bootstrapping App Component" );
		this.isShowingChild = false;
		this.isShowingDiv = false;
		this.message = "Hello";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I toggle the rendering of the child component.
	public toggleChild() : void {

		this.asyncGroup( "Toggle Child Component" );
		this.isShowingChild = ! this.isShowingChild;

	}


	// I toggle the rendering of the div container.
	public toggleDiv() : void {

		this.asyncGroup( "Toggle Div" );
		this.isShowingDiv = ! this.isShowingDiv;

	}


	// I change the message being used in the template.
	public useMessage( message: string ) : void {

		this.message = message;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I wrap an asynchronous set of console statements in a group with the given name.
	private asyncGroup( name: string, duration: number = 100 ) : void {

		console.group( name );
		setTimeout( console.groupEnd, duration );

	}

}
