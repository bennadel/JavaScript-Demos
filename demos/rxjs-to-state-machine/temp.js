// Get the three major events
var mouseup   = Rx.Observable.fromEvent(document, 'mouseup');
var mousemove = Rx.Observable.fromEvent(document, 'mousemove');
var mousedown = Rx.Observable.fromEvent(dragTarget, 'mousedown');
var intervalSource = Rx.Observable.interval(60, Rx.Scheduler.requestAnimationFrame);

var mousedrag = mousedown.flatMap(function(md) {
	return intervalSource
		.takeUntil(mouseup)
		.withLatestFrom(mousemove, function(s1, s2) {
			return s2.clientY;
		})
		.scan(md.clientY, function( initialClientY, clientY ) {
			return( clientY - initialClientY );
		})
	;
});

mousedrag.subscribe(function( delta ) {
	console.log( "Drag delta from origin:", delta );
});
