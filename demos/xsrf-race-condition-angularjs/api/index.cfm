
<!--- 
	AngularJS uses very particular, case-sensitive names for the XSRF tokens. 
	It's going to be looking for an all-caps "XSRF-TOKEN" cookie and then appending 
	an all-caps "X-XSRF-TOKEN" header value. 
--->
<cfset cookieName = "XSRF-TOKEN" />
<cfset headerName = "X-XSRF-TOKEN" />


<!--- 
	If the cookie does not yet exist, set it and exit out of the request. This is 
	just here to initialize the demo. Once this is set, it won't be unset.
--->
<cfif ! structKeyExists( cookie, cookieName )>
	
	<!--- Define the XSRF token cookie. --->
	<cfset cookie[ cookieName ] = left( hash( getTickCount() ), 6 ) />

	<cfheader statuscode="200" statustext="OK" />
	<cfexit />

</cfif>


<cfset headers = getHttpRequestData().headers />

<!--- 
	If there is no XSRF-TOKEN header, reject the response. This should never happen
	in this demo; but, I just wanted it here to ensure I don't get any false negatives 
	in the XSRF-TOKEN match. 
--->
<cfif ! structKeyExists( headers, headerName )>
	
	<cfheader statuscode="400" statustext="Bad Request" />
	<cfexit />

</cfif>


<!--- If the cookie and header values match, this is a safe request. --->
<cfif ( headers[ headerName ] eq cookie[ cookieName ] )>
	
	<!--- Simulate some network and processing latency. --->
	<cfset sleep( randRange( 50, 100 ) ) />

	<!--- 
		After each valid request, let's cycle the XSRF token. While we wouldn't 
		do this very often in an production application, we are trying to find an 
		edge-case. As such, cycling the cookie on each valid request will help us 
		find the race-condition. 
	--->
	<cfset cookie[ cookieName ] = left( hash( getTickCount() ), 6 ) />
	
	<cfheader statuscode="200" statustext="OK" />

<!--- If the values did NOT match, this request is unauthorized. --->
<cfelse>

	<cfheader statuscode="401" statustext="Unauthorized" />

	<cfoutput>#headers[ headerName ]# != #cookie[ cookieName ]#</cfoutput>

</cfif>
