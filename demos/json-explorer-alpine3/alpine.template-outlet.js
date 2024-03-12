document.addEventListener(
	"alpine:init",
	function setupAlpineBindings() {

		Alpine.directive( "template-outlet", TemplateOutletDirective );

	}
);

/**
* I clone and render the given source template.
*/
function TemplateOutletDirective( element, metadata, framework ) {

	// Get the template reference that we want to clone and render.
	var templateRef = framework.evaluate( metadata.expression );

	// Clone the template and get the root node - this is the node that we will
	// inject into the DOM.
	var clone = templateRef.content
		.cloneNode( true )
		.firstElementChild
	;

	// For the clone, all I need to do at the moment is copy the datastack from the
	// template over to the clone. This way, even if the template doesn't have an "x-data"
	// attribute, I'll still have the right stack.
	clone._x_dataStack = Alpine.closestDataStack( element );

	// Instead of leaving the template in the DOM, we're going to swap the
	// template with a comment hook. This isn't necessary; but, I think it leaves
	// the DOM more pleasant looking.
	var domHook = document.createComment( ` Template outlet hook (${ metadata.expression }) with bindings (${ element.getAttribute( "x-data" ) }). ` );
	domHook._template_outlet_ref = templateRef;
	domHook._template_outlet_clone = clone;

	// Swap the template-outlet element with the hook and clone.
	// --
	// NOTE: Doing this inside the mutateDom() method will pause Alpine's internal
	// MutationObserver, which allows us to perform DOM manipulation without
	// triggering actions in the framework. Then, we can call initTree() and
	// destroyTree() to have explicitly setup and teardowm DOM node bindings.
	Alpine.mutateDom(
		function pauseMutationObserver() {

			element.after( domHook );
			domHook.after( clone );
			Alpine.initTree( clone );

			element.remove();
			Alpine.destroyTree( element );

		}
	);

}