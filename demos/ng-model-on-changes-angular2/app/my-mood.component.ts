// Declaring module interface so TypeScript compiler doesn't complain.
declare var module : { id: string };

// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { OnChanges } from "@angular/core";
import { SimpleChange } from "@angular/core";
import { SimpleChanges } from "@angular/core";

// I provide a widget that allows 5-levels of mood to be selected. Each mood level is 
// represented by a different ASCII emoticon. This component uses a one-way data-flow 
// and the OnPush change-detection strategy.
// --
// NOTE: This component knows nothing about Forms.
@Component({
	moduleId: module.id,
	selector: "my-mood",
	inputs: [ "value" ],
	outputs: [ "valueChange" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		"[class.--happy]": "( value > 0 )",
		"[class.--sad]": "( value < 0 )"
	},
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


	// I emit a valueChange event to increase the mood level.
	public goHappier() : void {

		if ( ! this.isHappiest() ) {

			this.valueChange.next( this.value + 1 );
	
		}

	}


	// I emit a valueChange event to decrease the mood level.
	public goSadder() : void {

		if ( ! this.isSaddest() ) {

			this.valueChange.next( this.value - 1 );

		}

	}


	// I determine if the component is currently at the highest mood level.
	public isHappiest() : boolean {

		return( this.value === 2 );

	}


	// I determine if the component is currently at the lowest mood level.
	public isSaddest() : boolean {

		return( this.value === -2 );

	}


	// I get called any time the inputs are bound to new values.
	public ngOnChanges( changes: SimpleChanges ) : void {

		// Count any value changes after the initial binding.
		// --
		// NOTE: Since we only have ONE input, we know that the changes collection will 
		// always contain a "value" property; as such, we don't have to check for the 
		// key existence before checking its state.
		if ( ! changes[ "value" ].isFirstChange() ) {

			this.changeCount++;

		}

	}

}
