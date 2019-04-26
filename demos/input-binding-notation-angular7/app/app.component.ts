
// Import the core angular services.
import { Component } from "@angular/core";
import { Directive } from "@angular/core";
import { Input } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p customProp="Testing [customProp]">
			Super directive...
		</p>
		<p customProp2="Testing [customProp2]">
			Sub directive...
		</p>
	`
})
export class AppComponent {
	// ....
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
/*
@Directive({
	selector: "[customProp]",
	// In the SUPER class, we're going to use the @Directive.inputs meta-data to tell
	// Angular that the class property, "customProp", maps to a template attribute of the
	// same name.
	inputs: [
		"customProp"
	]
})
export class CustomPropDirective {

	public customProp!: string; // Using definite assignment assertion.

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called whenever one of the input bindings is changed.
	public ngOnChanges( c: any ) : void {

		console.log( "Prop:", this.customProp );

	}

}

@Directive({
	selector: "[customProp2]",
	// In the SUB class, we're going to use the @Directive.inputs meta-data to tell
	// Angular that the inherited property maps to a template attribute with a different
	// name, "customProp2". So, both classes will use the same internal class property;
	// but, they will be using two different template attributes.
	inputs: [
		"customProp: customProp2"
	]
})
export class CustomProp2Directive extends CustomPropDirective {
	// ....
}
*/
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[customProp]",
	// In the SUPER class, we're going to use the @Directive.inputs meta-data to tell
	// Angular that the class property, "customProp", maps to a template attribute of the
	// same name.
	inputs: [
		"customProp"
	]
})
export class CustomPropDirective {

	public customProp!: string; // Using definite assignment assertion.

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called whenever one of the input bindings is changed.
	public ngOnChanges( c: any ) : void {

		console.log( "Prop:", this.customProp );

	}

}

@Directive({
	selector: "[customProp2]"
})
export class CustomProp2Directive extends CustomPropDirective {

	// Using @Input() meta-data in the sub-class WILL override the @Directive.inputs in
	// the super-class.
	@Input( "customProp2" )
	public customProp!: string; // Using definite assignment assertion.

}
