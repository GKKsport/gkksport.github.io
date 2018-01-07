function onClick() {
        var zwemmin = $("#zwemmenmin").val();
    var zwemsec = $("#zwemmensec").val();
    var loopmin = $("#lopenmin").val();
    var loopsec = $("#lopensec").val();

    var fietsen = $("#fietsen").val(); // fietssnelheid in km/h
    var zwemmen = (+zwemmin * 60) + +zwemsec;
    var lopen = (+loopmin * 60) + +loopsec;

    var zwemt = zwemmen * 5;
    var fietst = ((18.8 * 60) / fietsen) * 60;
    var loopt = lopen * 5.1;

    var totaal = zwemt + fietst + loopt;

    var minuten = Math.floor(totaal / 60);
    var seconden = totaal - (minuten * 60);

    var zwemm = Math.floor(zwemt / 60);
    var zwems = zwemt - (zwemm * 60);
    var fietsm = Math.floor(fietst / 60);
    var fietss = fietst - (fietsm * 60);
    var loopm = Math.floor(loopt / 60);
    var loops = loopt - (loopm * 60);


    document.getElementById("totaaltijd").innerHTML = minuten + " minuten en " + Math.floor(seconden) + " seconden";

    document.getElementById("zwemtijd").innerHTML = zwemm + " minuten en " + Math.floor(zwems) + " seconden (" + Math.round(((zwemt / totaal) * 100)) + "%)";
    document.getElementById("fietstijd").innerHTML = fietsm + " minuten en " + Math.floor(fietss) + " seconden (" + Math.round(((fietst / totaal) * 100)) + "%)";
    document.getElementById("looptijd").innerHTML = loopm + " minuten en " + Math.floor(loops) + " seconden (" + Math.round(((loopt / totaal) * 100)) + "%)";


    return false;
}
