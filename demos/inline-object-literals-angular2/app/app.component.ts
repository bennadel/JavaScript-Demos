
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { LogLifecycleDirective } from "./log-lifecycle.directive";

@Component({
	selector: "my-app",
	directives: [ LogLifecycleDirective ],

	// When we define the <template> OutletContext, notice that we are using an inline
	// object literal as a means to provide the TemplateRef context. In Angular 1.x,
	// this object literal expression would have ended up creating a new object reference
	// in every digest. In Angular 2, however, the compiled proxy functions compare the 
	// object keys before returning the necessary object reference. As such, Angular 2 
	// doesn't end up creating a new object on every digest which, in turn, means that it
	// doesn't trigger unintended Input changes on the target directives.
	template:
	`
		<p>
			<a (click)="setThings( 'apples' )">Set Apples</a> &mdash;
			<a (click)="setThings( 'bananas' )">Set Bananas</a> &mdash;
			<a (click)="incrementCounter()">Increment counter</a>
		</p>

		<template 
			[ngTemplateOutlet]="myTemplate"
			[ngOutletContext]="{ items: things }">
		</template>

		<template #myTemplate let-items="items">
			
			<p logLifecycle>
				How do you like them {{ items }}?!
			</p>

			<p>
				Counter: {{ counter }} <em>(from lexical context)</em>.
			</p>

		</template>		
	`
})
export class AppComponent {

	// I hold the counter (which is being rendered in the template via a lexical binding).
	public counter: number;

	// I hold the type of things (which is being rendered in the template via the 
	// ngOutletContext and the template-local bindings).
	public things: string;


	// I initialize the component.
	constructor() {

		this.counter = 0;
		this.things = "apples";
	
	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I increment the counter by one.
	public incrementCounter() : void {

		this.counter++;

	}


	// I set the things.
	public setThings( newThings: string ) : void {

		this.things = newThings;

	}

}