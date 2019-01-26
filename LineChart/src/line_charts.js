// Initial Design comes from: https://bl.ocks.org/d3noob/4db972df5d7efc7d611255d1cc6f3c4f

		// set the dimensions and margins of the graph
		var margin = {top: 40, right: 40, bottom: 60, left: 100},
				width = 650 - margin.left - margin.right,
				height = 400 - margin.top - margin.bottom;

		// parse the date / time
		var parseYear = d3.timeParse("%Y");
		var displayYear = d3.timeFormat("%Y");

		var xShift = 40;
		var yShift = 75;

		var radiusSize = 7.5;

		// set the ranges
		var x = d3.scaleTime()
			.range([0, width]);


		var x2 = d3.scaleTime()
			.range([0, width]);

		var y = d3.scaleLinear()
			.range([height, 0]);

		var y1 = d3.scaleLinear()
			.range([height, 0]);

		var y2 = d3.scaleLinear()
			.range([height, 0]);

		var y3 = d3.scaleLinear()
			.range([height, 0]);

		var y4 = d3.scaleLinear()
			.range([height, 0]);

		var y5 = d3.scaleLinear()
			.range([height, 0]);


		// first chart
		// define the 1st line
		var valueline = d3.line()
			.x(function(d) { return x(d.year); })
			.y(function(d) { return y1(d.avg); });

		// define the 2nd line
		var valueline2 = d3.line()
			.x(function(d) { return x(d.year); })
			.y(function(d) { return y1(d.median); });

		// second chart

		var repLine = d3.line()
			.x(function(d) { return x(d.year); })
			.y(function(d) { return y2(d.repavg); });

		var demLine = d3.line()
			.x(function(d) { return x(d.year); })
			.y(function(d) { return y2(d.demavg); })

		// third chart

		var demmedLine = d3.line()
			.x(function(d) { return x(d.year); })
			.y(function(d) { return y3(d.demmed); });

		var repmedLine = d3.line()
			.x(function(d) { return x(d.year); })
			.y(function(d) { return y3(d.repmed); });

		// fourth chart: median

		var all_med_line = d3.line()
			.x(function(d) { return x2(d.year); })
			.y(function(d) { return y4(d.all_med); });

		var top_decile_median_line = d3.line()
			.x(function(d) { return x2(d.year); })
			.y(function(d) { return y4(d.top_decile_median); })

		var col_med_line = d3.line()
			.x(function(d) { return x2(d.year); })
			.y(function(d) { return y4(d.col_med); });

		var age_med_line = d3.line()
			.x(function(d) { return x2(d.year); })
			.y(function(d) { return y4(d.age_med); });

		var con_med_line = d3.line()
			.x(function(d) { return x2(d.year); })
			.y(function(d) { return y4(d.con_med); });


		// five chart: mean

		var all_mean_line = d3.line()
			.x(function(d) { return x2(d.year); })
			.y(function(d) { return y5(d.all_mean); });

		var top_decile_mean_line = d3.line()
			.x(function(d) { return x2(d.year); })
			.y(function(d) { return y5(d.top_decile_mean); })

		var col_mean_line = d3.line()
			.x(function(d) { return x2(d.year); })
			.y(function(d) { return y5(d.col_mean); });

		var age_mean_line = d3.line()
			.x(function(d) { return x2(d.year); })
			.y(function(d) { return y5(d.age_mean); });

		var con_mean_line = d3.line()
			.x(function(d) { return x2(d.year); })
			.y(function(d) { return y5(d.con_mean); });
		

		// add the tooltip area to the webpage
		var tooltip = d3.select("body")
			.append("div")
		    .attr("class", "line_tooltip")
		    .style("opacity", 0);

		// append the svg obgect to the body of the page
		// appends a 'group' element to 'svg'
		// moves the 'group' element to the top left margin
		var svg = d3.select("#plot1")
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform",
							"translate(" + margin.left + "," + margin.top + ")");

		var svg2 = d3.select("#plot2")
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform",
							"translate(" + margin.left + "," + margin.top + ")");

		var svg3 = d3.select("#plot3")
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform",
							"translate(" + margin.left + "," + margin.top + ")");

		var svg4 = d3.select("#plot4")
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform",
							"translate(" + margin.left + "," + margin.top + ")");
		var svg5 = d3.select("#plot5")
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform",
							"translate(" + margin.left + "," + margin.top + ")");

		// bottom layer
		var layer2 = svg.append('g');
		// top layer
		var layer1 = svg.append('g');

		var svg2_layer2 = svg2.append('g');
		var svg2_layer1 = svg2.append('g');

		var svg3_layer2 = svg3.append('g');
		var svg3_layer1 = svg3.append('g');

		var svg4_layer2 = svg4.append('g');
		var svg4_layer1 = svg4.append('g');

		var svg5_layer2 = svg5.append('g');
		var svg5_layer1 = svg5.append('g');



		var rowConverter = function(d) {
					return {
						avg: +d.avg,
						median: +d.median,
						repavg: +d.repavg,
						repmed: +d.repmed,
						demavg: +d.demavg,
						demmed: +d.demmed,
						year: parseYear(d.year),
					};
		}

		var altRowConverter = function(d) {
					return {
						year: parseYear(d.year),
						all_med: +d.all_med,
						all_mean: +d.all_mean,
						top_decile_median: +d.top_decile_median,
						top_decile_mean: +d.top_decile_mean,
						col_med: +d.col_med,
						col_mean: +d.col_mean,
						age_med: +d.age_med,
						age_mean: +d.age_mean,
						con_mean: +d.con_mean,
						con_med: +d.con_med,
					};
		}	


		//////////////////////////////////////////////////////////////////////////////////////
		// Plot 1 Details
		//////////////////////////////////////////////////////////////////////////////////////

		// Get the data
		d3.csv("data/lnw.csv", rowConverter, function(error, data) {
			if (error) throw error;

			// Scale the range of the data
			x.domain(d3.extent(data, function(d) { return d.year; }));
			y1.domain([0, d3.max(data, function(d) {
				return Math.max(d.avg, d.median); })]);

			console.log(data);

			// Add the valueline1 path.
			layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", valueline);

			// Add the valueline2 path.
			layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", valueline2);

			// Add the X Axis
			svg.append("g")
					.attr("transform", "translate(0," + height + ")")
					.call(d3.axisBottom(x));

			// Add the Y Axis
			svg.append("g")
					.call(d3.axisLeft(y1).tickFormat(d3.format("($.2s")));

			// text label for the y axis
			svg.append("text")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 0 - margin.left + 30)
			    .attr("x",0 - (height/2))
			    .attr("dy", "1em")
			    .style("text-anchor", "middle")
			    .text("Net Worth (US Dollars)");

			// text label for the x axis
			svg.append("text")             
			    .attr("transform",
			          "translate(" + (width/2) + " ," + 
			                         (height + margin.top + 20) + ")")
			    .style("text-anchor", "middle")
			    .text("Year (2004-2014)");

			layer1.selectAll(".median_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x(d.year); })
				.attr("cy", function(d) { return y1(d.median); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "#CD88AF")
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");

					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "Lawmaker Median (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.median))
		               	.style("left", (d3.event.pageX) - xShift + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");


		            layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x(d.year)})
			            .attr("x2", function(d) {return x(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y1(d.median) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);


			        layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x(d.year) - radiusSize})
			            .attr("y1", function(d) {return y1(d.median)})			            
			            .attr("y2", function(d) {return y1(d.median)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "#CD88AF");

					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);

		            svg.selectAll("#tooltip_path").remove();
				});

			layer1.selectAll(".avg_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x(d.year); })
				.attr("cy", function(d) { return y1(d.avg); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "#73AC97")
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");


					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "Lawmaker Average (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.avg))
		               	.style("left", (d3.event.pageX - xShift) + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");

		            layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x(d.year)})
			            .attr("x2", function(d) {return x(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y1(d.avg) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

			        layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x(d.year) - radiusSize})
			            .attr("y1", function(d) {return y1(d.avg)})			            
			            .attr("y2", function(d) {return y1(d.avg)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "#73AC97");


					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);

		            svg.selectAll("#tooltip_path").remove();
				});

		});

		///////////////////////////////////////////////////////////////////////////
		// Plot 2 Details
		//////////////////////////////////////////////////////////////////////////

		// Get the data
		d3.csv("data/lnw.csv", rowConverter, function(error, data) {
			if (error) throw error;

			// Scale the range of the data
			x.domain(d3.extent(data, function(d) { return d.year; }));
			y2.domain([0, d3.max(data, function(d) {
				return Math.max(d.repavg, d.demavg, d.repmed, d.demmed); })]);

			console.log(data);

			// Add the valueline1 path.
			svg2_layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", demLine);

			// Add the valueline2 path.
			svg2_layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", repLine);

			// Add the X Axis
			svg2.append("g")
					.attr("transform", "translate(0," + height + ")")
					.call(d3.axisBottom(x));

			// Add the Y Axis
			svg2.append("g")
					.call(d3.axisLeft(y2).tickFormat(d3.format("($.2s")));

			// text label for the y axis
			svg2.append("text")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 0 - margin.left + 30)
			    .attr("x",0 - (height/2))
			    .attr("dy", "1em")
			    .style("text-anchor", "middle")
			    .text("Net Worth (US Dollars)");

			// text label for the x axis
			svg2.append("text")             
			    .attr("transform",
			          "translate(" + (width/2) + " ," + 
			                         (height + margin.top + 20) + ")")
			    .style("text-anchor", "middle")
			    .text("Year (2004-2014)");


			svg2_layer1.selectAll(".dem_avg_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x(d.year); })
				.attr("cy", function(d) { return y2(d.demavg); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "blue")
				.style("opacity", 0.6)
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");

					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "Democrat Average (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.demavg))
		               	.style("left", (d3.event.pageX) - xShift + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");

		            svg2_layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x(d.year)})
			            .attr("x2", function(d) {return x(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y2(d.demavg) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

			        svg2_layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x(d.year) - radiusSize})
			            .attr("y1", function(d) {return y2(d.demavg)})			            
			            .attr("y2", function(d) {return y2(d.demavg)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "blue");

					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);

		            svg2.selectAll("#tooltip_path").remove();
				});

			svg2_layer1.selectAll(".rep_avg_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x(d.year); })
				.attr("cy", function(d) { return y2(d.repavg); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "red")
				.style("opacity", 0.6)
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");


					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "Republican Average (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.repavg))
		               	.style("left", (d3.event.pageX - xShift) + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");

		            svg2_layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x(d.year)})
			            .attr("x2", function(d) {return x(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y2(d.repavg) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);


			        svg2_layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x(d.year) - radiusSize})
			            .attr("y1", function(d) {return y2(d.repavg)})			            
			            .attr("y2", function(d) {return y2(d.repavg)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "red");


					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);


		            svg2.selectAll("#tooltip_path").remove();

				});

				d3.select("#con_med_button")
				.on("click", function() {
					document.getElementById("plot2").style.display = "none";
					document.getElementById("plot3").style.display = "inline";

					document.getElementById("con_med_button").style.background = "#f2f2f2";
					document.getElementById("con_avg_button").style.background = "white";
				});

		});


		////////////////////////////////////////////////////////////////////////////////////////////
		//////////      Plot 3
		////////////////////////////////////////////////////////////////////////////////////////////


		// Get the data
		d3.csv("data/lnw.csv", rowConverter, function(error, data) {
			if (error) throw error;

			// Scale the range of the data
			x.domain(d3.extent(data, function(d) { return d.year; }));
			y3.domain([0, d3.max(data, function(d) {
				return Math.max(d.repmed, d.demmed, d.repavg, d.demavg); })]);

			console.log(data);

			// Add the valueline1 path.
			svg3_layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", demmedLine);

			// Add the valueline2 path.
			svg3_layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", repmedLine);

			// Add the X Axis
			svg3.append("g")
					.attr("transform", "translate(0," + height + ")")
					.call(d3.axisBottom(x));

			// Add the Y Axis
			svg3.append("g")
					.call(d3.axisLeft(y3).tickFormat(d3.format("($.2s")));

			// text label for the y axis
			svg3.append("text")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 0 - margin.left + 30)
			    .attr("x",0 - (height/2))
			    .attr("dy", "1em")
			    .style("text-anchor", "middle")
			    .text("Net Worth (US Dollars)");

			// text label for the x axis
			svg3.append("text")             
			    .attr("transform",
			          "translate(" + (width/2) + " ," + 
			                         (height + margin.top + 20) + ")")
			    .style("text-anchor", "middle")
			    .text("Year (2004-2014)");




			svg3_layer1.selectAll(".dem_med_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x(d.year); })
				.attr("cy", function(d) { return y3(d.demmed); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "blue")
				.style("opacity", 0.6)
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");

					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "Democrat Median (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.demmed))
		               	.style("left", (d3.event.pageX) - xShift + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");

		            svg3_layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x(d.year)})
			            .attr("x2", function(d) {return x(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y3(d.demmed) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

			        svg3_layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x(d.year) - radiusSize})
			            .attr("y1", function(d) {return y3(d.demmed)})			            
			            .attr("y2", function(d) {return y3(d.demmed)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "blue");

					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);

		            svg3.selectAll("#tooltip_path").remove();
				});

			svg3_layer1.selectAll(".rep_med_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x(d.year); })
				.attr("cy", function(d) { return y3(d.repmed); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "red")
				.style("opacity", 0.6)
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");


					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "Republican Median (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.repmed))
		               	.style("left", (d3.event.pageX - xShift) + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");

		           	svg3_layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x(d.year)})
			            .attr("x2", function(d) {return x(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y3(d.repmed) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

			        svg3_layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x(d.year) - radiusSize})
			            .attr("y1", function(d) {return y3(d.repmed)})			            
			            .attr("y2", function(d) {return y3(d.repmed)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);
			            

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "red");


					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);


		            svg3.selectAll("#tooltip_path").remove();
				});

				d3.select("#con_avg_button")
				.on("click", function() {
					document.getElementById("plot2").style.display = "inline";
					document.getElementById("plot3").style.display = "none";

					document.getElementById("con_avg_button").style.background = "#f2f2f2";
					document.getElementById("con_med_button").style.background = "white";
				});

		});

		////////////////////////////////////////////////////////////////////////////////////////////
		//////////      Plot 4
		////////////////////////////////////////////////////////////////////////////////////////////


		// Get the data
		d3.csv("data/american_nw.csv", altRowConverter, function(error, data) {
			if (error) throw error;

			// Scale the range of the data
			x2.domain(d3.extent(data, function(d) { return d.year; }));
			y4.domain([0, d3.max(data, function(d) {
				return Math.max(d.all_med, d.top_decile_median, d.col_med, 
					d.age_med, d.con_med, d.all_mean, d.top_decile_mean, d.col_mean, d.age_mean, d.con_mean); })]);

			console.log(data);

			// Add the valueline1 path.
			/*
			svg4_layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", age_med_line)
					.style("stroke", "#0000CC");
			*/

			// Add the valueline2 path.
			svg4_layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", top_decile_median_line)
					.style("stroke", "purple");

			svg4_layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", con_med_line)
					.style("stroke", "blue");

			svg4_layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", all_med_line)
					.style("stroke", "brown");

			svg4_layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", col_med_line)
					.style("stroke", "green");

			// Add the X Axis
			svg4.append("g")
					.attr("transform", "translate(0," + height + ")")
					.call(d3.axisBottom(x2));

			// Add the Y Axis
			svg4.append("g")
					.call(d3.axisLeft(y4).tickFormat(d3.format("($.2s")));

			// text label for the y axis
			svg4.append("text")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 0 - margin.left + 30)
			    .attr("x",0 - (height/2))
			    .attr("dy", "1em")
			    .style("text-anchor", "middle")
			    .text("Net Worth (Dollars)");

			// text label for the x axis
			svg4.append("text")             
			    .attr("transform",
			          "translate(" + (width/2) + " ," + 
			                         (height + margin.top + 20) + ")")
			    .style("text-anchor", "middle")
			    .text("Year (2004-2013)");




			svg4_layer1.selectAll(".all_med_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x2(d.year); })
				.attr("cy", function(d) { return y4(d.all_med); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "brown")
				.style("opacity", 0.6)
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");

					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "American Median (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.all_med))
		               	.style("left", (d3.event.pageX) - xShift + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");


		            svg4_layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x2(d.year)})
			            .attr("x2", function(d) {return x2(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y4(d.all_med) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

			        svg4_layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x2(d.year) - radiusSize})
			            .attr("y1", function(d) {return y4(d.all_med)})			            
			            .attr("y2", function(d) {return y4(d.all_med)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "brown");

					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);

		            svg4.selectAll("#tooltip_path").remove();
				});

			svg4_layer1.selectAll(".top_decile_median_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x2(d.year); })
				.attr("cy", function(d) { return y4(d.top_decile_median); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "purple")
				.style("opacity", 0.6)
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");


					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "Top Decile Median (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.top_decile_median))
		               	.style("left", (d3.event.pageX - xShift) + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");

		           	svg4_layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x2(d.year)})
			            .attr("x2", function(d) {return x2(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y4(d.top_decile_median) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

			        svg4_layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x2(d.year) - radiusSize})
			            .attr("y1", function(d) {return y4(d.top_decile_median)})			            
			            .attr("y2", function(d) {return y4(d.top_decile_median)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);
			            

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "purple");


					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);


		            svg4.selectAll("#tooltip_path").remove();
				});


			svg4_layer1.selectAll(".col_med_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x2(d.year); })
				.attr("cy", function(d) { return y4(d.col_med); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "green")
				.style("opacity", 0.6)
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");


					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "College Graduate Median (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.col_med))
		               	.style("left", (d3.event.pageX - xShift) + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");

		           	svg4_layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x2(d.year)})
			            .attr("x2", function(d) {return x2(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y4(d.col_med) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

			        svg4_layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x2(d.year) - radiusSize})
			            .attr("y1", function(d) {return y4(d.col_med)})			            
			            .attr("y2", function(d) {return y4(d.col_med)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);
			            

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "green");


					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);


		            svg4.selectAll("#tooltip_path").remove();
				});

			/*
			svg4_layer1.selectAll(".age_med_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x2(d.year); })
				.attr("cy", function(d) { return y4(d.age_med); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "#0000CC")
				.style("opacity", 0.6)
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");


					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "50-65 Year Old Median (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.age_med))
		               	.style("left", (d3.event.pageX - xShift) + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");

		           	svg4_layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x2(d.year)})
			            .attr("x2", function(d) {return x2(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y4(d.age_med) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

			        svg4_layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x2(d.year) - radiusSize})
			            .attr("y1", function(d) {return y4(d.age_med)})			            
			            .attr("y2", function(d) {return y4(d.age_med)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);
			            

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "#0000CC");


					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);


		            svg4.selectAll("#tooltip_path").remove();
				});
			*/
			svg4_layer1.selectAll(".con_med_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x2(d.year); })
				.attr("cy", function(d) { return y4(d.con_med); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "blue")
				.style("opacity", 0.6)
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");


					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "Lawmaker Median (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.con_med))
		               	.style("left", (d3.event.pageX - xShift) + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");

		           	svg4_layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x2(d.year)})
			            .attr("x2", function(d) {return x2(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y4(d.con_med) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

			        svg4_layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x2(d.year) - radiusSize})
			            .attr("y1", function(d) {return y4(d.con_med)})			            
			            .attr("y2", function(d) {return y4(d.con_med)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);
			            

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "blue");


					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);


		            svg4.selectAll("#tooltip_path").remove();
				});

				d3.select("#all_med_button")
				.on("click", function() {
					document.getElementById("plot5").style.display = "none";
					document.getElementById("plot4").style.display = "inline";

					document.getElementById("all_med_button").style.background = "#f2f2f2";
					document.getElementById("all_avg_button").style.background = "white";
				});

		});

		////////////////////////////////////////////////////////////////////////////////////////////
		//////////      Plot 5
		////////////////////////////////////////////////////////////////////////////////////////////


		// Get the data
		d3.csv("data/american_nw.csv", altRowConverter, function(error, data) {
			if (error) throw error;

			// Scale the range of the data
			x2.domain(d3.extent(data, function(d) { return d.year; }));
			y5.domain([0, d3.max(data, function(d) {
				return Math.max(d.all_mean, d.top_decile_mean, d.col_mean, d.age_mean, d.con_mean,
					d.all_med, d.top_decile_median, d.col_med, 
					d.age_med, d.con_med); })]);

			console.log(data);

			// Add the valueline1 path.
			/*
			svg5_layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", age_mean_line)
					.style("stroke", "0000CC");
			*/

			// Add the valueline2 path.
			svg5_layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", top_decile_mean_line)
					.style("stroke", "purple");

			svg5_layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", con_mean_line)
					.style("stroke", "blue");

			svg5_layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", all_mean_line)
					.style("stroke", "brown");

			svg5_layer2.append("path")
					.data([data])
					.attr("class", "line")
					.attr("d", col_mean_line)
					.style("stroke", "green");

			// Add the X Axis
			svg5.append("g")
					.attr("transform", "translate(0," + height + ")")
					.call(d3.axisBottom(x2));

			// Add the Y Axis
			svg5.append("g")
					.call(d3.axisLeft(y5).tickFormat(d3.format("($.2s")));

			// text label for the y axis
			svg5.append("text")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 0 - margin.left + 30)
			    .attr("x",0 - (height/2))
			    .attr("dy", "1em")
			    .style("text-anchor", "middle")
			    .text("Net Worth (Dollars)");

			// text label for the x axis
			svg5.append("text")             
			    .attr("transform",
			          "translate(" + (width/2) + " ," + 
			                         (height + margin.top + 20) + ")")
			    .style("text-anchor", "middle")
			    .text("Year (2004-2013)");




			svg5_layer1.selectAll(".all_mean_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x2(d.year); })
				.attr("cy", function(d) { return y5(d.all_mean); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "brown")
				.style("opacity", 0.6)
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");

					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "American Average (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.all_mean))
		               	.style("left", (d3.event.pageX) - xShift + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");


		            svg5_layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x2(d.year)})
			            .attr("x2", function(d) {return x2(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y5(d.all_mean) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

			        svg5_layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x2(d.year) - radiusSize})
			            .attr("y1", function(d) {return y5(d.all_mean)})			            
			            .attr("y2", function(d) {return y5(d.all_mean)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "brown");

					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);

		            svg5.selectAll("#tooltip_path").remove();
				});

			svg5_layer1.selectAll(".top_decile_mean_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x2(d.year); })
				.attr("cy", function(d) { return y5(d.top_decile_mean); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "purple")
				.style("opacity", 0.6)
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");


					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "Top Decile Average (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.top_decile_mean))
		               	.style("left", (d3.event.pageX - xShift) + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");

		           	svg5_layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x2(d.year)})
			            .attr("x2", function(d) {return x2(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y5(d.top_decile_mean) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

			        svg5_layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x2(d.year) - radiusSize})
			            .attr("y1", function(d) {return y5(d.top_decile_mean)})			            
			            .attr("y2", function(d) {return y5(d.top_decile_mean)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);
			            

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "purple");


					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);


		            svg5.selectAll("#tooltip_path").remove();
				});


			svg5_layer1.selectAll(".col_mean_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x2(d.year); })
				.attr("cy", function(d) { return y5(d.col_mean); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "green")
				.style("opacity", 0.6)
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");


					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "College Graduate Average (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.col_mean))
		               	.style("left", (d3.event.pageX - xShift) + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");

		           	svg5_layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x2(d.year)})
			            .attr("x2", function(d) {return x2(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y5(d.col_mean) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

			        svg5_layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x2(d.year) - radiusSize})
			            .attr("y1", function(d) {return y5(d.col_mean)})			            
			            .attr("y2", function(d) {return y5(d.col_mean)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);
			            

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "green");


					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);


		            svg5.selectAll("#tooltip_path").remove();
				});


			/*
			svg5_layer1.selectAll(".age_mean_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x2(d.year); })
				.attr("cy", function(d) { return y5(d.age_mean); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "#0000CC")
				.style("opacity", 0.6)
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");


					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "50-65 Year Old Average (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.age_mean))
		               	.style("left", (d3.event.pageX - xShift) + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");

		           	svg5_layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x2(d.year)})
			            .attr("x2", function(d) {return x2(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y5(d.age_mean) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

			        svg5_layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x2(d.year) - radiusSize})
			            .attr("y1", function(d) {return y5(d.age_mean)})			            
			            .attr("y2", function(d) {return y5(d.age_mean)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);
			            

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "#0000CC");


					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);


		            svg5.selectAll("#tooltip_path").remove();
				});
				*/

			svg5_layer1.selectAll(".con_mean_dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return x2(d.year); })
				.attr("cy", function(d) { return y5(d.con_mean); })
				.attr("r", function(d, i) { return radiusSize; })
				.style("fill", "blue")
				.style("opacity", 0.6)
				.on("mouseover", function(d) {

					d3.select(this)
						.style("fill", "orange");


					tooltip
						.transition()
		                .duration(200)
		               	.style("opacity", .9);
		          	tooltip
	          			.html( "Lawmaker Average (" + displayYear(d.year) + ")<br>" + d3.format("($.3s")(d.con_mean))
		               	.style("left", (d3.event.pageX - xShift) + "px")
		               	.style("top", (d3.event.pageY - yShift) + "px");

		           	svg5_layer2.selectAll("#tooltip_path")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return x2(d.year)})
			            .attr("x2", function(d) {return x2(d.year)})
			            .attr("y1", height)
			            .attr("y2", function(d) {return y5(d.con_mean) + radiusSize})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);

			        svg5_layer2.selectAll("#tooltip_path_x")
		          		.data([d])
		          		.enter()
		          		.append("line")
			            .attr("id", "tooltip_path")
			            .attr("x1", function(d) {return 0;})
			            .attr("x2", function(d) {return x2(d.year) - radiusSize})
			            .attr("y1", function(d) {return y5(d.con_mean)})			            
			            .attr("y2", function(d) {return y5(d.con_mean)})
			            .attr("stroke", "#ddd")
			            .attr("stroke-width", 1.5);
			            

				})
				.on("mouseout", function(d) {
					d3.select(this)
						.style("fill", "blue");


					tooltip.transition()
		               .duration(240)
		               .style("opacity", 0);


		            svg5.selectAll("#tooltip_path").remove();
				});


				d3.select("#all_avg_button")
				.on("click", function() {
					document.getElementById("plot5").style.display = "inline";
					document.getElementById("plot4").style.display = "none";

					document.getElementById("all_avg_button").style.background = "#f2f2f2";
					document.getElementById("all_med_button").style.background = "white";
				});



		});