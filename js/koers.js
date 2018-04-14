var url = 'https://m.live.sporza.be/static/cycling_1772385.json';

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

var createGaps = new ctrl();
createGaps.url = url;
createGaps.el = $('.gaps');

createGaps.createEl = function (res) {
	var gaps = res.response.match.gaps[0].name,
		el = this.el,
		$node;

	for (var i = 0; i < gaps.length; i++) {
		$node = tpl(gaps[i].gaps);
		el.append($node);
	}
	this.data = res;
	console.log(gaps.length);
}
