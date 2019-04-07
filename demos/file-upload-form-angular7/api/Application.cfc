component 
	output = false
	hint = "I define the application settings and event handlers."
	{

	this.name = hash( getCurrentTemplatePath() );
	this.applicationTimeout = createTimeSpan( 0, 0, 10, 0 );
	this.sessionManagement = false;

	this.mappings = {
		"/uploads": ( getDirectoryFromPath( getCurrentTemplatePath() ) & "uploads/" )
	};

}
