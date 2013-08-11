Borgs = function( _w, _h, _num ) {
	var self = this;
	this.borgs = new Array();

	this.create = function() {
		for( var i = 0; i < _num; i++ ) {
			if( i < 5 ) {
				self.borgs.push( new Borg( getRandomInt(50, _w-50 ), getRandomInt( 50, _h-50), 10 ) );
			} else {
				self.borgs.push( new Borg( getRandomInt(50, _w-50 ), getRandomInt( 50, _h-50), getRandomInt( 4000, 10000) ) );	
			}
		}		
	}

	self.create();
}

Borg = function( _x, _y, _wait ) {
	var self = this;
	this.x = _x;
	this.y = _y;
	this.t;
	this.el = document.createElement("div");
	this.alive = false;

	self.el.className = "borg";
	$(self.el).css({
		left: self.x,
		top: self.y,
		opacity: 0
	}).appendTo("#humans");

	self.update = function() {
		clearTimeout( self.t );

		if( !self.alive ) {
			self.alive = true;
			$(self.el).animate({
				opacity: .3
			});
		}

		self.x = getRandomInt( 150, $(document).width()-150 );
		self.y = getRandomInt( 150, $(document).height()-150 );

		$(self.el).animate({
			left: self.x,
			top: self.y,
		}, getRandomInt( 3000, 5000 ) );
		self.t = setTimeout( self.update, getRandomInt( 6000, 9000) );
	}

	self.t = setTimeout( self.update, _wait );
}