
// Since the document is going to block-and-wait for this Script tag to load, it means
// that the last <script> element on the page is currently THIS ONE. As such, let's grab
// all of the script tags and then take the one in the last index.
var nodes = document.querySelectorAll( "script" );
var thisNode = nodes[ nodes.length - 1 ];

// Log the "?v=" portion of the SRC attribute.
console.log( "Loaded:", thisNode.src.split( "?" )[ 1 ] );
