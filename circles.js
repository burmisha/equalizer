var chart = d3.select("#circles > svg");

h = chart.style("height").split('p')[0] ;
w = chart.style("width").split('p')[0] ;
console.log(h);

var circles = [];
for (i = 0; i < 50; ++i) {
	circles.push({
		x:  w/2, y: h/2, 
		vx: 0, vy: 0,
		r: 5, color: "#ff0000",
		i: Math.random() * 3
	});
	console.log(h);
	console.log(circles[i]);
}
		

chart.selectAll("circle")
	.data(circles)
	.enter().append("circle")
	.attr("class", "little")
	.attr("cx", function(c) { 
		return c.x; 
	})
	.attr("cy", function(c) { 
		return c.y; 
	})
	.attr("r", function(c) {
		return c.r;
	});	   		
		
a = 0.6;
b = 10;
c = 0.05; 
mouse = [0, 0];
m = 10;
r = 15;
function motion(e, index, array, mousePos) {
	e.x += e.vx;
	if (e.x + e.r > w) {
		e.x = 2 * w - e.x - 2 * e.r;
		e.vx = -e.vx;
	} else if (e.x < e.r) {
		e.x = 2 * e.r - e.x;
		e.vx = -e.vx;
	}

	e.y += e.vy; 
	if (e.y + e.r > h) {
		e.y = 2 * h - e.y - 2 * e.r;
		e.vy = -e.vy;
	} else if (e.y < e.r) {
		e.y = 2 * e.r - e.y;
		e.vy = -e.vy;
	}
	dist = Math.max(Math.pow((e.x - mouse[0]) * (e.x - mouse[0]) + (e.y - mouse[1]) * (e.y - mouse[1]), 0.5) - e.r, 1);
	e.vx = a * e.vx + b * (Math.random() - 0.5) + m * (e.x - mouse[0]) / Math.pow(dist, 1.4) ;
	e.vy = a * e.vy + b * (Math.random() - 0.5) + m * (e.y - mouse[1]) / Math.pow(dist, 1.4)  ;
	e.r = 0.8 * e.r + r * Math.random();

	if (e.i < 1) {
		e.color = d3.rgb("hsl(" + Math.random() * 60 +",100%,50%)").toString()
	}
	e.i = (e.i + 1) % 3;
}      			      	     

// window.onload = function() {								  
// d3.timer(function() {	
window.setInterval( function () {
	d3.select("svg").on("mouseover", function() {
		mouse = d3.mouse(this); 
	})
	h = chart.style("height").split('p')[0];
	w = chart.style("width").split('p')[0];
	circles.forEach(motion);		
					
	chart.selectAll("circle").transition().duration(50)
		.attr("cx", function(c) { 
			return c.x; 
		})
		.attr("cy", function(c) { 
			return c.y; 
		})
		.attr("r", function(c) { 
			return c.r; 
		})
		.attr("fill", function(c) { 
			return c.color; 
		})
		.attr("fill", function(c) { 
			return c.color; 
		});		
		// http://blog.visual.ly/creating-animations-and-transitions-with-d3-js/
		// http://rawkes.com/lab/google-balls-logo
		// http://stackoverflow.com/questions/20725548/animating-circles-with-d3-js
}, 40);
// };
