$("#triathlon-calc").submit(function (event) {
    // berekeningen
    var zwemmen = $("#zwemmen").val(); // zwemsnelheid in seconden/100m
    var fietsen = $("#fietsen").val(); // fietssnelheid in km/h
    var lopen = $("#lopen").val(); // loopsnelheid in seconden/km

    var totaal = (zwemmen * 5) + (((18.8 * 60) / fietsen) * 6) + (lopen * 5.1);

    alert(totaal);
});
