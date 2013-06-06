

	var Game = function(engine){
		this.engine = engine;
	};

		Game.prototype.point = {x:0,y:0};
		Game.prototype.vector = {x:0,y:0};
		Game.prototype.velocity = {x:0,y:0};
		Game.prototype.engine = null;
		Game.prototype.render = function(){
			this.update();
			this.draw();
		};
		Game.prototype.update = function(){
			if(this.engine.key){
				switch(this.engine.key.keyCode){
					//UP
					case 38:
						this.vector.y--;
					break;
					//RIGHT
					case 39:
						this.vector.x++;
					break;
					//DOWN
					case 40:
						this.vector.y++;
					break;
					//LEFT
					case 37:
						this.vector.x--;
					break;
				}
			}else{
				if(this.vector.x>0){
					this.vector.x--;
				}else if(this.vector.x<0){
					this.vector.x++;
				}else{
					this.vector.x = 0;
				}

				if(this.vector.y>0){
					this.vector.y--;
				}else if(this.vector.y<0){
					this.vector.y++;
				}else{
					this.vector.y = 0;
				}

			
			}

			this.point.x += this.vector.x;
			this.point.y += this.vector.y;

			this.point.x = (this.point.x<0)
				? 0
				: this.point.x;
			this.point.x = (this.point.x>this.engine.canvas.width)
				? this.engine.canvas.width
				: this.point.x;
			this.point.y = (this.point.y<0)
				? 0
				: this.point.y;
			this.point.y = (this.point.y>this.engine.canvas.height)
				? this.engine.canvas.height
				: this.point.y;
		};
		Game.prototype.draw = function(){
			this.engine.context.save();
			this.engine.context.translate(this.point.x,this.point.y);
			this.engine.context.arc(0,0,10,0,Math.PI*2);
			this.engine.context.restore();
			this.engine.context.fill();
		};


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

	/**
	 *
	 */
	var Engine = function(){
		var self = this;
		this.canvas = document.createElement("canvas");
		this.canvas.width = 550;
		this.canvas.height = 550;
		this.canvas.style.background = "rgb(240,240,240)";
		this.context = this.canvas.getContext("2d");

		document.body.addEventListener("keydown",function(event){
			self.key = event;
		},false);
		document.body.addEventListener("keyup",function(event){
			self.key = null;
		},false);

		document.body.appendChild(this.canvas);
	};
		
		/**
		 *
		 */
		Engine.prototype.key = null;

		/**
		 *
		 */
		Engine.prototype.canvas = null;
		/**
		 *
		 */
		Engine.prototype.context = null;

		/**
		 *
		 */
		Engine.prototype.scene = { render: function(){} };

		/**
		 *
		 */
		Engine.prototype.run = function(){
			var self = this;
			(function loop(){
				window.webkitRequestAnimationFrame(loop);
				self.canvas.width = self.canvas.width;
				self.scene.render();
			})();
		};



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

	document.addEventListener("DOMContentLoaded",function(){

		var engine = new Engine();
			engine.scene = new Game(engine);
			engine.run();

	},false);

/*
	document.addEventListener("DOMContentLoaded",function (argument) {
	


		var canvas = document.createElement("canvas");
			canvas.width = 600;
			canvas.height = 600;
			canvas.style.background = "rgb(240,240,240)";
		var context = canvas.getContext("2d");

		var vetor = {x:0, y:0};
		var velocityX = 1;
		var velocityY = 1;

		var down = false;
		document.addEventListener("keydown",function(event){
			down = true;
			switch(event.keyCode){
				//UP
				case 38:
					vetor.y--;
					velocityY += 0.01;
				break;
				//RIGHT
				case 39:
					vetor.x++;
					velocityX += 0.01;
				break;
				//DOWN
				case 40:
					vetor.y++;
					velocityY += 0.01;
				break;
				//LEFT
				case 37:
					vetor.x--;
					velocityX += 0.01;
				break;

			}
		},false);
		document.addEventListener("keyup",function(event){
			down = false;
		},false);


		var point = {x: canvas.width/2, y: canvas.height/2};

		(function loop(){

			window.webkitRequestAnimationFrame(loop);

			if(!down){
				
				if(vetor.x>0){
					vetor.x--;
				}else if(vetor.x<0){
					vetor.x++;
				}else{
					vetor.x = 0;
				}
				if(vetor.y>0){
					vetor.y--;
				}else if(vetor.y<0){
					vetor.y++;
				}else{
					vetor.y = 0;
				}
				velocityX = (velocityX>1)? velocityX-0.02 : 1 ;
				velocityY = (velocityY>1)? velocityY-0.02 : 1 ;
			}

			canvas.width = canvas.width;
			//context.clearRect(0,0,canvas.width, canvas.height);

			vetor.x *= velocityX;
			vetor.y *= velocityY;			

			point.x += vetor.x;
			point.y += vetor.y;


			point.x = (point.x<0 ) ? 0 : point.x ;
			point.x = (point.x>canvas.width ) ? canvas.width : point.x ;
			point.y = (point.y<0 ) ? 0 : point.y ;
			point.y = (point.y>canvas.width ) ? canvas.height : point.y ;
			if(point.x==0 || point.x==canvas.width){
				velocityX=1;
			}
			if(point.y==0 || point.y==canvas.height){
				velocityY=1;

			}


			context.save();
			context.translate(point.x,point.y)
			context.arc(0,0,20,0,Math.PI*2);
			context.restore();
			context.fill();


		})();


		document.body.appendChild(canvas);


	},false);

*/