component
	output = false
	hint = "I provide the application settings and event handlers."
	{

	// I define the application settings.
	this.name = hash( getCurrentTemplatePath() );
	this.applicationTimeout = createTimeSpan( 0, 0, 5, 0 );
	this.sessionManagement = false;

}