
// Import the core angular services.
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Notice that we have TWO ATTRIBUTE SELECTORS defined in our directive selectors. This
// way, you can use [everySecond], [everyTwoSeconds], or BOTH at the same time.
@Directive({
	selector: "[everySecond] , [everyTwoSeconds]",
	outputs: [
		"everySecond",
		"everyTwoSeconds"
	]
})
export class PingDirective implements OnInit, OnDestroy {

	public everySecond: EventEmitter<number>;
	public everyTwoSeconds: EventEmitter<number>;

	private timers: number[];

	// I initialize the ping directive.
	constructor( elementRef: ElementRef ) {

		this.everySecond = new EventEmitter();
		this.everyTwoSeconds = new EventEmitter();
		this.timers = [];

		// Log that this constructor was called so that we can see what happens when both
		// of our directive selectors are matched on the same element at the same time.
		console.group( "PingDirective instantiated." );
		console.log( elementRef.nativeElement );
		console.groupEnd();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the directive is being destroyed.
	public ngOnDestroy() : void {

		this.timers.forEach( clearInterval );

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.timers.push(
			setInterval(
				() : void => {
					this.everySecond.emit( Date.now() );
				},
				1000
			),
			setInterval(
				() : void => {
					this.everyTwoSeconds.emit( Date.now() );
				},
				2000
			)
		);

	}

}
