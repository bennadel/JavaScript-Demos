
// Import the core angular services.
import{ Directive } from "@angular/core";
import{ OnInit } from "@angular/core";
import{ TemplateRef } from "@angular/core";
import{ ViewContainerRef } from "@angular/core";


// I generate Class definitions that exposes custom sub-properties off the "context" 
// namespace. This class always exposes:
// --
// * render (aliased as "template")
// * context
// --
// ... however, you can additionally provide other sub-properties of "conext" to make
// the binding syntax easier to read. 
export function createTemplateRenderer( ...propertyNames: string[] ) {

	// Let's convert the incoming sub-property names into namespaced inputs off the 
	// "context" object. For example, convert "foo" into "context.foo".
	var contextProperties = propertyNames.map(
		function operator( propertyName: string ) : string {

			return( "context." + propertyName );

		}
	);

	@Directive({
		selector: "template[render]",
		inputs: [ "template: render", "context", ...contextProperties ]
	})
	class TemplateRendererDirective implements OnInit {

		// I hold the context that will be exposed to the embedded view.
		// --
		// NOTE: The context is an injectable input. However, it's sub-properties are
		// also individually injectable properties based on the arguments passed to the
		// factory function.
		public context: any;

		// I hold the TemplateRef that we are cloning into the view container.
		public template: TemplateRef<any>;

		// I hold the view container into which we are injecting the cloned template.
		public viewContainerRef: ViewContainerRef;


		// I initialize the directive.
		constructor( viewContainerRef: ViewContainerRef ) {

			this.context = {};
			this.viewContainerRef = viewContainerRef;

		}


		// ---
		// PUBLIC METHODS.
		// ---


		// I get called once, when the class is initialized, after the inputs have been
		// bound for the first time.
		public ngOnInit() : void {

			if ( this.template && this.context ) {

				this.viewContainerRef.createEmbeddedView( this.template, this.context );

			}

		}

	}


	// Return the dynamically generated class.
	return( TemplateRendererDirective );

}
