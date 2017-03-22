
// CAUTION: The RegEx patterns used to parse the module source-code are fairly simple in
// terms of the way they match string values - they assume that none of the string values
// will contain any string-like delimiters embedded within their outer quotes. This also 
// means that when we construct quoted values within the replacement functions, we assume
// we can wrap double-quotes around a value and NOT get any unmatched string delimiter 
// errors. While this is not a "correct" approach, it's a "sufficient" approach since no
// one should be using quotes (of any kind) in their file-names ('nuff said).

// I match the @Component() meta data properties.
var templateUrlRegex = /templateUrl\s*:\s*(['"`](.*?)['"`])/g;
var styleUrlsRegex = /styleUrls\s*:\s*(\[[^\]]*\])/g;

// I match the individual URLs in the styleUrls array.
var stringRegex = /(['`"](.*?)['`"])/g;

// I match the relative-prefix ( "./" or "../" ) at the start of a string.
var relativePathRegex = /^\.{1,2}\//i;


// I update the contents of the load object (specifically load.source), replacing 
// module-relative paths with app-relative paths.
exports.translate = function( load ) {

	// Let's calculate the root-relative path to the application. This should generate
	// something like "path/to/app/".
	var pathToApp = load.address
		// Strip out the protocol, domain, and pre-app prefix.
		.replace( this.baseURL, "" )

		// Strip out the trailing filename (leaving in the TRAILING SLASH).
		.replace( new RegExp( "[^/]+$" ), "" )
	;

	// Replace the module-relative template URL with an app-relative URL. We denote a 
	// module-relative URL as one that starts with "./" or "../". 
	// --
	// NOTE: To keep things simple, we are leaving the "." constructs in the URL. This 
	// may produce a URL that look like, "path/to/app/../app/template.htm", which may 
	// look funny, but works well and keeps the logic easy to read.
	load.source = load.source.replace(
		templateUrlRegex,
		function replaceMatch( $0, quotedUrl, url ) {

			var absoluteUrl = relativePathRegex.test( url )
				? ( pathToApp + url )
				: url
			;

			return( `templateUrl: "${ absoluteUrl }"` );

		}
	);

	// Replace the module-relative style URLs with a app-relative URLs. Unlike the 
	// templateUrl property, the styleUrls property references an array of paths, each 
	// of which will have to be evaluated individually. As such, this time, we have to 
	// iterate over each string match within the styleUrls value. We denote a module-
	// relative URL as one that starts with "./" or "../". 
	// --
	// NOTE: To keep things simple, we are leaving the "." constructs in the URL. This 
	// may produce a URL that look like, "path/to/app/../app/template.htm", which may 
	// look funny, but works well and keeps the logic easy to read.
	load.source = load.source.replace(
		styleUrlsRegex,
		function replaceMatch( $0, styleUrls ) {

			// Loop over the matches inside the "[ url, url, url ]" collection, and 
			// replace each URL with an absolute one.
			var absoluteUrls = styleUrls.replace(
				stringRegex,
				function replaceMatch( $0, quotedUrl, url ) {

					var absoluteUrl = relativePathRegex.test( url )
						? ( pathToApp + url )
						: url
					;

					return( `"${ absoluteUrl }"` );

				}
			);

			return( `styleUrls: ${ absoluteUrls  }` );

		}
	);

};
