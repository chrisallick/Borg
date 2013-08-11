/**
 * Returns a random number between min and max
 */
function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(window).load(function(){	
	setTimeout(function(){
		window.scrollTo(0, 1);
	}, 10);
});

var client, count = 0, humans = new Array(), borgs;
$(document).ready(function() {

	client = new Client( window, {
		username: "client"+getRandomInt(1,1000),
		roomname: "touchsite12893",
		host: "54.214.250.91",
		port: "8882",
		secure: false,
		debug: true
	});

	client.addEvent("position","object",function(msg) {
		//console.log( msg );
		if( humans[msg.sid] ) {
			$("#"+msg.sid).stop().animate({
				left: msg.x * ( $(document).width() / msg.w ),
				top: msg.y,
				opacity: .3
			}, 1500, "easeInOutCubic");
		} else {
			$("#humans").append('<div id="'+msg.sid+'" class="human"></div>');
			$("#"+msg.sid).css({
				left: msg.x * ( $(document).width() / msg.w ),
				top: msg.y,
				opacity: 0
			}).stop().animate({
				opacity: .3
			});
			humans[msg.sid] = msg;
		}
	});
	
	$(document).mousemove(function(e) {
		count++;
		if( count == 50 ) {
			var msg = client.createMessage("position",{
				x:e.pageX,
				y:e.pageY,
				w: $(document).width(),
				sid: client.sid
			});
			client.sendMessage(msg);
			count = 0;
		}
	});
	
	borgs = new Borgs( $(document).width(), $(document).height(), 100 );

	client.connect();
});