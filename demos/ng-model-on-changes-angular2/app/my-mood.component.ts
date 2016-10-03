declare var module : { id: string };

// Import the core angular services.
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { OnChanges } from "@angular/core";
import { SimpleChange } from "@angular/core";
import { SimpleChanges } from "@angular/core";

// Import the application services.

@Component({
	moduleId: module.id,
	selector: "my-mood",
	inputs: [ "value" ],
	outputs: [ "valueChange" ],
	styleUrls: [ "./my-mood.component.css" ],
	template:
	`
		<div class="__controls">

			<a (click)="goSadder()" class="__sadder">sadder</a>
			<a (click)="goHappier()" class="__happier">happier</a>
		
			<span [ngSwitch]="value" class="__emoticon">
				<template [ngSwitchCase]="-2"> :\`( </template>
				<template [ngSwitchCase]="-1"> :( </template>
				<template [ngSwitchCase]="0"> :| </template>
				<template [ngSwitchCase]="1"> :) </template>
				<template [ngSwitchCase]="2"> :D </template>
			</span>

		</div>

		<div *ngIf="( changeCount > 4 )" class="__message">
			You seem unsure &mdash; maybe you should talk to someone.
		</div>
	`
})
export class MyMoodComponent implements OnChanges {

	public value: number;
	public valueChange: EventEmitter<number>;

	private changeCount: number;


	// I initialize the component.
	constructor() {

		this.changeCount = 0;
		this.value = 0;
		this.valueChange = new EventEmitter();
		
	}


	// ---
	// PUBLIC METHODS.
	// ---


	public goHappier() : void {

		if ( ! this.isHappiest() ) {

			this.valueChange.next( this.value + 1 );
	
		}

	}


	public goSadder() : void {

		if ( ! this.isSaddest() ) {

			this.valueChange.next( this.value - 1 );

		}

	}


	public isHappiest() : boolean {

		return( this.value === 2 );

	}


	public isSaddest() : boolean {

		return( this.value === -2 );

	}


	public ngOnChanges( changes: SimpleChanges ) : void {

		if ( ( "value" in changes ) && ! changes[ "value" ].isFirstChange() ) {

			this.changeCount++;

		}

	}

}
