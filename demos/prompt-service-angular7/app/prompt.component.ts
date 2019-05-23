
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { ViewChild } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-prompt",
	inputs: [ "message", "defaultValue" ],
	outputs: [ "valueEvents: value" ],
	queries: {
		valueRef: new ViewChild( "valueRef" )
	},
	styleUrls: [ "./prompt.component.less" ],
	template:
	`
		<form (submit)="processPrompt()" class="form">

			<div class="message">
				{{ message }}
			</div>

			<input
				#valueRef
				type="text"
				name="value"
				[(ngModel)]="form.value"
				class="input"
			/>

			<div class="buttons">
				<input
					type="submit"
					value="Submit"
					class="submit"
				/>
				
				<input
					(click)="cancelPrompt()"
					type="button"
					value="Cancel"
					class="submit submit--cancel"
				/>
			</div>

		</form>
	`
})
export class PromptComponent {

	public defaultValue!: string;
	public form: {
		value: string;
	};
	public message!: string;
	public valueRef!: ElementRef;

	private valueEvents: EventEmitter<string | null>;

	// I initialize the prompt component.
	constructor() {

		this.form = {
			value: ""
		};
		this.valueEvents = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I emit "null" as the value-event.
	public cancelPrompt() : void {

		// NOTE: I am emitting null here, instead of the empty-string, in order to try
		// and keep alignment with how window.prompt() works in the browser.
		this.valueEvents.emit( null );

	}


	// I get called once after the view has been initialized.
	public ngAfterViewInit() : void {

		this.valueRef.nativeElement.focus();

	}


	// I get called after input bindings have been updated.
	public ngOnChanges() : void {

		this.form.value = this.defaultValue;

	}


	// I emit the user-provided value as the value-event.
	public processPrompt() : void {

		this.valueEvents.emit( this.form.value );

	}

}
