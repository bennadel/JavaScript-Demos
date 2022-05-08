
// CAUTION: Assumes that the "index-fonts.js" file was already loaded and exposed a
// "fontOptions" array of Google Fonts.

// First, let's get the dynamic parts into the document. This way, the rest of our DOM
// queries will be executing in an expected state.
addFontsToDocument();
addSignaturesToDocument();

var root = u( "html" );
var body = u( document.body );
var nameInput = u( "input[ name = 'name' ]" );
var slantInput = u( "select[ name = 'slant' ]" );
var spacingInput = u( "select[ name = 'spacing' ]" );
var nameLabels = body.find( ".version__signature" );
var downloadButtons = body.find( ".version__download" );

nameInput.on( "input", applyFormValues );
slantInput.on( "change", applyFormValues );
spacingInput.on( "change", applyFormValues );
downloadButtons.on( "click", handleDownloadClick );

applyUrlParameters();
applyFormValues();

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I add each of the font options as a LINK tag to the document head.
function addFontsToDocument() {

	for ( var font of fontOptions ) {

		u( "<link>" )
			.attr( "rel", "stylesheet" )
			.attr( "href", font.href )
			.appendTo( document.head )
		;

	}

}


// For each of the font options, I clone the template and add it to the document with the
// appropriate font-family and font-size.
function addSignaturesToDocument() {

	var main = u( "main" );
	var template = u( "template" );

	for ( var font of fontOptions ) {

		var fragment = u( template.first().content.cloneNode( true ) );

		fragment.find( ".version__signature" )
			.attr( "title", `Font: ${ font.family }` )
			.css({
				"font-family": font.family,
				"font-size": `${ 30 + font.adjustSize }px`
			})
		;

		// CAUTION: We have to append the fragment to the body as the LAST STEP here
		// otherwise the .find() seems to fail. It looks like appending the template to
		// the body somehow clears the fragment contents.
		fragment.appendTo( main );

	}

}


// I apply the current form values to the document rendering and URL query-string.
function applyFormValues() {

	// Apply the form to the DOM.
	root.css({
		"--skew": slantInput.val(),
		"--letter-spacing": spacingInput.val()
	});
	nameLabels.text( nameInput.val() );

	// Apply the form to the URL (so that a refresh will re-render the same settings).
	var params = new URLSearchParams();
	params.append( nameInput.attr( "name" ), nameInput.val() );
	params.append( slantInput.attr( "name" ), slantInput.val() );
	params.append( spacingInput.attr( "name" ), spacingInput.val() );

	var nextUrl = (
		window.location.origin + 
		window.location.pathname + "?" +
		params.toString()
	);

	window.history.replaceState( null, "", nextUrl );

}


// I apply the current URL search parameters to the form values, allowing the URL to be
// used to reflect the current information.
function applyUrlParameters() {

	var params = new URLSearchParams( window.location.search );

	for ( var [ key, value ] of params ) {

		switch ( key.toLowerCase() ) {
			case "name":
				nameInput.val( value );
			break;
			case "slant":
				slantInput.val( value );
			break;
			case "spacing":
				spacingInput.val( value );
			break;
		}

	}

}


// I handle the download button clicks, generating a PNG for the selected signature and
// then prompting the browser to download it.
function handleDownloadClick( event ) {

	var signatureNode = u( event.target )
		.closest( ".version" )
		.find( ".version__signature" )
		.first()
	;
	// We want our canvas to be generated with a transparent background since the
	// resultant image will be pasted into other documents (and will almost certainly
	// overlap with other document elements).
	var renderOptions = {
		backgroundColor: null,
		logging: false
	};

	html2canvas( signatureNode, renderOptions ).then(
		( canvas ) => {

			// Once the canvas object has been generated, we want to set it as the target
			// of a transient anchor tag and then simulate a user-click. By including the
			// "download" attribute, this should force the browser to save it rather than
			// forwarding the user to the signature.
			var autoDownload = u( "<a>" )
				.attr( "href", canvas.toDataURL() )
				.attr( "download", "signature.png" )
				.appendTo( body )
			;
			autoDownload.first().click();
			autoDownload.remove();

		}
	);

}
