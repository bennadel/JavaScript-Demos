(() => {

	var observer = new MutationObserver( handleMutations );
	var root = document.body;

	// Start watching for changes on the DOM tree.
	observer.observe(
		root,
		{
			// Watch for nodes added and removed.
			childList: true,
			// Watch for descendant changes deep in the observed root.
			subtree: true
		}
	);

	// Bind controllers within the initial DOM structure.
	handleNodesAdded([ root ]);

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* When the DOM is mutated, the Observer only sees the local "roots" that were changed.
	* This method expands those local roots to include any nested nodes of interest (ie,
	* nodes those that represent x-controllers and x-refs).
	*/
	function expandNodesOfInterest( nodes ) {

		var nodesOfInterest = [];

		for ( var node of nodes ) {

			// MutationObserver reports TEXT node changes and COMMENT node changes. But,
			// we only care about ELEMENT changes.
			if ( node.nodeType !== Node.ELEMENT_NODE ) {

				continue;

			}

			// Collect "self" nodes of interest.
			if (
				node.hasAttribute( "x-controller" ) ||
				node.hasAttribute( "x-ref" )
				) {

				nodesOfInterest.push( node );

			}

			// Collect nested nodes of interest.
			nodesOfInterest.push( ...node.querySelectorAll( "[x-controller], [x-ref]" ) );

		}

		return nodesOfInterest;

	}

	/**
	* I handle DOM mutations and bind and unbind controllers as necessary. Note that only
	* element-level changes are being observed in this exploration. Dynamically mutated
	* attributes will not be noticed (ie, if you dynamically add "x-controller" to an
	* existing element, nothing will happen).
	*/
	function handleMutations( mutationList ) {

		for ( var mutation of mutationList ) {

			switch ( mutation.type ) {
				case "childList":
					handleNodesRemoved( mutation.removedNodes );
					handleNodesAdded( mutation.addedNodes );
				break;
				// Other [type] values are "attributes", "characterData".
			}

		}

	}

	/**
	* I handle the new nodes, instantiating controllers and injecting refs.
	*/
	function handleNodesAdded( nodes ) {

		var controllers = [];

		// MutationObserver only sees the "local root" of a newly added tree branch. But,
		// we need to know about all of the relevant nodes within the new tree branch. As
		// such, we must expand our view of the new nodes.
		for ( var node of expandNodesOfInterest( nodes ) ) {

			if ( node.hasAttribute( "x-controller" ) ) {

				// All controllers are defined as a dot-delimited object path.
				var controllerPath = node.getAttribute( "x-controller" );
				var constructor = reduceControllerPath( controllerPath );
				var controller = node._x_controller = new constructor( node );

				controller.refs = ( controller.refs || Object.create( null ) );
				controllers.push( controller );

			}

			if ( node.hasAttribute( "x-ref" ) ) {

				// All references are defined as a "scope.name" two-segment path.
				var refPath = node.getAttribute( "x-ref" );
				var parts = refPath.split( "." );
				var scopeName = parts[ 0 ];
				var refName = parts[ 1 ];
				// Find the closest controller with the given scope name. This may be a
				// controller that was just added; or, it may be one that was previously
				// created in a different DOM mutation.
				var controller = node.closest( `[x-scope=${ scopeName }]` )._x_controller;

				controller.refs[ refName ] = node;

			}

		}

		// Once we have all of our new controllers and new refs in place, call the init
		// life-cycle method on any new controllers.
		for ( var controller of controllers ) {

			controller?.$onInit( node );

		}

	}

	/**
	* I unbind all controllers from the given removed DOM nodes.
	*/
	function handleNodesRemoved( nodes ) {

		// MutationObserver only sees the "local root" of a recently removed tree branch.
		// But, we need to know about all of the relevant nodes within the old tree
		// branch. As such, we must expand our view of the old nodes.
		for ( var node of expandNodesOfInterest( nodes ) ) {

			var controller = node._x_controller;

			// Teardown any controller bound to the given node.
			if ( controller ) {

				delete node._x_controller;
				controller?.$onDestroy( node );

			}

		}

	}

	/**
	* I reduce the given dot-delimited controller path into a constructor reference (which
	* is assumed to be the last segment in the given path).
	*/
	function reduceControllerPath( path ) {

		return path.split( "." ).reduce(
			( context, segment ) => {

				return context[ segment ];

			},
			window // Start reducing at the global context.
		);

	}

})();
