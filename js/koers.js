window.addEventListener('load', function() {
  if (navigator.onLine === false) {
    $('#status').css('display', 'block');
    $('#refresh').css('display', 'none');
    $('#profiel').css('display', 'none');
    $('.well').css('display', 'none');
    console.log('offline');
  }
});

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1HW4rR9Dehu2-sga989vXPxo7_KefCktLIp6Orb5DoXg/edit?usp=sharing';

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  })
}

function showInfo(data, tabletop) {
  $('#loader').css('display', 'none');
  if (data[0].koers != "") {
    document.getElementById("wedstrijd").innerHTML = data[1].koers;
    document.getElementById("profielgroot").innerHTML += "<br><img width='100%' src='" + data[0].kaart + "'>";
    for (i = 1; i < 5; i++) {
      document.getElementById("profielberg").innerHTML += "<br><img width='100%' src='" + data[i].kaart + "'>";
    }
    document.getElementById("btnprofiel").disabled = false;
  } else {
    document.getElementById("wedstrijd").innerHTML = "GEEN wedstrijd";
  }
  // Als er een klassement opgegeven is, dan zal dit het klassement tonen
  if (data[0].algnaam != "") {
    document.getElementById("btnklassement").disabled = false;
    for (i = 0; i < 20; i++) {
      // Algemeen klassement
      document.getElementById("algtabel").innerHTML += "<tr id='algklas" + [i] + "'> </tr>";
      document.getElementById("algklas" + i).innerHTML = "<td>" + data[i].algnum + "</td><td>" + data[i].algnaam + "</td><td>" + data[i].algteam + "</td><td>" + data[i].algtijd + "</td>";
      // Puntklassement
      document.getElementById("punttabel").innerHTML += "<tr id='puntklas" + [i] + "'> </tr>";
      document.getElementById("puntklas" + i).innerHTML = "<td>" + data[i].puntnum + "</td><td>" + data[i].puntnaam + "</td><td>" + data[i].puntteam + "</td><td>" + data[i].punttijd + "</td>";
      // Bergklassement
      document.getElementById("bergtabel").innerHTML += "<tr id='bergklas" + [i] + "'> </tr>";
      document.getElementById("bergklas" + i).innerHTML = "<td>" + data[i].bergnum + "</td><td>" + data[i].bergnaam + "</td><td>" + data[i].bergteam + "</td><td>" + data[i].bergtijd + "</td>";
    }
    for (i = 0; i < 20; i++) {
      document.getElementById("jongtabel").innerHTML += "<tr id='jongklas" + [i] + "'> </tr>";
      document.getElementById("jongklas" + i).innerHTML = "<td>" + data[i].jongnum + "</td><td>" + data[i].jongnaam + "</td><td>" + data[i].jongteam + "</td><td>" + data[i].jongtijd + "</td>";
    }

    if (data[4].koers === "tour") {
      document.getElementById("rittitel").innerHTML = data[0].rittitel;
      for (i = 0; i < 60; i++) {
        document.getElementById("laatsterittabel").innerHTML += "<tr id='rittab" + [i] + "'> </tr>";
        if (data[i]) {
          document.getElementById("rittab" + [i]).innerHTML = "<td>" + data[i].ritnum + "</td><td>" + data[i].ritnaam + "</td><td>" + data[i].ritteam + "</td><td>" + data[i].rittijd + "</td>";
        }
      }
    }
  }
  //Als koers afgelopen is
  if (data[0].matchstatus === "FINISHED") {
    $('#podium').css('display', 'block');
    document.getElementById("winnaar").innerHTML = data[0].gapsdescription;
    document.getElementById("tweede").innerHTML = data[1].gapsdescription;
    document.getElementById("derde").innerHTML = data[2].gapsdescription;
    document.getElementById("rittitel").innerHTML = data[0].rittitel;
    if (data[4].koers === "tour") {
      document.getElementById("btnrittekst").innerHTML = "Bekijk de uitslag van deze rit (top 60)!"
      $("#klasrit").show();
    }
  } else if (data[0].matchstatus === "" || data[0].gapsname === "") { //Als de koers nog niet begonnen is
    if (data[0].koers != "") {
      document.getElementById("nognietbezig").innerHTML = "<p>De wedstrijd is nog niet bezig, kom later terug.</p>"
      if (data[4].koers === "tour") {
        document.getElementById("btnrittekst").innerHTML = "Bekijk de stand van de vorige rit!"
        $("#klasrit").show();
      }
      console.log("nog niet bezig");
    } else {
      document.getElementById("nognietbezig").innerHTML = "<p>Er is geen noemenswaardige wedstrijd gepland vandaag!</p><br><small>(Of deze is niet ingegeven, in dat geval trek aan de oren van Simon)</small>"
    }
  } else { //Als koers bezig is
    document.getElementById("left").innerHTML = data[0].distancetofinish;
    $('#bezig').css('display', 'block');
    if (data[3].koers === "TRUE") {
      console.log("er is livestream");
      $("#livestream").show();
    } else {
      $("#tizlivestream").show();
    }
    for (i = 0; i < 10; i++) {
      if (data[i].gapsname != "") {
        if (i === 0) {
          if (data[i].gapsname != "Peloton") {
            document.getElementById("gaps").innerHTML += "<p><p class='titelgap'>" + data[i].gapsname + "</p><br>" + data[i].gapsdescription + "</p>";
          } else {
            document.getElementById("gaps").innerHTML += "<p><p class='titelgap'>" + data[i].gapsname + "</p><br></p>";
          }
        } else {
          if (data[i].gapsname != "Peloton") {
            document.getElementById("gaps").innerHTML += "<p><p class='titelgap'>" + data[i].gapsname + "</p><strong> (op " + data[i].gapsformatted + ")</strong><br>" + data[i].gapsdescription + "</p>";
          } else {
            document.getElementById("gaps").innerHTML += "<p><p class='titelgap'>" + data[i].gapsname + "</p><strong> (op " + data[i].gapsformatted + ")</strong><br></p>";
          }
        }
      }
    }
  }

  // Om truitjes toe te voegen
  document.body.innerHTML = document.body.innerHTML.split(data[0].algnaam).join("<i class='fas rand fa-tshirt' style='color:" + data[6].koers + ";'></i> " + data[0].algnaam);
  document.body.innerHTML = document.body.innerHTML.split(data[0].puntnaam).join("<i class='fas rand fa-tshirt' style='color:" + data[7].koers + ";'></i> " + data[0].puntnaam);
  document.body.innerHTML = document.body.innerHTML.split(data[0].bergnaam).join("<i class='fas rand fa-tshirt' style='color:" + data[8].koers + ";'></i> " + data[0].bergnaam);
  document.body.innerHTML = document.body.innerHTML.split(data[0].jongnaam).join("<i class='fas rand fa-tshirt' style='color:" + data[9].koers + ";'></i> " + data[0].jongnaam);

  // Verandert de vlagtekst naar werkelijke vlagjes op de site
  vlaggen();
}

