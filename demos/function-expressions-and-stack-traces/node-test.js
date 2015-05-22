
// I am an anonymous function expression assigned to a variable.
var doThis = function() {

	doThat();

};

// I am an anonymous function expression assigned to a variable.
var doThat = function() {

	var x = y;

};

// I am an anonymous function expression assigned to a property.
var thing = {
	oneTimeKickIt: function() {

		doThis();

	}
};


// NOTE: I have to invoke the functions after they are defined because 
// they are expressions, not declarations, and are therefore not hoisted"
// to the top of the current function block.
try {

	// Using an anonymous function expression with no named-variable 
	// assignemnt to demonstrate stack notation.
	(function() {

		thing.oneTimeKickIt();
		
	})();

} catch ( error ) {

	console.error( error.stack );

}
