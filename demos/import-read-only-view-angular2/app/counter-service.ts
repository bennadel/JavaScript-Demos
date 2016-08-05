
// Notice that we are exporting a simple value. The "normal" JavaScript mentality is
// that this value would be exported BY VALUE (ie, as a static copy); however, the 
// "import" and "export" features of ES6 don't work like your usual variable references.
// They exported as part of a live, read-only view into the module.
export var counter = 0;

// I increment the exported counter.
export function increment() {

	counter++;

}

// CAUTION: This is NOT how I would author a service in Angular 2 - this is just to 
// demonstrate the way the import / export work in ES6 (in the context of Angular 2).
