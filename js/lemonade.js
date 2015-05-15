function Lemonade(canvas,time)
{
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	window.context = this.canvas.getContext("2d");

	this.obj = [];
	this.sprite = [];
	this.spriteCount = 0;
	this.spriteLoadedCount = 0;

	var self = this;

	function objCmp(a,b)
	{
		if(a.depth > b.depth)
		{
			return 1;
		} else if(a.depth < b.depth) {
			return -1;
		}

		return 0;
	}	
	
	this.draw = function()
	{
		self.obj.sort(objCmp);

		self.context.fillStyle = "#FFFFFF";
		self.context.fillRect(0,0,self.canvas.width,self.canvas.height);

		$.each(self.obj,function(key, value) {
			if(value.type == "rect")
			{
				self.context.fillStyle = value.colour;
				self.context.fillRect(value.x,value.y,value.width,value.height);
			} else if(value.type == "line") {
				self.context.strokeStyle = value.colour;
				self.context.beginPath();
				self.context.moveTo(value.x1,value.y1);
				self.context.lineTo(value.x2,value.y2);
				self.context.stroke();
			} else if(value.type == "image") {
				self.context.drawImage(value.image,value.x,value.y);
			}
		});
	}

	this.addRect = function(colour,x,y,w,h,d)
	{
		var tmp = { type: "rect", colour: colour, x: x, y: y, width: w, height: h, depth: d };
		self.obj.push(tmp);
	}

	this.addLine = function(colour,x1,y1,x2,y2,d)
	{
		var tmp = { type: "line", colour: colour, x1: x1, x2: x2, y1: y1, y2: y2, depth: d };
		self.obj.push(tmp);
	}

	this.addImg = function(image,x,y,d)
	{
		var tmp = { type: "image", image: image, x: x, y: y, depth: d };
		self.obj.push(tmp);
	}

	this.start = function()
	{
		console.log("start");
		setInterval(function() { self.draw(); },self.time);
	}

	this.addSpriteOnloadHandler = function()
	{
		self.spriteLoadedCount++;

		console.log(self.spriteLoadedCount + "/" + self.spriteCount);

		if(self.spriteLoadedCount == self.spriteCount)
		{
			self.start();
		}
	}

	this.loadSprite = function(url)
	{
		self.spriteCount = url.length;

		$.each(url,function(key,value) {
			var tmp = new Image();

			tmp.onload = function() {
				self.addSpriteOnloadHandler();
			}

			tmp.src = value;
			self.sprite.push(tmp);
		});
	}
}