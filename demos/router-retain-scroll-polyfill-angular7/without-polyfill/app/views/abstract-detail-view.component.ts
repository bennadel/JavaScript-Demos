
// Import the core angular services.
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export abstract class AbstractDetailViewComponent implements OnInit, OnDestroy {
	
	public isLoading: boolean;
	public name: string;
	public timer: number;

	// I initialize the abstract detail view component.
	constructor( name: string ) {

		this.name = name;

		this.isLoading = true;
		this.timer = 0;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is being destroyed.
	public ngOnDestroy() : void {

		clearTimeout( this.timer );

	}


	// I get called once when the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.isLoading = true;
		this.timer = window.setTimeout(
			() => {

				this.isLoading = false;

			},
			Math.floor( Math.random() * 1000 )
		);

	}

}
