(function configureNgx( $, ng ) {

	// Locate the root of the application. This demo assumes that there is only
	// one AngularJS application on the page and that is uses the ng-app syntax.
	var bootstrapElement = $( "*[ ng-app ]" );

	// Get the application module name - we'll need this to manually bootstrap 
	// the application after the page loads.
	var moduleName = bootstrapElement.attr( "ng-app" );

	// Remove the ng-app attribute so that AngularJS doesn't automatically 
	// bootstrap the application before we've had a chance to parse our NGX scripts.
	bootstrapElement.removeAttr( "ng-app" );

	// Once the DOM is ready, find the inline NGX scripts and convert them to JavaScript.
	$( findAndParseNgxBlocks );


	// ---
	// PRIVATE METHODS.
	// ---


	// I find all of the NGX block and convert them into JavaScript Script tags that get
	// injected back into the page (where they are executed). Once this is done, the 
	// AngularJS application is bootstrapped.
	function findAndParseNgxBlocks() {

		// Convert all the NGX blocks to active Script elements.
		$( "script[ type = 'text/ngx' ]" )
			.remove()
			.map(
				function convertToScript() {

					var script = document.createElement( "script" );
					script.type = "text/javascript";
					script.text = parseNgx( this.innerHTML );

					return( script );

				}
			)
			.appendTo( "head" )
		;

		// Once the script tags are all converted, bootstrap the AngularJS application.
		ng.bootstrap( document, [ moduleName ] );

	}


	// I parse the given NGX content into valid JavaScript content. For this demo, this 
	// consist of finding the "```" (triple back-tick) delimited values and converting 
	// them into single-lines of quoted text.
	function parseNgx( ngxContent ) {

		var templatePattern = /```([\w\W]*?)```/g;

		var jsContent = ngxContent.replace(
			templatePattern,
			function( $0, template ) {

				// Remove leading and trailing spaces from each line.
				template = template.replace( /^\s+|\s$/gm, "" );

				// Escape any embedded double-quotes.
				template = template.replace( /(")/g, "\\$1" );

				// Replace line-returns with spaces.
				template = template.replace( /[\r\n]+/g, " " );

				// Quote the entire template value.
				return( "\"" + $.trim( template ) + "\"" );

			}
		);

		return( jsContent );

	}

})( jQuery, angular );