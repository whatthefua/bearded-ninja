function Lemonade(canvas,time)
{
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");

	this.obj = [];

	var self = this;
	
	this.controller = function()
	{

	}

	setInterval(function() { self.controller(); },time);
}