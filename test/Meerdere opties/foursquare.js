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
	url = 'https://api.foursquare.com/v2/venues/explore?client_id=' + clientID + '&client_secret=' + secretID + '+&v=' + today + '+&limit=10';


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

//Frietkoten 
var createFK = new ctrl();
createFK.url = url + '&query=outdoor';
createFK.el = $('.body .outdoor');

var createRestaurant = new ctrl();
createRestaurant.url = url + '&query=food';
createRestaurant.el = $('.body .rest');

createFK.createEl = function (res) {
	var venues = res.response.groups[0].items,
		el = this.el,
		$node;

	for (var i = 0; i < venues.length; i++) {
		$node = tpl(venues[i].venue);
		el.append($node);
	}
	this.data = res;
}

createRestaurant.createEl = function (res) {
	var venues = res.response.groups[0].items,
		el = this.el,
		$node;

	console.log(el);
	for (var i = 0; i < venues.length; i++) {
		$node = tpl(venues[i].venue);
		el.append($node);
	}
	this.data = res;
}

var tpl = function (venue) {
	console.log(venue);
	var node = '';

	node += '<li class="list-item" data-id="' + venue.id + '"';
	node += 'data-req=0><div class="thumbnail">';
	node += '<div class="name">' + venue.name + '</div>';
	node += '<div class="address"><i class="fa fa-map-marker"></i>' + venue.location.address + '</div></li>';
	node += '<div class="details">'
	'</div></div>';

	return $(node);
}

function showContent(text) {
	$('.list-container').css('display', 'none');

	if (text == 'Frietkot')
		$('.outdoor').css('display', 'block');

	if (text == 'Restaurants')
		$('.rest').css('display', 'block');

}

function positionArrow(text) {
	if (text == 'Frietkot') return '2px';
	if (text == 'Restaurants') return '36px';
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
	$('.nav li').click(function () {
		if ($(this).attr('class') == 'city-small') return;

		$('.nav li').removeClass('selected');
		$(this).addClass('selected');
		var top = positionArrow($(this).text());
		$('.arrow').css('top', top);

		showContent($(this).text());
	});

	$('.list-container').on('click', '.list-item', function () {
		createDetails($(this));
	});
}

function geoCoder() {
	navigator.geolocation.getCurrentPosition(function (pos) {
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
		console.log(latlng)
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
					initiateRequests(city);
				}
			}
		});
	});
}

function setCity(city) {
	$('.city').text(city);
}

function initiateRequests(city) {
	//city = 'barcelona'; 
	createFK.update = true;
	createFK.url += '&near=' + city;
	createFK.getData();

	createRestaurant.update = true;
	createRestaurant.url += '&near=' + city;
	createRestaurant.getData();

	setCity(city);
	domEvents();
}

geoCoder();