window.addEventListener('DOMContentLoaded', init);

// Localstorage voor alert
var isshow = localStorage.getItem('isshow');
if (isshow == null || isshow === "0") {
  $('#refresh').show();
  localStorage.setItem('isshow', 0);
} else {
  $('#refresh').hide();
}

function closealert() {
  localStorage.setItem('isshow', 1);
}

// Localstorage voor updates
var update1 = localStorage.getItem('update2');
if (update1 == null || update1 === "0") {
  $('#updates').show();
  localStorage.setItem('update2', 0);
} else {
  $('#updates').hide();
}

function closealert2() {
  localStorage.setItem('update2', 1);
}

// Refresh van de pagina uitzetten
var refreshklik = 0;

function stoprefresh() {
  if (refreshklik != 1) {
    clearInterval(counterBack);
    clearInterval(reload);
    refreshklik = 1;
    $('.progress-bar').addClass("progress-bar-danger");
    $('#sync').show();
  } else {
    location.reload();
  }

}

// Counter progress bar
var count = 100;

function countprogress() {
  count--;
  if (count > 0) {
    $('.progress-bar').css('width', count + '%');
  } else {
    clearInterval(counterBack);
  }
}
var counterBack = setInterval(countprogress, 600);

// Herladen van de pagina
var reload = setInterval(function() {
  location.reload();
}, 60000);

// Vlaggen ipv tekst
function vlaggen() {
  var landnaam = ["GBR", "NED", "FRA", "ITA", "IER", "AUS", "ESP", "NZL", "ECU", "CAN", "COL", "POR", "AUT", "OOS", "EST", "GER", "IRL", "RUS", "BEL", "DEN", "ALB", "LUX", "SLO", "RSA", "CZE", "SUI", "USA", "ERI", "KAZ", "ENG", "NOR", "ARG", "ISR",
    "LAT", "BLR", "POL", "SWE", "FIN", "SVK", "UKR", "SRB", "HUN", "LTU", "BRA", "DOM", "URU", "CRC", "RWA", "JAP", "MEX", "CRO", "MDA", "SPA", "LET", "VS", "DUI", "ZWI"
  ];
  var vlagnaam = ["gb", "nl", "fr", "it", "ie", "au", "es", "nz", "ec", "ca", "co", "pt", "at", "at", "ee", "de", "ie", "ru", "be", "dk", "al", "lu", "si", "za", "cz", "ch", "us", "er", "kz", "england", "no", "ar", "il", "lv", "by", "pl", "se", "fi",
    "sk", "ua", "rs", "hu", "lt", "br", "do", "uy", "cr", "rw", "jp", "mx", "hr", "md", "es", "lv", "us", "de", "ch"
  ];
  for (i = 0; i < landnaam.length; i++) {
    var landn = "\\(+" + landnaam[i] + "\\)+";
    var vlagn = "&nbsp;<i class=\"famfamfam-flag-" + vlagnaam[i] + "\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"" + landnaam[i] + "\"></i>";
    document.body.innerHTML = document.body.innerHTML.replace(new RegExp(landn, "g"), vlagn);
  }
  $(function() {
    $('[data-toggle="tooltip"]').tooltip()
  })
  document.body.innerHTML = document.body.innerHTML.replace(new RegExp(":00", "g"), "");
}

var kliker = "0";

function tizframes() {
  if (kliker == null || kliker === "0") {
    var links = ["961440063185", "935617371857", "952158068433", "927837789905", "922912235217"];
    for (var i = 0; i < links.length; i++) {
      document.getElementById("tizframes").innerHTML +=
        "<br><iframe width='100%' height='360' src='//ok.ru/videoembed/" + links[i] + "?nochat=1' frameborder='0' allow='autoplay'  allowfullscreen></iframe>";
    }
    var klik = "1";
    console.log(klik);
    stoprefresh();
  } else if (kliker === "1") {
    console.log('klik gedaan');
  }
}

function colrit() {
  $("#klassement").collapse('hide');
  $("#profiel").collapse('hide');
}

function colprof() {
  $("#klassement").collapse('hide');
  $("#laatsterit").collapse('hide');
}

function colklas() {
  $("#profiel").collapse('hide');
  $("#laatsterit").collapse('hide');
}
