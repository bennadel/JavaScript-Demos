
// Import the core angular services.
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export abstract class AbstractListViewComponent implements OnInit, OnDestroy {
	
	public isLoading: boolean;
	public items: string[];
	public name: string;
	public timer: number;

	// I initialize the abstract list view component.
	constructor( name: string ) {

		this.name = name;

		this.isLoading = true;
		this.items = null;
		this.timer = null;

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
		this.timer = setTimeout(
			() => {

				this.isLoading = false;
				this.items = [];
				
				for ( var i = 0 ; i < 100 ; i++ ) {

					this.items.push( `Item ${ i } for view, ${ this.name }.` );

				}

			},
			Math.floor( Math.random() * 1000 )
		);

	}

}
