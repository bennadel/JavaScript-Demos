component
	output = false
	hint = "I provide application settings and event handlers."
	{

	this.name = hash( getCurrentTemplatePath() );
	this.applicationTimeout = createTimeSpan( 0, 0, 10, 0 );
	this.sessionManagement = false;

}