function onClick() {
    var zwemmin = $("#zwemmenmin").val();
    var zwemsec = $("#zwemmensec").val();
    var loopmin = $("#lopenmin").val();
    var loopsec = $("#lopensec").val();

    var fietsen = $("#fietsen").val(); // fietssnelheid in km/h
    var zwemmen = (+zwemmin * 60) + +zwemsec;
    var lopen = (+loopmin * 60) + +loopsec;

    var totaal = (zwemmen * 5) + (((18.8 * 60) / fietsen) * 60) + (lopen * 5.1);

    var minuten = Math.floor(totaal / 60);
    var seconden = totaal - (minuten * 60);

    document.getElementById("totaaltijd").innerHTML = minuten + " minuten en " + Math.floor(seconden) + " seconden";
    return false;
}
