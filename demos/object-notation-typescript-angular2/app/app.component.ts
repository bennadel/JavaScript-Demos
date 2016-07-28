
// Import the core angular services.
import { Component } from "@angular/core";

// Here, we're defining an object interface to contain a collection of values. This 
// is nothing out of the ordinary and is, in fact, how we think about objects. According
// to the interface, however, the keys have to be strings.
// --
// NOTE: In TypeScript, object interfaces must be defined as having "string" or 
// "number" keys.
interface IData { 
	[ key: string ]: any;
}

@Component({
	selector: "my-app",
	template:
	`
		<p>
			<em>Check the console-logging</em>!
		</p>
	`
})
export class AppComponent {

	private data: IData;

	// I initialize the component.
	constructor() {

		// Populate our arbitrary collection of data.
		this.data = {
			foo: "bar",
			hello: "world"
		};

		// Now, let's try to access the data that we just populated. In the first 
		// approach, we going to use bracket-notation (which clearly uses a string-key).
		console.log( "[FOO]:", this.data[ "foo" ] );

		// Next, let's try to access the data using dot-notation. This approach should
		// be "functionally equivalent" as the previous approach.
		// --
		// CAUTION: While this is perfectly valid "JavaScript", TypeScript doesn't 
		// realize that "hello" is a "string" and raises a validation error.
		console.log( "[HELLO]:", this.data.hello );

	}

}
