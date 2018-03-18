function vis(id) {
	var e = document.getElementById(id);
	if (e.style.display === 'block')
		e.style.display = 'none';
	else
		e.style.display = 'block';
}

function zwemsnel() {
	var a = $("#zsa").val(); // ingegeven meters

}

function zwemtech() {
	var a = $("#zta").val();
	var opw = Math.floor((a * (Math.random() * (0.35 - 0.25) + 0.25)) / 100) * 100; // Opwarmingdeel
	var main = Math.floor((a * (Math.random() * (0.65 - 0.45) + 0.45)) / 100) * 100; // Main
	var cd = a - opw - main; // cooldown 
	document.getElementById("zwemtechafst").innerHTML = a;
	document.getElementById("zwemtechcda").innerHTML = cd + "m";
	document.getElementById("zwemtechopwa").innerHTML = opw + "m";
	document.getElementById("zwemtechtraininga").innerHTML = main + "m";


	// effectieve berekeningen - opwarming
	var rand1 = Math.floor(Math.random() * 4) + 1;
	if (rand1 === 1) {
		var a1 = Math.ceil((opw * 0.33) / 100) * 100;
		var b1 = opw - (2 * a1);
		document.getElementById("zwemtechopw").innerHTML = a1 + "m FC " + a1 + "m KICK " + b1 + "m PULL";
	} else if (rand1 === 2) {
		var a1 = Math.ceil((opw * 0.33) / 100) * 100;
		var b1 = opw - (2 * a1);
		document.getElementById("zwemtechopw").innerHTML = "2x" + a1 + "m FC en " + b1 + "m KICK";
	} else if (rand1 === 3) {
		if ((opw / 10) % 4 === 0) {
			var a1 = opw / 4;
			var b1 = Math.ceil((a1 / 3) / 50) * 50;
			var c1 = a1 - (2 * b1);
			document.getElementById("zwemtechopw").innerHTML = "4x" + a1 + "m (met " + b1 + "m FC, " + b1 + "m KICK, " + c1 + "m PULL)";
		} else {
			var a1 = Math.ceil((opw * 0.50) / 50) * 50;
			var b1 = Math.ceil((a1 * 0.50) / 50) * 50;
			var c1 = a1 - b1;
			document.getElementById("zwemtechopw").innerHTML = "2x" + a1 + "m (met " + b1 + "m FC, " + c1 + "m KICK)";
		}
	} else if (rand1 === 4) {
		if ((opw / 10) % 6 === 0) {
			var a1 = Math.ceil((opw / 6) / 100) * 100;
			document.getElementById("zwemtechopw").innerHTML = (3 * a1) + "m FC, " + (2 * a1) + "m KICK en " + a1 + "m PULL";
		} else {
			var a1 = Math.ceil((opw / 2) / 100) * 100;
			var b1 = opw - a1;
			document.getElementById("zwemtechopw").innerHTML = a1 + "m FC en " + b1 + "m KICK";
		}
	} else {
		window.alert('Simon kan niet coden, er liep iets fout');
	}

	// effectieve berekening - training
	var rand1 = Math.floor(Math.random() * 6) + 1;
	if (rand1 < 5) {
		if ((main / 100) % 4 === 0) {
			var a1 = main / 400;
			var b1 = a1 * 100;
			document.getElementById("zwemtechtraining").innerHTML = b1 + "m NS, " + a1 + "x50m FTIP (20sec RI), " + b1 + "m NS, " + a1 + "x50m CATCHUP en " + b1 + "m NS";
		} else if ((main / 100) % 2 === 0) {
			var a1 = Math.ceil((main / 4) / 100) * 100;
			var b1 = (main - a1);
			var c1 = b1 / 200;
			document.getElementById("zwemtechtraining").innerHTML = c1 + "x (50m FISTS, 50m CATCHUP, 100m BUILD) " + a1 + "m NS";
		} else {
			if (((main - 300) / 100) % 2 === 0) {
				var a1 = main - 300;
				var b1 = a1 / 50;
				var c1 = Math.floor(b1 / 6);
				var d1 = ((b1 - (c1 * 6)) / 2);
				var e1 = c1 + d1;
				document.getElementById("zwemtechtraining").innerHTML = (c1 * 100) + "m NS, " + e1 + "x50m FTIP (20sec RI), " + (c1 * 100) + "m NS, " + e1 + "x50m CATCHUP en 300m NS TEST";
			} else {
				var a1 = main - 300;
				var c1 = a1 / 200;
				document.getElementById("zwemtechtraining").innerHTML = c1 + "x (50m FISTS, 50m CATCHUP, 100m BUILD) en 300m NS";
			}
		}
	} else if (rand1 === 5) {
		var a1 = Math.floor((main / 150));
		var b1 = Math.ceil((a1 / 3) * 2);
		var c1 = (main / 50) - (b1 * 3);
		document.getElementById("zwemtechtraining").innerHTML = c1 + "x50m (25m FISTS en 25m FC) en " + b1 + "x150m at RT (met 20sec RI)";
	} else if (rand1 === 6) {
		var a1 = Math.floor((main / 200));
		var b1 = Math.ceil((a1 / 8) * 6);
		var d1 = Math.floor((main - (b1 * 200)) / 150);
		var e1 = main - (d1 * 150) - (b1 * 200);
		if (e1 === 50) {
			document.getElementById("zwemtechtraining").innerHTML = b1 + "x200m EASY PULL (met 20sec RI), " + d1 + "x150m FC EASY en " + e1 + "m RT";
		} else {
			document.getElementById("zwemtechtraining").innerHTML = b1 + "x(200m EASY PULL + 20sec RI), " + d1 + "x150m FC EASY";
		}

	}

	// effectieve berekening - cooldown

	var rand1 = Math.floor(Math.random() * 10) + 1;
	if (rand1 < 10) {
		document.getElementById("zwemtechcd").innerHTML = cd + "m EASY";
	} else {
		document.getElementById("zwemtechcd").innerHTML = cd + "m EASY PULL";
	}

}
