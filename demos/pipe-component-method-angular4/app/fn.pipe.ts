
// Import the core angular services.
import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";

@Pipe({
	name: "fn",
	pure: true
})
export class FnPipe implements PipeTransform {

	// I pass the first and rest arguments to the given function reference. This pipe
	// is designed to be used in a template to access a component method:
	// --
	// In a template: {{ valueA | fn : componentMethodRef : valueB }}
	// --
	// ... becomes the invocation: null.componentMethodRef( valueA, valueB ).
	public transform(
		templateValue: any,
		fnReference: Function,
		...fnArguments: any[]
		) : any {

		// Due to the way pipes receive arguments, we may have inputs on both sides of
		// the function reference. As such, let's join the two input sets.
		fnArguments.unshift( templateValue );

		// CAUTION: The function reference will NOT BE INVOKED IN THE COMPONENT CONTEXT.
		// As such, a component must bind the reference if it needs to use the "this"
		// scope within the function body.
		return( fnReference.apply( null, fnArguments ) );

	}

}
