function show() {
	var x = document.getElementById("afstand");
	var y = document.getElementById("button");
	if (x.style.display === "none") {
		x.style.display = "block";
		y.style.display = "none";
	} else {
		x.style.display = "none";
	}

}

function init() {
	$("#zwemafst").html(localStorage.getItem('zwema'));
	$("#fietsafst").html(localStorage.getItem('fietsa'));
	$("#loopafst").html(localStorage.getItem('loopa'));
}
init();

var calcstor = localStorage.getItem('calc');
if (calcstor === "0" || calcstor == null) {
	localStorage.setItem('zwema', "750");
	localStorage.setItem('fietsa', "20");
	localStorage.setItem('loopa', "5");
	$("#zwemafstand").val(localStorage.getItem('zwema'));
	$("#fietsafstand").val(localStorage.getItem('fietsa'));
	$("#loopafstand").val(localStorage.getItem('loopa'));
	localStorage.setItem('calc', 1);
} else {
	$("#zwemafstand").val(localStorage.getItem('zwema'));
	$("#fietsafstand").val(localStorage.getItem('fietsa'));
	$("#loopafstand").val(localStorage.getItem('loopa'));
	$("#zwemmenmin").val(localStorage.getItem('zwemmin'));
	$("#zwemmensec").val(localStorage.getItem('zwemsec'));
	$("#lopenmin").val(localStorage.getItem('lopenmin'));
	$("#lopensec").val(localStorage.getItem('lopensec'));
	$("#fietsen").val(localStorage.getItem('fietsen'));
	$("#t1min").val(localStorage.getItem('t1m'));
	$("#t2min").val(localStorage.getItem('t2m'));
	$("#t1sec").val(localStorage.getItem('t1s'));
	$("#t2sec").val(localStorage.getItem('t2s'));
}
/*var test = localStorage.getItem('test');*/


//onClick() function zal enkel afgaan indien op de button gedrukt wordt (zie html)
function onClick() {
	//Leest waarden uit formulier
	var zwemmin = $("#zwemmenmin").val();
	var zwemsec = $("#zwemmensec").val();
	var loopmin = $("#lopenmin").val();
	var loopsec = $("#lopensec").val();
	var t1min = $("#t1min").val();
	var t2min = $("#t2min").val();
	var t1sec = $("#t1sec").val();
	var t2sec = $("#t2sec").val();
	var zwemafstand = $("#zwemafstand").val();
	var fietsafstand = $("#fietsafstand").val();
	var loopafstand = $("#loopafstand").val();
	var fietsen = $("#fietsen").val(); // fietssnelheid in km/h

	//Steekt ze in local storage

	localStorage.setItem('zwemmin', zwemmin);
	localStorage.setItem('zwemsec', zwemsec);
	localStorage.setItem('lopenmin', loopmin);
	localStorage.setItem('lopensec', loopsec);
	localStorage.setItem('fietsen', fietsen);
	localStorage.setItem('t1m', t1min);
	localStorage.setItem('t2m', t2min);
	localStorage.setItem('t1s', t1sec);
	localStorage.setItem('t2s', t2sec);


	var zwemberekening = zwemafstand / 100;


	//Alles omzetten naar seconden (bij zwemmen en lopen) en km/h behouden bij fietsen
	var zwemmen = (+zwemmin * 60) + +zwemsec;
	var lopen = (+loopmin * 60) + +loopsec;
	var t1 = (+t1min * 60) + +t1sec;
	var t2 = (+t2min * 60) + +t2sec;

	//Berekeningen op basis van triathlon Geel
	var zwemt = zwemmen * zwemberekening;
	var fietst = ((fietsafstand * 60) / fietsen) * 60;
	var loopt = lopen * loopafstand;

	var totaal = zwemt + fietst + loopt + t1 + t2;
	var totaalzondert = zwemt + fietst + loopt;

	//Omrekenen naar minuten en seconden voor de totaaltijd
	var uur = Math.floor(totaal / 3600);
	var minuten = Math.floor((totaal - (uur * 3600)) / 60);
	var seconden = totaal - (minuten * 60) - (uur * 3600);


	var uurzt = Math.floor(totaalzondert / 3600);
	var minutenzt = Math.floor((totaalzondert - (uurzt * 3600)) / 60);
	var secondenzt = totaalzondert - (minutenzt * 60) - (uurzt * 3600);

	//Omrekenen naar minuten en seconden voor de aparte tijden
	var zwemm = Math.floor(zwemt / 60);
	var zwems = zwemt - (zwemm * 60);
	var fietsm = Math.floor(fietst / 60);
	var fietss = fietst - (fietsm * 60);
	var loopm = Math.floor(loopt / 60);
	var loops = loopt - (loopm * 60);

	//Percentage
	var fietsp = Math.round(((fietst / totaal) * 100));
	var zwemp = Math.round(((zwemt / totaal) * 100));
	var t1p = Math.round(((t1 / totaal) * 100));
	var t2p = Math.round(((t2 / totaal) * 100));
	var loopp = 100 - fietsp - zwemp - t1p - t2p;

	//Geeft totaaltijd
	document.getElementById("totaaltijd").innerHTML = uur + " uur, " + minuten + " minuten en " + Math.floor(seconden) + " seconden";
	document.getElementById("totaalzondertussentijd").innerHTML = uurzt + " uur, " + minutenzt + " minuten en " + Math.floor(secondenzt) + " seconden (zonder tussenstops)";

	//Geeft aparte tijden met percentage
	document.getElementById("zwemtijd").innerHTML = zwemm + " minuten en " + Math.floor(zwems) + " seconden (" + zwemp + "%)";
	document.getElementById("fietstijd").innerHTML = fietsm + " minuten en " + Math.floor(fietss) + " seconden (" + fietsp + "%)";
	document.getElementById("looptijd").innerHTML = loopm + " minuten en " + Math.floor(loops) + " seconden (" + loopp + "%)";
	document.getElementById("t1tijd").innerHTML = t1min + " minuten en " + t1sec + " seconden (" + t1p + "%)";
	document.getElementById("t2tijd").innerHTML = t2min + " minuten en " + t2sec + " seconden (" + t2p + "%)";

	localStorage.setItem('zwema', zwemafstand);
	localStorage.setItem('loopa', loopafstand);
	localStorage.setItem('fietsa', fietsafstand);
	init();

	//Gaat refresh van pagina tegen
	return false;
}
