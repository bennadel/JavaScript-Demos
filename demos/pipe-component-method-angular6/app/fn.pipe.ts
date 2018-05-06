
// Import the core angular services.
import { Optional } from "@angular/core";
import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";
import { Self } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I provide a dependency-injection token for the Fn pipe execution context.
export class FnPipeContext {
	// ...
}

@Pipe({
	name: "fn",
	pure: true
})
export class FnPipe implements PipeTransform {

	private context: any;

	// I initialize the fn-pipe.
	// --
	// NOTE: We are injecting an OPTIONAL context for function execution.
	constructor( @Optional() @Self() context: FnPipeContext ) {

		this.context = context || null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I pass the first and rest arguments to the given function reference. This pipe
	// is designed to be used in a template to access a component method:
	// --
	// In a template: {{ valueA | fn : componentMethodRef : valueB }}
	// --
	// ... becomes the invocation: context.componentMethodRef( valueA, valueB ).
	public transform(
		headArgument: any,
		fnReference: Function,
		...tailArguments: any[]
		) : any {

		// Due to the way pipes receive arguments, we can have inputs on both sides of
		// the function reference. As such, let's join the two input sets when invoking
		// the given Function reference.
		return( fnReference.apply( this.context, [ headArgument, ...tailArguments ] ) );

	}

}
