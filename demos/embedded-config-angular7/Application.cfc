component
	output = false
	hint = "I define the application settings and event handlers."
	{

	this.name = hash( getCurrentTemplatePath() );
	this.applicationTimeout = createTimeSpan( 0, 0, 10, 0 );
	this.sessionManagement = false;

	// This ColdFusion application framework file is used for the CFML version 
	// of the embedded-configuration demo.

}
