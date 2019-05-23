
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { ViewChild } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-confirm",
	inputs: [ "message" ],
	outputs: [ "valueEvents: value" ],
	queries: {
		yesRef: new ViewChild( "yesRef" )
	},
	styleUrls: [ "./confirm.component.less" ],
	template:
	`
		<form (submit)="processForm( true )" class="form">

			<div class="message">
				{{ message }}
			</div>

			<div class="buttons">
				<input
					#yesRef
					type="submit"
					value="Yes"
					class="submit"
				/>
				
				<input
					(click)="processForm( false )"
					type="button"
					value="No"
					class="submit submit--cancel"
				/>
			</div>

		</form>
	`
})
export class ConfirmComponent {

	public message!: string;
	public yesRef!: ElementRef;

	private valueEvents: EventEmitter<boolean>;

	// I initialize the confirm component.
	constructor() {

		this.valueEvents = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the view has been initialized.
	public ngAfterViewInit() : void {

		this.yesRef.nativeElement.focus();

	}

	// I process the confirmation form.
	public processForm( value: boolean ) : void {

		this.valueEvents.emit( value );

	}

}
