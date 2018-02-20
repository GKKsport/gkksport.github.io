//voor datum van vandaag
function yyyymmdd(dateIn) {
	var yyyy = dateIn.getFullYear();
	var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
	var dd = dateIn.getDate();
	return String(10000 * yyyy + 100 * mm + dd); // Leading zeros for mm and dd
}
var today = yyyymmdd(new Date());
//basis-API-url met datum, clientID en secretID
var clientID = 'YOPY5G3EOBXN2CRDNUNRC3EK0UK54GWFKKRJJAJRTA0ITOOZ',
	secretID = '24XZ5NOGJPFUIZNGEIXDM3QGUBKJA1154012JMUMBI2TFVTX',
	url = 'https://api.foursquare.com/v2/venues/explore?client_id=' + clientID + '&client_secret=' + secretID + '&v=' + today + '&limit=30' + '&sortByDistance=1';

var ctrl = function (url, el) {
	this.url = url || null;
	this.el = el || null;
}

ctrl.prototype.getData = function () {
	var self = this;
	$.get(self.url)
		.done(function (res) {
			if (self.update) self.createEl(res);
			else self.append(res);
		});
}

var createFK = new ctrl();
createFK.url = url + '&query=nightlife';
createFK.el = $('.outdoor');

createFK.createEl = function (res) {
	var venues = res.response.groups[0].items,
		el = this.el,
		$node;

	for (var i = 0; i < venues.length; i++) {
		$node = tpl(venues[i].venue);
		el.append($node);
	}
	this.data = res;
	console.log(venues.length);
}

var tpl = function (venue) {
	console.log(venue);
	var node = '';
	var imgPrefix = "https://igx.4sqi.net/img/general/150x200"
	var gmaps = "https://www.google.be/maps?q="

	if (typeof venue.location.address != "undefined") {

		node += '<div class="thumbnail"><li class="list-item" data-id="' + venue.id + '" data-req=0>';
		node += '<div class="name">' + venue.name + '</div>';
		if (typeof venue.rating != "undefined") {

			node += '<div class="score" style="background-color:#' + venue.ratingColor + '95">' + venue.rating + '</div>';
			/*
			if (venue.rating >= 8.0) {
				node += '<div class="score groen">' + venue.rating + '</div>';
			} else if (venue.rating >= 5.0) {
				node += '<div class="score geel">' + venue.rating + '</div>';
			} else {
				node += '<div class="score rood">' + venue.rating + '</div>';
			}
			*/
		} else {
			node += '<div class="score">Geen</div>';
		}
		node += '<div class="address"><i class="fas fa-map-marker"></i> ' + '<a target="_blank" href="' + gmaps + venue.location.lat + ',' + venue.location.lng + '">' + venue.location.address + '</a> (op ' + venue.location.distance + 'm)</div>';
		node += '</li>';
		node += '<div class="details"><br>';
		if (typeof venue.hours != "undefined") {
			if (venue.hours.status != undefined) {
				if (venue.hours.isOpen === false) {
					node += '<div class="gesloten">GESLOTEN</div>';
					node += '<div class="time"><i class="fas fa-clock"></i> ' + venue.hours.status + '</div>'
				} else {
					if (venue.hours.status === "Likely open") {
						node += '<div class="waarsopen">OPEN (waarschijnlijk)</div>';
						node += '<div class="time"><i class="fas fa-clock"></i> ' + venue.hours.status + '</div>'
					} else {
						node += '<div class="open">OPEN</div>';
						node += '<div class="time"><i class="fas fa-clock"></i> ' + venue.hours.status + '</div>'
					}
				}
			} else {
				node += '<div>Geen uren opgegeven</div>'
			}
		} else {
			node += '<div>Geen uren opgegeven</div>'
		}
		node += '<div class="url"><i class="fas fa-link"></i>';
		if (typeof venue.url != "undefined") {
			node += '<a target="_blank" href="' + venue.url + '"> Link naar website</a></div>';
		} else {
			node += ' Geen link beschikbaar</div>';
		}
		node += '<div class="phone"><i class="fas fa-phone"></i>';
		if (typeof venue.contact != "undefined") {
			if (venue.contact.formattedPhone === undefined) {
				node += ' Geen tel. beschikbaar</div>';
			} else {
				node += ' ' + venue.contact.formattedPhone + '</div>';
			}
		} else {
			node += ' Geen tel. beschikbaar</div>';
		}
		if (typeof venue.price != "undefined") {
			if (venue.price.tier === 5) {
				node += '<i class="fas fa-euro-sign"></i><i class="fas fa-euro-sign"></i><i class="fas fa-euro-sign"></i><i class="fas fa-euro-sign"></i><i class="fas fa-euro-sign"></i> (Extreem duur)';
			} else if (venue.price.tier === 4) {
				node += '<i class="fas fa-euro-sign"></i><i class="fas fa-euro-sign"></i><i class="fas fa-euro-sign"></i><i class="fas fa-euro-sign"></i> (Zeer duur)';
			} else if (venue.price.tier === 3) {
				node += '<i class="fas fa-euro-sign"></i><i class="fas fa-euro-sign"></i><i class="fas fa-euro-sign"></i> (Duur)';
			} else if (venue.price.tier === 2) {
				node += '<i class="fas fa-euro-sign"></i><i class="fas fa-euro-sign"></i> (Middelmatig)';
			} else if (venue.price.tier === 1) {
				node += '<i class="fas fa-euro-sign"></i> (Goedkoop)';
			}
		} else {
			node += 'Geen info over de prijs';
		}
		node += '</div>';
		node += '</div>';

	}
	return $(node);
}

function showContent(text) {
	$('.list-container').css('display', 'none');

	if (text == 'Frietkot')
		$('.outdoor').css('display', 'block');

}

function createDetails($node) {
	$('.details').css('display', 'none');
	if (!$node.data('req')) {
		$node.data('req', 1);
	} else {

	}
	$node.next().css('display', 'block');
}

function domEvents() {
	$('.list-container').on('click', '.list-item', function () {
		createDetails($(this));
	});
}

function geoCoder() {
	navigator.geolocation.getCurrentPosition(function (pos) {
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
		geocoder.geocode({
			'latLng': latlng
		}, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var result = results[0];
				var city = "";
				var state = "";
				for (var i = 0, len = result.address_components.length; i < len; i++) {
					var ac = result.address_components[i];
					if (ac.types.indexOf("locality") >= 0) city = ac.long_name;
					if (ac.types.indexOf("administrative_area_level_1") >= 0) state = ac.long_name;
				}
				if (city != '') {
					setCity(city);
					setLoc();
				}
			}
		});
	});
}

function setCity(city) {
	$('.city').text(city);
}

function setLoc() {
	navigator.geolocation.getCurrentPosition(function (pos) {
		geocoder = new google.maps.Geocoder();
		createFK.update = true;
		createFK.url += '&ll=' + pos.coords.latitude + ',' + pos.coords.longitude;
		createFK.getData();
		console.log(pos.coords.latitude + ',' + pos.coords.longitude)
		document.getElementById('loc').innerHTML += '<a href="https://www.google.be/maps?q=' + pos.coords.latitude + ',' + pos.coords.longitude + '" target="_blank"><u> klik hier om je aangegeven locatie te bekijken</u></a>';
	});

	domEvents();
}

geoCoder();
