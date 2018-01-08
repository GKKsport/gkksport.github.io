//onClick() function zal enkel afgaan indien op de button gedrukt wordt (zie html)
function onClick() {
    //Leest waarden uit formulier
    var zwemmin = $("#zwemmenmin").val();
    var zwemsec = $("#zwemmensec").val();
    var loopmin = $("#lopenmin").val();
    var loopsec = $("#lopensec").val();

    //Alles omzetten naar seconden (bij zwemmen en lopen) en km/h behouden bij fietsen
    var fietsen = $("#fietsen").val(); // fietssnelheid in km/h
    var zwemmen = (+zwemmin * 60) + +zwemsec;
    var lopen = (+loopmin * 60) + +loopsec;

    //Berekeningen op basis van triathlon Geel
    var zwemt = zwemmen * 5;
    var fietst = ((18.8 * 60) / fietsen) * 60;
    var loopt = lopen * 5.1;

    var totaal = zwemt + fietst + loopt;

    //Omrekenen naar minuten en seconden voor de totaaltijd
    var minuten = Math.floor(totaal / 60);
    var seconden = totaal - (minuten * 60);

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
    var loopp = 100 - fietsp - zwemp;

    //Geeft totaaltijd
    document.getElementById("totaaltijd").innerHTML = minuten + " minuten en " + Math.floor(seconden) + " seconden";

    //Geeft aparte tijden met percentage
    document.getElementById("zwemtijd").innerHTML = zwemm + " minuten en " + Math.floor(zwems) + " seconden (" + zwemp + "%)";
    document.getElementById("fietstijd").innerHTML = fietsm + " minuten en " + Math.floor(fietss) + " seconden (" + fietsp + "%)";
    document.getElementById("looptijd").innerHTML = loopm + " minuten en " + Math.floor(loops) + " seconden (" + loopp + "%)";

    //Gaat refresh van pagina tegen
    return false;
}
