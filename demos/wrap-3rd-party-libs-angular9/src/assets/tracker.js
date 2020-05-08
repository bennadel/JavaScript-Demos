
window.tracker = {
	identify: function() {
		console.warn( "GLOBAL TRACKER[ Identify ]:", arguments );
	},
	track: function() {
		console.warn( "GLOBAL TRACKER[ Track ]:", arguments );
	}
};
