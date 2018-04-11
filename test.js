(function ($) {
	$.fn.carousel = function (opts) {
		var defaults = {
			timeout: 10000,
			fx: "fade",
			speed: "fast",
			pauseOnPagerHover: 1,
			mode: "thumb",
			thumbwidth: 110,
			thumbheight: 62,
			autoPlay: false
		};
		var options = $.extend(defaults, opts);
		return this.each(function () {
			var $carousel = $(this);
			var total = $(".carouselcontent > div", $carousel).size();
			var first = 1;
			var navigating = false;
			var $content = $(".carouselcontent", $carousel).after('<div class="control"><i></i>').after('<div class="carouselbandcontainer"><div class="carouselband" style="display:none;"><ul></div></div>');
			var $control = $(".control", $carousel);
			var $band = $(".carouselband", $carousel);
			var $ul = $("ul", $band);
			options.autoPlay = $carousel.hasClass("autorotate");
			var hidden = ($content.css("display") == "none");
			if ($carousel.hasClass("modetitle")) {
				options.mode = "title";
			}
			if ($carousel.hasClass("modedescription")) {
				options.mode = "description";
			}
			$(".carouselbandcontainer", $carousel).prepend('<div class="prev"><span>&lt;</span></div>').append('<div class="next"><span>&gt;</span></div>');
			var $prev = $(".prev", $carousel);
			var $next = $(".next", $carousel);
			var items = 5;
			var ulOffset = 0;
			var liWidth = 0;
			var $theParent = $(this).parent();
			var aside = $theParent.attr("id") == "aside";
			var span = getSpan(this);
			if (span == 24) {
				items = 7;
				ulOffset = 50;
			} else {
				if (span == 12) {
					items = 3;
					ulOffset = 40;
				} else {
					if (span == 10) {
						items = 2;
						ulOffset = 80;
					} else {
						if (span == 8) {
							items = 2;
							ulOffset = 15;
						} else {
							if (span == 7) {
								items = 1;
								ulOffset = 80;
							} else {
								if (span == 5) {
									items = 1;
								} else {
									if (aside) {
										items = 1;
										ulOffset = 90;
									} else {
										if ($theParent.hasClass("paragraph-resource")) {
											items = 1;
											ulOffset = 0;
										} else {
											if ($theParent.attr("id") == "articlesidebar") {
												items = 1;
												ulOffset = 0;
											} else {
												if ($theParent.hasClass("narrow")) {
													items = 3;
													ulOffset = 40;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			var $theDiv = $(">div", $content);
			if ($theDiv.size() == 1) {
				$band.show();
				$control.hide();
				$theDiv.css("position", "relative");
				var slide = $theDiv;
				$("span.category", slide).remove();
				var $imageSpan = $("span.image", slide);
				var imgSrc = $imageSpan.attr("data-image-uri");
				var thumbSrc = $imageSpan.attr("data-thumb-uri");
				var img = new Image();
				$(img).load(function () {
					var $videoSlide = $(".media .video", slide);
					if ($videoSlide.size() > 0) {
						$videoSlide.prepend(this);
					} else {
						$(".media", slide).append(this);
					}
					$("span.image", slide).remove();
				}).attr("src", imgSrc);
				var img2 = new Image();
				$(img2).load(function () {
					img2.width = 110;
					liWidth = img2.width + 3 + 3 + 3 + 2;
					$band.css("width", ((liWidth * items) + ulOffset) + "px");
					$ul.css("width", ((total * liWidth) + ulOffset));
					$(".overlay", slide).click(function () {
						$content.cycle("pause");
						$control.addClass("play");
						$control.removeClass("pause");
					});
				}).attr("src", thumbSrc);
				var overlay = "";
				var myClass = "";
				if ($(".media .video", slide).size() > 0) {
					overlay = '<div class="overlay"></div>';
					myClass = 'class="video"';
				}
				if ($(".media.audio", slide).size() > 0) {
					overlay = '<div class="overlay"></div>';
					myClass = 'class="audio"';
				}
				if ($(".slideshow", slide).size() > 0) {
					overlay = '<div class="overlay"></div>';
					myClass = 'class="slideshow"';
				}
				var $h1_a = $("h1 a", slide);
				var $desc_a = $(".desc > a", slide);
				var title = ($h1_a.size() > 0) ? $h1_a.html() : $("h1", slide).html();
				var desc = ($desc_a.size() > 0) ? $desc_a.html() : $(".desc", slide).html();
				var li = "";
				var theHref = ($h1_a.size() > 0) ? 'href="#"' : "";
				if (options.mode == "thumb") {
					li = '<li class=""><a ' + myClass + " " + theHref + ' data-index="1"><img src="' + img2.src + '"/>' + overlay + "</a></li>";
				} else {
					if (options.mode == "title") {
						li = '<li class=""><a ' + myClass + " " + theHref + ' data-index="1"><div><div><img src="' + img2.src + '"/>' + overlay + "</div><h2>" + title + "</h2></div></a></li>";
					} else {
						if (options.mode == "description") {
							li = '<li class=""><a ' + myClass + " " + theHref + ' data-index="1"><div><div><img src="' + img2.src + '"/>' + overlay + "</div><h2>" + title + "</h2>" + desc + "</div></a></li>";
						}
					}
				}
				$ul.html(li);
				$("li", $ul).click(function (event) {
					event.preventDefault();
					navigating = true;
					if (hidden) {
						var href = $h1_a.attr("href");
						if (href != "" && href != "#" && href != undefined && href != "undefined") {
							$h1_a.click();
						}
					}
					return false;
				});
			} else {
				$content.cycle({
					cleartype: 1,
					pauseOnPagerHover: options.pauseOnPagerHover,
					fx: options.fx,
					speed: options.speed,
					timeout: options.timeout,
					pager: $ul,
					pagerAnchorBuilder: function (idx, slide) {
						$("span.category", slide).remove();
						if (idx == 0) {
							liWidth = 110 + 3 + 3 + 3 + 2;
							$band.css("width", ((liWidth * items) + ulOffset) + "px");
							$ul.css("width", ((total * liWidth) + ulOffset));
						} else {
							if (idx + 1 == total) {
								$("img", $band).css("width", "110px");
								$band.fadeIn("slow");
							}
						}
						$(".overlay", slide).click(function () {
							$content.cycle("pause");
							$control.addClass("play");
							$control.removeClass("pause");
						});
						var overlay = "";
						var linkOptions = 'href="#" data-index="' + (idx + 1) + '"';
						if ($(".media .video", slide).size() > 0) {
							overlay = '<div class="overlay"></div>';
							linkOptions += 'class="video"';
						}
						if ($(".media.audio", slide).size() > 0 && $content.css("display") == "none") {
							overlay = '<div class="overlay"></div>';
							if ($content.css("display") == "none") {
								linkOptions = 'class="audio audiolink" href="' + $(".audio a", slide).attr("href");
							} else {
								linkOptions += 'class="audio"';
							}
						}
						if ($(".slideshow", slide).size() > 0) {
							overlay = '<div class="overlay"></div>';
							if ($content.css("display") == "none") {
								linkOptions = 'class="slideshow" href="' + $("span.image", slide).html() + '"';
							} else {
								linkOptions += 'class="slideshow"';
							}
						}
						var $h1_a = $("h1 a", slide);
						var $desc_a = $(".desc > a", slide);
						var title = ($h1_a.size() > 0) ? $h1_a.html() : $("h1", slide).html();
						var desc = ($desc_a.size() > 0) ? $desc_a.html() : $(".desc", slide).html();
						var src = $("span.image", slide).attr("data-image-uri");
						if (options.mode == "thumb") {
							return '<li class=""><a ' + linkOptions + ' ><img src="' + src + '"/>' + overlay + "</a></li>";
						} else {
							if (options.mode == "title") {
								return '<li class=""><a ' + linkOptions + ' ><div><div><img src="' + src + '"/>' + overlay + "</div><h2>" + title + "</h2></div></a></li>";
							} else {
								if (options.mode == "description") {
									return '<li class=""><a ' + linkOptions + ' ><div><div><img src="' + src + '"/>' + overlay + "</div><h2>" + title + "</h2>" + desc + "</div></a></li>";
								} else {
									return "";
								}
							}
						}
					},
					before: function (currSlideElement, nextSlideElement) {
						if ($(".media img", nextSlideElement).size() == 0) {
							var img = new Image();
							$(img).load(function () {
								var $videoSlide = $(".media .video", nextSlideElement);
								if ($videoSlide.size() > 0) {
									$videoSlide.prepend(this);
									$videoSlide.click(function () {
										$content.cycle("pause");
										$control.addClass("play");
										$control.removeClass("pause");
									});
								} else {
									$(".media", nextSlideElement).append(this);
								}
								$("li.audio a", nextSlideElement).click(function () {
									$content.cycle("pause");
									$control.addClass("play");
									$control.removeClass("pause");
								});
							}).attr("src", $("span.image", nextSlideElement).attr("data-image-uri"));
						}
					},
					after: function () {
						var current = $(".activeSlide", $carousel).attr("data-index");
						$("li.active", $band).removeClass("active");
						$("li:eq(" + (current - 1) + ")", $band).addClass("active");
						if (!navigating) {
							if (current % items == 1 || aside || span == 7) {
								$next.click();
								navigating = false;
							}
							if (current == 1) {
								if (items < total) {
									$next.removeClass("no");
								}
								$prev.addClass("no");
								$ul.animate({
									left: "0px"
								}, "fast");
								first = 1;
							}
						}
						navigating = false;
					},
					pagerClick: function (zeroBasedSlideIndex, slideElement) {
						navigating = true;
						if (hidden) {
							var $h1_a = $("h1 > a", slideElement);
							var href = $h1_a.attr("href");
							var click2 = ($(".matchReview > a", slideElement).attr("onclick") != undefined) ? $(".matchReview > a", slideElement).attr("onclick").toString() : "";
							if (click2 != "") {
								eval(click2);
							} else {
								if (href != "" && href != "#" && href != undefined && href != "undefined") {
									$h1_a.click();
								}
							}
						}
						return false;
					}
				});
			}
			var contentHeight = $content.find(".contentitem").height();
			if (contentHeight <= 0) {
				contentHeight = 284;
			}
			$content.css("height", contentHeight + "px");
			if (!options.autoPlay) {
				$content.cycle("pause");
				$control.hide();
			}
			$("li:first", $band).addClass("active");
			$prev.addClass("no");
			if (total <= items) {
				$next.addClass("no");
			}
			$next.click(function () {
				navigating = true;
				var nextFirst = first + items;
				if (nextFirst <= total) {
					var left = liWidth * items;
					first = nextFirst;
					var currentOffset = stripPX($ul.css("left"));
					$ul.animate({
						left: currentOffset - left
					}, "fast");
					$prev.removeClass("no");
				}
				if ((first + items) > total) {
					$next.addClass("no");
				}
			});
			$prev.click(function () {
				navigating = true;
				var prevFirst = first - items;
				var prevLast = first - 1;
				if (prevLast >= 1) {
					var left = liWidth * items;
					first = prevFirst;
					var currentOffset = stripPX($ul.css("left"));
					$ul.animate({
						left: currentOffset + left
					}, "fast");
					$next.removeClass("no");
				}
				if ((first - 1) < 1) {
					$prev.addClass("no");
				}
			});
			if ($carousel.hasClass("autorotate")) {
				$control.addClass("pause");
			} else {
				$control.addClass("play");
			}
			$control.click(function () {
				if ($(this).hasClass("play")) {
					$content.cycle("resume");
					$(this).addClass("pause").removeClass("play");
				} else {
					$content.cycle("pause");
					$(this).addClass("play").removeClass("pause");
				}
			});
		});

		function getSpan(obj) {
			var temp = $(obj).parents(".col:first").attr("class").split(" ");
			var r = "";
			for (var k = 0; k < temp.length; k++) {
				var temp2 = temp[k].split("-")[1];
				if (temp2 != undefined) {
					r = temp2;
				}
			}
			return r;
		}
	};
})(jQuery);
(function ($) {
	$.fn.epg = function (options) {
		var defaults = {
			timeout: 10000,
			fx: "scrollHorz",
			speed: 700,
			pauseOnPagerHover: 1,
			mode: "thumb",
			thumbwidth: 110,
			thumbheight: 62,
			autoPlay: false
		};
		var options = $.extend(defaults, options);
		return this.each(function () {
			var $carousel = $(this);
			var total = $(".carouselcontent > div", $carousel).size();
			var first = 1;
			var navigating = false;
			var $content = $(".carouselcontent", $carousel).after('<div class="control">');
			var $control = $(".control", $carousel).prepend('<div class="prev">').append('<div class="next">');
			options.autoPlay = $carousel.hasClass("autorotate");
			var $prev = $(".prev", $carousel);
			var $next = $(".next", $carousel);
			var items = 1;
			var pos = 0;
			var uloffset = 0;
			if ($("> div", $content).size() == 1) {} else {
				$content.cycle({
					pauseOnPagerHover: options.pauseOnPagerHover,
					fx: options.fx,
					speed: options.speed,
					timeout: options.timeout,
					next: $next,
					prev: $prev,
					height: "auto",
					containerResize: 1
				});
			}
			$("div.contentitem", $content).equalHeights();
			$control.hover(function () {
				$(this).stop();
			}, function () {
				$control.animate({
					height: "0px"
				}, 200);
			});
			$content.hover(function () {
				$control.animate({
					height: "30px"
				}, 200);
			}, function () {
				$control.animate({
					height: "0px"
				}, 200);
			});
			$control.click(function () {
				if ($(this).hasClass("play")) {
					$content.cycle("resume");
					$(this).addClass("pause");
					$(this).removeClass("play");
				} else {
					$content.cycle("pause");
					$(this).addClass("play");
					$(this).removeClass("pause");
				}
			});
			$content.removeClass("hidden");
			$control.animate({
				height: "0px"
			}, 200);
		});
	};
})(jQuery);
(function ($) {
	$.fn.slideshow = function () {
		var $container = $(this);
		var $frame = $(".slideshow-caroussel", $container);
		var $slides = $frame.find(".slideshow-navigation-item");
		var $wrap = $frame.parent();
		var $loaded = [0];
		var $images = $container.find(".main-image");
		var keys = {
			closeKeys: [27, 88, 67],
			previousKeys: [37, 38, 80],
			nextKeys: [39, 40, 78]
		};
		var slyOptions = {
			horizontal: 0,
			itemNav: "centered",
			smart: 1,
			activateOn: "click",
			scrollSource: $frame,
			scrollBy: 1,
			scrollBar: $wrap.children(".scrollbar"),
			dragHandle: 1,
			dynamicHandle: 1,
			minHandleSize: 50,
			clickBar: 1,
			syncSpeed: 0.5,
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			swingSpeed: 0.2,
			elasticBounds: 1,
			cycleBy: "items",
			cycleInterval: 6000,
			pauseOnHover: 1,
			moveBy: 300,
			speed: 200,
			easing: "linear",
			keyboardNavBy: 0,
			prev: $(".slide-prev", $container),
			next: $(".slide-next", $container)
		};

		function setPositionBar(index) {
			$container.find(".slideshow-position-index").text(index);
		}

		function setMainImage(index) {
			var $image = $images.eq(index);
			if (index >= 0 && index < $images.size() && $.inArray(index, $loaded) < 0) {
				$image.attr("src", $image.data("source"));
				$loaded[$loaded.length] = index;
			}
			$images.hide();
			$image.show();
			preLoadNativeImage(index - 1);
			preLoadNativeImage(index + 1);
		}

		function preLoadNativeImage(index) {
			if (index >= 0 && $.inArray(index, $loaded) < 0) {
				var $image = $images.eq(index);
				$image.attr("src", $image.data("source"));
				$loaded[$loaded.length] = index;
			}
		}
		var sly = new Sly($frame, slyOptions).init();
		sly.on("active", function (eventName, itemIndex) {
			var $slidee = $slides.eq(itemIndex);
			setPositionBar(itemIndex + 1);
			setMainImage(itemIndex);
			$container.find(".slideshow-image-meta .description").text($slidee.data("description"));
			$container.find(".slideshow-image-meta .slideshow-copyright").text($slidee.data("source"));
		});
		$container.find(".slideshow-image .slide-next").on("click", function (e) {
			e.preventDefault();
			sly.next();
		});
		$container.find(".slideshow-image .slide-prev").on("click", function (e) {
			e.preventDefault();
			sly.prev();
		});
		$container.find(".autorotate").on("click", function (e) {
			e.preventDefault();
			$(this).toggleClass("pause play");
			sly.toggle();
		});

		function shutdown() {
			sly.destroy();
			$(".slideshow-disable").removeClass("slideshow-disable");
			$container.html("").toggleClass("open closed");
			$(document).unbind("keydown", slideShowKeyDown);
		}
		$container.find(".slideshow-close").on("click", function (e) {
			e.preventDefault();
			shutdown();
		});

		function slideShowKeyDown(event) {
			var code = event.keyCode,
				fn = $.inArray;
			if (fn(code, keys.closeKeys) >= 0) {
				event.preventDefault();
				shutdown();
				return false;
			} else {
				if (fn(code, keys.nextKeys) >= 0) {
					event.preventDefault();
					sly.next();
					return false;
				} else {
					if (fn(code, keys.previousKeys) >= 0) {
						event.preventDefault();
						sly.prev();
						return false;
					}
				}
			}
			return true;
		}
		$(document).bind("keydown", slideShowKeyDown);
		$("#slideshow").bind("touchmove", function (event) {
			event.preventDefault();
			return false;
		});
	};
})(jQuery);
(function ($) {
	$.fn.ticker = function (options) {
		var defaults = {
			fx: "scrollHorz",
			speed: 800,
			timeout: 6000,
			autoplay: false,
			manual: false
		};
		var opts = $.extend(defaults, options);
		var btnId = 0;
		return this.each(function () {
			var $ticker = $(this);
			var tickerWidth = $(this).width();
			var tickerManual = opts.manual || $(this).parent().hasClass("manual");
			var isIE7 = $("body").hasClass("ie7");
			if (isIE7) {
				var tickerHeight = 0;
				$("*", this).each(function () {
					if ($(this).outerHeight() > tickerHeight) {
						tickerHeight = $(this).outerHeight();
					}
				});
			}
			var finalOpts = {};
			var prevBtnId = null;
			var nextBtnId = null;
			if (tickerManual) {
				prevBtnId = "ticker-prev-" + btnId;
				nextBtnId = "ticker-next-" + btnId;
				$('<div class="ticker-prev-btn" id="' + prevBtnId + '"></div><div class="ticker-next-btn" id="' + nextBtnId + '"></div>').appendTo($ticker.parent());
				prevBtnId = "#" + prevBtnId;
				nextBtnId = "#" + nextBtnId;
				btnId++;
				finalOpts.next = nextBtnId;
				finalOpts.prev = prevBtnId;
			}
			finalOpts.before = function (currSlideElement, nextSlideElement, opts, forwardFlag) {
				$(nextSlideElement).css("width", tickerWidth);
			};
			finalOpts.pause = true;
			$ticker.cycle($.extend(opts, finalOpts));
			$ticker.css("width", tickerWidth);
			if (isIE7) {
				$ticker.css("height", tickerHeight);
			}
		});
	};
})(jQuery);
var SpotlightElement = {
	imgSpeed: deviceIsIOS ? 1 : 400,
	descSpeed: deviceIsIOS ? 1 : 300,
	rotateSpeed: 5000,
	isFirefox: navigator.userAgent.match(/firefox/i),
	setActiveSlot: function ($sl) {
		$sl.addClass("active").siblings().removeClass("active");
	},
	setActiveSlide: function ($el) {
		$el.addClass("active").siblings().removeClass("active");
	},
	setHover: function ($sl) {
		$sl.addClass("hover").siblings().removeClass("hover");
	},
	clearHover: function ($sl) {
		$sl.removeClass("hover");
	},
	rotateSpotlight: function (s) {
		var $s = $(s);
		var nextSlot;
		if (!$s.hasClass("hover")) {
			if ($(".spot-3", $s).size() > 0) {
				if ($(".active.slot-1", $s).size()) {
					nextSlot = $(".slot-2", $s);
				}
				if ($(".active.slot-2", $s).size()) {
					nextSlot = $(".slot-3", $s);
				}
				if ($(".active.slot-3", $s).size()) {
					nextSlot = $(".slot-1", $s);
				}
			} else {
				if ($(".spot-2", $s).size() > 0) {
					if ($(".active.slot-1", $s).size()) {
						nextSlot = $(".slot-2", $s);
					}
					if ($(".active.slot-2", $s).size()) {
						nextSlot = $(".slot-1", $s);
					}
				}
			}
			this.activateSlot(nextSlot, $s);
		}
		setTimeout('rotateSpotlight("' + s + '")', this.rotateSpeed);
	},
	activateSlot: function ($sl, $s) {
		var mainLeftValue, mainWidth, leftValue, activeSlide;
		this.setActiveSlot($sl);
		$(".eyeXL h1", $s).html($("h2", $sl).html());
		if ($sl.find(".slideshow").length) {
			$(".eyeXL h1.title_after_media").addClass("slideshow contentitem");
		} else {
			$(".eyeXL h1.title_after_media").removeClass("slideshow contentitem");
		}
		if ($sl.hasClass("slot-1")) {
			if ($(".spot-3", $s).size() > 0) {
				mainLeftValue = 0;
				mainWidth = 235;
				leftValue = -206;
				activeSlide = 0;
				$(".mediaWrapper > div:eq(0) img", $s).stop().animate({
					left: 0
				}, this.imgSpeed, function () {
					$(".mediaWrapper > div:eq(1) img", $s).css("left", 960);
					$(".mediaWrapper > div:eq(2) img", $s).css("left", 960);
				});
				$(".slot-0 .desc > div > div:eq(1), .slot-0 .desc > div > div:eq(2)", $s).stop().animate({
					left: 280
				}, this.descSpeed, function () {
					$(".slot-1", $s).css("border-right", "1px solid #efefef");
					$(".slot-2", $s).css("border-right", "1px solid #efefef");
					$(".slot-0 .desc", $s).css("border-left", "0");
				});
			} else {
				if ($(".spot-2", $s).size() > 0) {
					mainLeftValue = 0;
					mainWidth = 320;
					leftValue = -277;
					activeSlide = 0;
					$(".mediaWrapper > div:eq(0) img", $s).stop().animate({
						left: 0
					}, this.imgSpeed, function () {
						$(".mediaWrapper > div:eq(1) img", $s).css("left", 960);
					});
					$(".slot-0 .desc > div > div:eq(1)", $s).stop().animate({
						left: 360
					}, this.descSpeed);
					$(".slot-0 .desc", $s).css("border-left", "0").css("border-right", "1px solid #efefef");
				}
			}
		} else {
			if ($sl.hasClass("slot-2")) {
				if ($(".spot-3", $s).size() > 0) {
					mainLeftValue = 198;
					mainWidth = 235;
					leftValue = -250;
					activeSlide = 1;
					$(".mediaWrapper > div:eq(1) img", $s).stop().animate({
						left: 0
					}, this.imgSpeed, function () {
						$(".mediaWrapper > div:eq(0) img", $s).css("left", -960);
						$(".mediaWrapper > div:eq(2) img", $s).css("left", 960);
					});
					$(".slot-0 .desc > div > div:eq(0)", $s).stop().animate({
						left: -280
					}, this.descSpeed);
					$(".slot-0 .desc > div > div:eq(2)", $s).stop().animate({
						left: 280
					}, this.descSpeed, function () {
						$(".slot-2", $s).css("border-right", "0");
						$(".slot-1", $s).css("border-right", "1px solid transparent");
						$(".slot-0 .desc", $s).css("border-left", "1px solid #efefef");
					});
				} else {
					if ($(".spot-2", $s).size() > 0) {
						mainLeftValue = 308;
						mainWidth = 320;
						leftValue = -250;
						activeSlide = 1;
						$(".mediaWrapper > div:eq(1) img", $s).stop().animate({
							left: 0
						}, this.imgSpeed, function () {
							$(".mediaWrapper > div:eq(0) img", $s).css("left", -960);
						});
						$(".slot-0 .desc > div > div:eq(0)", $s).stop().animate({
							left: -360
						}, this.descSpeed);
						$(".slot-0 .desc", $s).css("border-left", "1px solid #efefef").css("border-right", "0");
					}
				}
			} else {
				if ($sl.hasClass("slot-3")) {
					mainLeftValue = 393;
					mainWidth = 235;
					leftValue = -300;
					activeSlide = 2;
					$(".mediaWrapper > div:eq(2) img", $s).stop().animate({
						left: 0
					}, this.imgSpeed, function () {
						$(".mediaWrapper > div:eq(0) img", $s).css("left", -960);
						$(".mediaWrapper > div:eq(1) img", $s).css("left", -960);
					});
					$(".slot-0 .desc > div > div:eq(0), .slot-0 .desc > div > div:eq(1)", $s).stop().animate({
						left: -280
					}, this.descSpeed, function () {
						$(".slot-1", $s).css("border-right", "1px solid #efefef");
						$(".slot-2", $s).css("border-right", "0");
						$(".slot-0 .desc", $s).css("border-left", "1px solid #efefef");
						if (!SpotlightElement.isFirefox) {
							$(".slot-3", $s).css("margin-left", "-1px");
						}
					});
				}
			}
		}
		this.setActiveSlide($(".mediaWrapper > div:eq(" + activeSlide + ")", $s));
		$(".slot-0 .desc > div > div:eq(" + activeSlide + ")", $s).stop().animate({
			left: 20
		}, this.descSpeed);
		$(".slot-0 .desc", $s).stop().animate({
			left: mainLeftValue,
			width: mainWidth
		}, this.descSpeed - 50);
		if ($(".spot-3", $s).size() > 0) {
			$(".slot-2", $s).stop().animate({
				left: leftValue
			}, 200);
		}
	},
	tallest: function ($elems) {
		var maxHeight = 0;
		$elems.each(function () {
			maxHeight = Math.max(maxHeight, $(this).height());
		});
		return maxHeight;
	},
	init: function (s) {
		var $s = $(s);
		if ($s.size() > 0) {
			$s.parent().addClass("spotSpan");
			var $slot0desc = $(".slot-0 .desc", $s);
			$slot0desc.removeClass("hidden");
			if ($(".spot-1", $s).size() === 0) {
				this.setActiveSlot($(".slot-1", $s));
				if ($(".spot-3", $s).size() > 0) {
					$("> div > div:not(:eq(0))", $slot0desc).css("left", 300);
					$(".slot-1", $s).css("left", "-300px");
					$(".slot-2", $s).css("left", "-208px");
					$(".slot-3", $s).css("left", "-208px");
					$slot0desc.css("margin-right", "25px");
				} else {
					if ($(".spot-2", $s).size() > 0) {
						$("> div > div:not(:eq(0))", $slot0desc).css("left", 370);
						$(".slot-1", $s).css({
							left: "-386px",
							"margin-right": "0"
						});
						$(".slot-2", $s).css("left", "-277px");
					}
				}
				var that = this;
				$(".slot-1, .slot-2, .slot-3", $s).mouseover(function () {
					that.activateSlot($(this), $s);
				});
				this.activateSlot($(".slot-1", $s), $s);
				$s.hover(function () {
					that.setHover($(this));
				}, function () {
					that.clearHover($(this));
				});
				if ($s.hasClass("autorotate")) {
					setTimeout('rotateSpotlight("' + s + '")', 5000);
				}
				var $spotWrapper = $(".spotWrapper", $s);
				var $eyecatchers = $(".eyeM", $spotWrapper);
				var $descriptions = $("> div > div", $slot0desc);
				$eyecatchers.equalHeights();
				$descriptions.equalHeights();
				$slot0desc.height(this.tallest($eyecatchers.add($descriptions)) + 17);
				$spotWrapper.height(this.tallest($eyecatchers));
			} else {
				var $ie7Spot1eyeXL = $(".ie7 .spot-1 .eyeXL");
				var offset = $(".desc", $ie7Spot1eyeXL).height() + 5;
				$ie7Spot1eyeXL.height($ie7Spot1eyeXL.height() + offset);
				$("h1", $ie7Spot1eyeXL).css("bottom", 70 + offset + "px");
			}
		}
	}
};

function rotateSpotlight(s) {
	SpotlightElement.rotateSpotlight(s);
}

function setupWidgetMedia(w) {
	$(w).each(function () {
		var $w = $(this);
		var $origUl = $("ul", $w);
		dataRows = $w.attr("data-rows");
		var rowsPerPage = (dataRows ? parseInt(dataRows) : 1);
		var itemsPerRow = 2;
		var itemsPerPage = rowsPerPage * itemsPerRow;
		var $items = $("li", $origUl);
		var totalItems = $items.size();
		var pages = Math.ceil(totalItems / itemsPerPage);
		var gap = parseInt($("li:eq(0)", $w).css("marginLeft"));
		var itemOuterWidth = $(":eq(0)", $items).outerWidth();
		var pageWidth = (itemsPerRow * (itemOuterWidth + gap)) + gap;
		if (totalItems > itemsPerPage) {
			var $ulContainer = $('<div class="scrollcontainer" />');
			for (page = 1; page < pages; page++) {
				var $pageUl = $("<ul />");
				$items.slice(page * itemsPerPage, (page + 1) * itemsPerPage).appendTo($pageUl);
				$pageUl.appendTo($ulContainer);
				$pageUl.css("width", pageWidth);
			}
			$origUl.css("width", pageWidth);
			$origUl.prependTo($ulContainer);
			var $viewport = $('<div class="scrollviewport" />');
			$ulContainer.appendTo($viewport);
			$viewport.appendTo($w);
			for (var item = 0; item <= $items.size(); item += itemsPerRow) {
				$items.slice(item, item + itemsPerRow).equalHeights();
			}
			var pageHeight = $origUl.outerHeight();
			$ulContainer.css("height", pageHeight);
			$ulContainer.css("width", pageWidth * pages);
			$ulContainer.css("position", "absolute").css("left", "0");
			$viewport.css("height", pageHeight);
			$viewport.css("position", "relative");
			$viewport.css("overflow", "hidden");
			$w.append('<p class="pager"><span class="prev">&lt;</span><span class="next">&gt;</span></p>');
			for (page = 0; page < pages; page++) {
				$(".pager", $w).prepend('<a data-page="' + (pages - page) + '"></a> ');
			}
			$(".pager a:eq(0)", $w).addClass("selected");
			$(".pager a", $w).click(function () {
				$("a.selected", $w).removeClass("selected");
				$(this).addClass("selected");
				if ($(this).attr("data-page") <= pages) {
					$ulContainer.animate({
						left: -(($(this).attr("data-page") - 1) * pageWidth)
					});
				}
			});
			$(".next, .prev", $w).click(function () {
				var current = parseInt($("a.selected", $w).attr("data-page"));
				if ($(this).hasClass("prev")) {
					$(".pager a:eq(" + ((current - 1) - 1) + ")", $w).click();
				} else {
					if ($(this).hasClass("next")) {
						$(".pager a:eq(" + ((current + 1) - 1) + ")", $w).click();
					}
				}
			});
		}
	});
}
var MicroNavBottom = {
	numberItemsPerPage: 10,
	width: 390,
	divideIntoColumns: function ($element, $listItems) {
		var numberOfItems = $listItems.length;
		if (numberOfItems > this.numberItemsPerPage) {
			var res = $("<div class='microSlider'></div>");
			res.css("width", Math.floor(numberOfItems / this.numberItemsPerPage) * this.width);
			var ol = "";
			var left = 0;
			for (var i = 0; i < numberOfItems; i++) {
				if (i % this.numberItemsPerPage == 0) {
					ol = $("<ol style='left:" + left + "px'></ol>");
				}
				ol.append($listItems[i]);
				if (i % this.numberItemsPerPage == this.numberItemsPerPage - 1 || i == numberOfItems - 1) {
					res.append(ol);
				}
			}
			$element.replaceWith(res);
		}
	},
	addMicroNavigation: function (numberOfElements) {
		var microNav = $("<div id='bottomlist_micronav'></div>");
		for (var j = 1; j <= numberOfElements; j++) {
			if (j == 1) {
				microNav.append("<div class='selected'><a href='#'></a></div>");
			} else {
				microNav.append("<div><a href='#'></a></div>");
			}
		}
		$("#bottomlist").append(microNav);
		$("#bottomlist_micronav a").each(function (i) {
			$(this).bind("click", function (event) {
				event.preventDefault();
				var newLeft = i * (-1) * MicroNavBottom.width;
				$("#bottomlist .microSlider").animate({
					left: newLeft
				});
				var $bottomlistmicronav = $("#bottomlist_micronav div");
				$bottomlistmicronav.removeClass("selected");
				$bottomlistmicronav.eq(i).addClass("selected");
				return false;
			});
		});
	}
};

function setupMicroNavigation(el) {
	var $el = $(el);
	var $listItems = $el.find("li");
	var numberOfElements = Math.ceil($listItems.length / MicroNavBottom.numberItemsPerPage);
	if (numberOfElements > 1) {
		MicroNavBottom.divideIntoColumns($el, $listItems);
		MicroNavBottom.addMicroNavigation(numberOfElements);
	} else {
		$el.removeClass("vnav");
	}
	$("#bottomlist").show();
}
var LiveRefresh = {};
LiveRefresh.url = null;
LiveRefresh.intervalId = null;
LiveRefresh.rate = 0;
LiveRefresh.templateCache = {};
LiveRefresh.forEachIndex = 0;
LiveRefresh.forEachLast = false;
LiveRefresh.forEachOddEven = "";
LiveRefresh.setsRowData = {
	points: "",
	sets: []
};
LiveRefresh.includedEventTypeGroups = ["GOAL", "CARD", "INOUT", "MISSED_PENALTY"];
LiveRefresh.renderTemplate = function (template, data) {
	try {
		if (!LiveRefresh.templateCache[template]) {
			LiveRefresh.templateCache[template] = Handlebars.compile($("#" + template + "-template").html());
		}
		return LiveRefresh.templateCache[template](data);
	} catch (e) {
		console.error("Failed to compile #" + template + "-template: ", e.stack);
		throw e;
	}
};
LiveRefresh.processLiveRefreshData = function (response) {
	if (response.refreshRate) {
		LiveRefresh.setRate(response.refreshRate);
	}
	LiveRefresh.log("Updating live refresh data");
	$.each(response.elems, function (id, data) {
		$('[data-json-id="' + id.replace(/&amp;/g, "&") + '"]').each(function () {
			try {
				LiveRefresh.updateElement($(this), data);
			} catch (e) {
				console.error("Failed to refresh element " + id, e.stack);
			}
		});
	});
};
LiveRefresh.updateElement = function ($elemToUpdate, data) {
	var jsonView = $elemToUpdate.attr("data-json-view");
	if (jsonView) {
		switch (jsonView) {
			case "sbcycling":
				LiveRefresh.updateScoreboardCycling($elemToUpdate, data);
				break;
			case "sbfootball":
			case "sbhandball":
			case "sbgeneric":
			case "sbmatch":
				LiveRefresh.updateLargeRowMatch($elemToUpdate, data);
				break;
			case "flatDuelResult":
				LiveRefresh.updateFlatRowMatch($elemToUpdate, data);
				break;
			case "flatRaceResult":
				LiveRefresh.updateWinner($elemToUpdate, data);
				break;
			case "largeDuelResult":
				LiveRefresh.updateLargeRowMatch($elemToUpdate, data);
				break;
			case "sbbasketball":
			case "sbvolleyball":
			case "sbsets":
			case "sbtennis":
				LiveRefresh.updateScoreboardSets($elemToUpdate, data);
				break;
			case "sets":
				LiveRefresh.updateRowSets($elemToUpdate, data);
				break;
			case "setssmall":
				LiveRefresh.updateRowSetsSmall($elemToUpdate, data);
				break;
			case "matchfiche":
				if (data.match.usesSets) {
					LiveRefresh.updateProgress($elemToUpdate, data.match);
					LiveRefresh.updateScoreboardSets($elemToUpdate, data.match);
					LiveRefresh.updateVisualSetsTimeline($elemToUpdate, data);
					if ("VOLLEYBALL" == data.match.matchType || "BASKETBALL" == data.match.matchType) {
						LiveRefresh.updateScoreboardMatch($elemToUpdate, data.match);
					}
				} else {
					if ("CYCLING" == data.match.matchType) {
						LiveRefresh.updateScoreboardCycling($elemToUpdate, data.match);
						LiveRefresh.calculateGapsWidth();
					} else {
						LiveRefresh.updateProgress($elemToUpdate, data.match);
						LiveRefresh.updateScoreboardMatch($elemToUpdate, data.match);
						LiveRefresh.updateGoalList($elemToUpdate, data.match);
						LiveRefresh.updateLineup($elemToUpdate, data);
						LiveRefresh.updateVisualFootballTimeline($elemToUpdate, data);
					}
				}
				LiveRefresh.updateMatchEventStream($elemToUpdate, data);
				break;
			case "matchgroup":
				LiveRefresh.updateMatchEventStream($elemToUpdate, data);
				break;
			case "telexmetro":
				LiveRefresh.updateEventStream($elemToUpdate, data);
				break;
		}
	} else {
		$.each(data, function (key, value) {
			$elemToUpdate.find('[data-json-subid="' + key + '"]').each(function () {
				try {
					LiveRefresh.updateElement($(this), value);
				} catch (e) {
					console.error("Failed to refresh element " + key, e.stack);
				}
			});
		});
	}
};
LiveRefresh.updateScoreboardCycling = function ($element, data) {
	var elemExt = $element.attr("data-json-ext");
	var correctData = data;
	if (data && data.match) {
		correctData = data.match;
	}
	if (correctData) {
		var dataExt = correctData.isExternal;
		if ((elemExt && dataExt) || (typeof elemExt === "undefined" && typeof dataExt === "undefined")) {
			$element.find(".filler").attr("style", "width:" + correctData.currentOffset + "%");
			var distanceToFinish = correctData.distanceToFinish;
			$element.find(".remaining").empty().html("" + distanceToFinish);
			if (distanceToFinish == 1) {
				$element.find("#distanceUnit1").show();
				$element.find("#distanceUnitMore").hide();
			} else {
				$element.find("#distanceUnit1").hide();
				$element.find("#distanceUnitMore").show();
			}
			$element.find(".gaps").empty().html(LiveRefresh.renderTemplate("cycling-gaps", correctData));
			$element.find(".intermediate").empty().html(LiveRefresh.renderTemplate("cycling-intermediate", correctData));
			if (correctData.matchStatus) {
				var newStatus = correctData.matchStatus.status;
				$element.removeClass("in_play upcoming suspended postponed finished").addClass(newStatus.toLowerCase());
				if (newStatus === "FINISHED") {
					$(".racematchtitle i", $element).remove();
					LiveRefresh.updateEventStreamTitle($element, true);
					$(".matchfiche").removeAttr("data-json-id data-json-ext data-json-view");
					$(".countdown", $element).remove();
					var $parent = $element.hasClass("scoreboardview") ? $element : $element.parents(".roundoverview.detailed, .scoreboardview");
					$parent.removeAttr("data-json-id").removeClass("refreshing");
					LiveRefresh.setupLiveRefresh();
				}
			}
		}
	}
};
LiveRefresh.updateScoreboardMatch = function ($element, data) {
	LiveRefresh.updateWinner($element, data);
	var $homeTeam = $element.find(".scoreboard .host");
	var $awayTeam = $element.find(".scoreboard .visitor");
	if ($homeTeam.length == 0 && $awayTeam.length == 0) {
		return;
	}
	if (data.matchStatus.status == "UPCOMING") {
		$homeTeam.find(".score").empty().html("...");
		$awayTeam.find(".score").empty().html("...");
	} else {
		if (data.scoreBoard != undefined && data.scoreBoard.homeGoals != undefined) {
			$homeTeam.find(".score").empty().html("" + data.scoreBoard.homeGoals);
		}
		$homeTeam.find(".goals").empty().html(LiveRefresh.renderTemplate("match-goals", data.homeTeam));
		if (data.scoreBoard != undefined && data.scoreBoard.awayGoals != undefined) {
			$awayTeam.find(".score").empty().html("" + data.scoreBoard.awayGoals);
		}
		$awayTeam.find(".goals").empty().html(LiveRefresh.renderTemplate("match-goals", data.awayTeam));
	}
};
LiveRefresh.updateFlatRowMatch = function ($element, data) {
	LiveRefresh.updateWinner($element, data);
	var $elemToUpdate = $element.find(".score a");
	if ($elemToUpdate.length == 0) {
		$elemToUpdate = $element.find(".score");
	}
	$elemToUpdate.empty().html(LiveRefresh.renderTemplate("flatduel-score", data));
};
LiveRefresh.updateLargeRowMatch = function ($element, data) {
	LiveRefresh.updateWinner($element, data);
	var $elemToUpdate = $element.find(".score a");
	if ($elemToUpdate.length == 0) {
		$elemToUpdate = $element.find(".score");
	}
	$elemToUpdate.empty().html(LiveRefresh.renderTemplate("largeduel-score", data));
	if (data.homeTeam) {
		$element.find(".host small").empty().html(LiveRefresh.renderTemplate("match-goals", data.homeTeam));
	}
	if (data.awayTeam) {
		$element.find(".visitor small").empty().html(LiveRefresh.renderTemplate("match-goals", data.awayTeam));
	}
};
LiveRefresh.updateWinner = function ($element, data) {
	LiveRefresh.setClass($element.find(".host"), "winner", data.winner == "HOME_TEAM");
	LiveRefresh.setClass($element.find(".visitor"), "winner", data.winner == "AWAY_TEAM");
	var $roundoverview = $element.parents(".roundoverview, .scoreboardview");
	if (data.matchStatus) {
		$element.removeClass("in_play upcoming suspended postponed finished").addClass(data.matchStatus.status.toLowerCase());
		var numberMatches = $roundoverview.find("tr").length;
		var numberFinished = $roundoverview.find(".finished, .upcoming").length;
		var numberInPlay = $roundoverview.find(".in_play").length;
		if (numberMatches > 0 && numberMatches == numberFinished) {
			$roundoverview.removeClass("refreshing").removeAttr("data-json-id data-json-view");
			$(".matchfiche").removeAttr("data-json-id data-json-view");
			LiveRefresh.setupLiveRefresh();
		}
		if (numberInPlay > 0) {
			$roundoverview.addClass("refreshing");
		}
	}
};
LiveRefresh.updateWinnerSets = function ($element, data) {
	var $scoreview = $element.hasClass("scoreboardview") ? $element : $element.parents(".roundoverview, .scoreboardview");
	LiveRefresh.setClass($element.find(".hostrow"), "winner", data.winner == "HOME_TEAM");
	LiveRefresh.setClass($element.find(".visitorrow"), "winner", data.winner == "AWAY_TEAM");
	if (data.matchStatus) {
		$element.removeClass("in_play upcoming suspended postponed finished").addClass(data.matchStatus.status.toLowerCase());
		var numberMatches = (isSetsView($scoreview)) ? $scoreview.find("tr.hostrow").length : $scoreview.find("tr").length;
		var numberFinished = $scoreview.find(".finished, .upcoming").length;
		var numberInPlay = $scoreview.find(".in_play").length;
		if (numberMatches > 0 && numberMatches == numberFinished) {
			$scoreview.removeClass("refreshing").removeAttr("data-json-id data-json-view");
			$(".matchfiche").removeAttr("data-json-id data-json-view");
			LiveRefresh.setupLiveRefresh();
		}
		if (numberInPlay > 0) {
			$scoreview.addClass("refreshing");
		}
	}
};

function isSetsView($roundOverview) {
	if ($roundOverview.hasClass("tennis") || $roundOverview.hasClass("volleyball") || $roundOverview.hasClass("basketball")) {
		return !$roundOverview.find(".scoresheet").length > 0;
	}
	return false;
}
LiveRefresh.updateScoreboardSetRow = function ($element, data, hostOrVisitor, isFinished, isShowPoints, isSmall) {
	var divElemName = "tbody td.names div." + hostOrVisitor + "row";
	var $playerElem = $element.find(divElemName);
	if ($playerElem.length == 0 && !isSmall) {
		return;
	}
	var initiative = !isFinished && data.scoreBoard[hostOrVisitor + "Initiative"] ? "active" : "passive";
	$playerElem.find("span.initiative").removeClass("active").removeClass("passive").addClass(initiative);
	var trElemName = "tbody > tr." + hostOrVisitor + "row";
	var $newRow = $element.find(trElemName + ":first");
	$newRow.find(".updateable").remove();
	var currentSet = data.scoreBoard.currentSet - 1;
	LiveRefresh.setsRowData.showPoints = isShowPoints;
	if ((!isFinished && data.showLivePoints) || (isFinished && data.showFinishedPoints)) {
		LiveRefresh.setsRowData.points = data.scoreBoard[((hostOrVisitor == "host") ? "home" : "away") + "Goals"];
	} else {
		LiveRefresh.setsRowData.points = "EMPTY";
	}
	LiveRefresh.setsRowData.sets = [];
	$(data.scoreBoard.setResults).each(function (index) {
		var tieScore = this[hostOrVisitor + "TieBreak"] || "";
		LiveRefresh.setsRowData.sets.push({
			score: this[hostOrVisitor + "Score"],
			tie: tieScore,
			winner: ((this.winner == hostOrVisitor.toUpperCase()) ? "win" : ""),
			currentset: ((currentSet == index && !isFinished) ? "current" : ""),
			styleClass: ((LiveRefresh.setsRowData.sets.length % 2 == 0) ? "odd" : "even")
		});
	});
	while (LiveRefresh.setsRowData.sets.length < 5) {
		LiveRefresh.setsRowData.sets.push({
			score: "",
			tie: "",
			winner: "",
			currentset: "",
			styleClass: ((LiveRefresh.setsRowData.sets.length % 2 == 0) ? "odd" : "even")
		});
	}
	var template = isSmall ? "match-setSmall" : "match-sets";
	$newRow.append(LiveRefresh.renderTemplate(template, LiveRefresh.setsRowData));
	LiveRefresh.setClass($element.find(trElemName + " .name"), "initiative", data.scoreBoard.initiative == (hostOrVisitor == "host" ? "HOST" : "VISITOR"));
	LiveRefresh.setClass($element.find(trElemName), "winner", data.winner == (hostOrVisitor == "host" ? "HOME_TEAM" : "AWAY_TEAM"));
};
LiveRefresh.updateProgress = function ($element, data) {
	var status = data.progress;
	if (data.matchStatus.status == "FINISHED") {
		if (data.scoreBoard.homeShootoutScore || data.scoreBoard.awayShootoutScore) {
			status = "Strafschoppen " + data.scoreBoard.homeShootoutScore + "-" + data.scoreBoard.awayShootoutScore;
		} else {
			if (data.scoreBoard.homeGoals105 || data.scoreBoard.awayGoals105) {
				status = "Na verlengingen";
			}
		}
	}
	$element.find(".scoreboard dt.progress span").empty().html(status);
};
LiveRefresh.updateScoreboardSets = function ($element, data) {
	$element.removeClass("in_play upcoming suspended postponed finished").addClass(data.matchStatus.status.toLowerCase());
	$livestatus = $element.hasClass("matchfiche") ? $element.find(".scoreboard .livestatus") : $element.find(".livestatus");
	$livestatus.empty().html("" + data.progress);
	$element.find(".scoreboard.sets").removeClass("in_play upcoming suspended postponed finished").addClass(data.matchStatus.status.toLowerCase());
	var $setHeader = $element.find("th.setheader");
	if ($setHeader.length != 0) {
		$setHeader.removeClass("current");
		var currentSetHeader = $setHeader.eq(data.scoreBoard.currentSet - 1);
		if (currentSetHeader) {
			currentSetHeader.addClass("current");
		}
	}
	var isFinished = data.matchStatus.status == "FINISHED";
	LiveRefresh.updateWinnerSets($element, data);
	LiveRefresh.updateScoreboardSetRow($element, data, "host", isFinished, true, false);
	LiveRefresh.updateScoreboardSetRow($element, data, "visitor", isFinished, true, false);
};
LiveRefresh.setClass = function ($element, className, condition) {
	if (condition) {
		$element.addClass(className);
	} else {
		$element.removeClass(className);
	}
};
LiveRefresh.updateRowSets = function ($element, data) {
	LiveRefresh.updateWinner($element, data);
	var $elemToUpdate = $element.find(".score a");
	if ($elemToUpdate.length == 0) {
		$elemToUpdate = $element.find(".score");
	}
	$elemToUpdate.empty();
	$(data.scoreBoard.setResults).each(function (idx, setResult) {
		setResult.isLastSet = data.scoreBoard.currentSet == (idx + 1);
		$elemToUpdate.append(LiveRefresh.renderTemplate("flatset-score", setResult));
	});
};
LiveRefresh.updateRowSetsSmall = function ($element, data) {
	LiveRefresh.updateWinnerSets($element, data);
	var isLive = data.matchStatus.status == "IN_PLAY";
	var liveStatus = !isLive ? "" + data.progress : "LIVE - Set " + data.scoreBoard.currentSet;
	$element.find(".livestatus").empty().html("" + liveStatus);
	$element.removeClass("in_play upcoming suspended postponed finished").addClass(data.matchStatus.status.toLowerCase());
	var isFinished = data.matchStatus.status == "FINISHED";
	LiveRefresh.updateScoreboardSetRow($element, data, "host", isFinished, false, true);
	LiveRefresh.updateScoreboardSetRow($element, data, "visitor", isFinished, false, true);
};
LiveRefresh.updateGoalList = function ($element, data) {
	var $goals = $element.find("table.goals > tbody");
	if ($goals.length == 0) {
		return;
	}
	$goals.empty().html(LiveRefresh.renderTemplate("matchfiche-goal", data));
};
LiveRefresh.updateEventStream = function ($element, data) {
	var newEvents = [];
	if (data.eventStream) {
		$.each(data.eventStream, function (idx, value) {
			var versionSeparatorIndex = value.id.lastIndexOf("-");
			var $lookupEvent;
			if (versionSeparatorIndex > 1) {
				var unversionedId = value.id.substring(0, versionSeparatorIndex + 1);
				$lookupEvent = $('li[data-event-id^="' + unversionedId + '"]', $element);
				if ($lookupEvent.length > 0) {
					$lookupEvent.each(function () {
						if (value.id != $(this).attr("data-event-id")) {
							$(this).replaceWith(LiveRefresh.renderTemplate("matchfiche-eventstream", {
								eventStream: [value]
							}));
						}
					});
				} else {
					newEvents.push(value);
				}
			} else {
				$lookupEvent = $('li[data-event-id^="' + value.id + '"]', $element);
				if ($lookupEvent.length == 0) {
					newEvents.push(value);
				}
			}
		});
	}
	if (newEvents.length > 0) {
		$element.find(".eventstream").each(function () {
			$(this).prepend(LiveRefresh.renderTemplate("matchfiche-eventstream", {
				eventStream: newEvents
			}));
		});
	}
};
LiveRefresh.updateMatchEventStream = function ($element, data) {
	LiveRefresh.updateEventStream($element, data);
	var isFinished;
	if (data.match) {
		if (data.match.matchStatus) {
			isFinished = !(data.match.matchStatus.status == "IN_PLAY" || data.match.matchStatus.status == "SUSPENDED");
			LiveRefresh.updateEventStreamTitle($element, isFinished);
		}
	} else {
		isFinished = true;
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				if (key != "eventStream") {
					if (data[key].matchStatus && (data[key].matchStatus.status == "IN_PLAY" || data[key].matchStatus.status == "SUSPENDED")) {
						isFinished = false;
						break;
					}
				}
			}
		}
		LiveRefresh.updateEventStreamTitle($element, isFinished);
	}
};
LiveRefresh.updateEventStreamTitle = function ($element, isFinished) {
	if ($element) {
		var $liveText = $element.find("span.livetext");
		var $liveIndicator = $element.find("span.liveindicator");
		var $liveIndicatorBar = $element.find("span.liveindicatorbar");
		if (isFinished) {
			$liveText.addClass("norefresh");
			$liveIndicator.addClass("norefresh");
			$liveIndicatorBar.addClass("norefresh");
		} else {
			$liveText.removeClass("norefresh");
			$liveIndicator.removeClass("norefresh");
			$liveIndicatorBar.removeClass("norefresh");
		}
	}
};
LiveRefresh.updateVisualSetsTimeline = function ($element, data) {
	$element.find(".timeline-visual .eventset1").each(function () {
		$(this).replaceWith(LiveRefresh.renderTemplate("matchfiche-visualtimeline-eventset", {
			eventSetName: "eventset1",
			events: null,
			progressFiller: data.thermometerInfo.eventSet1FillerPercentage
		}));
	});
	$element.find(".timeline-visual .eventset2").each(function () {
		$(this).replaceWith(LiveRefresh.renderTemplate("matchfiche-visualtimeline-eventset", {
			eventSetName: "eventset2",
			events: null,
			progressFiller: data.thermometerInfo.eventSet2FillerPercentage
		}));
	});
	$element.find(".timeline-visual .eventset3").each(function () {
		$(this).replaceWith(LiveRefresh.renderTemplate("matchfiche-visualtimeline-eventset", {
			eventSetName: "eventset3",
			events: null,
			progressFiller: data.thermometerInfo.eventSet3FillerPercentage
		}));
	});
	$element.find(".timeline-visual .eventset4").each(function () {
		$(this).replaceWith(LiveRefresh.renderTemplate("matchfiche-visualtimeline-eventset", {
			eventSetName: "eventset4",
			events: null,
			progressFiller: data.thermometerInfo.eventSet4FillerPercentage
		}));
	});
	$element.find(".timeline-visual .eventset5").each(function () {
		$(this).replaceWith(LiveRefresh.renderTemplate("matchfiche-visualtimeline-eventset", {
			eventSetName: "eventset5",
			events: null,
			progressFiller: data.thermometerInfo.eventSet5FillerPercentage
		}));
	});
};
LiveRefresh.updateVisualFootballTimeline = function ($element, data) {
	var $timeline = $element.find(".timeline-visual");
	if ($timeline.length == 0) {
		return;
	}
	var eventSet1H = [];
	var eventSetHT = [];
	var eventSet2H = [];
	var eventSet1E = [];
	var eventSet2E = [];
	if (data.thermometerInfo.extraTime) {
		$timeline.each(function () {
			$(this).addClass("extra-time");
		});
		if ($(".timeline-visual .eventset3").size() == 0) {
			$(".timeline-visual").append('<ol class="eventsetSeparator"></ol><ol class="eventset3"></ol>');
		}
		if ($(".timeline-visual .eventset4").size() == 0) {
			$(".timeline-visual").append('<ol class="eventsetSeparator"></ol><ol class="eventset4"></ol>');
		}
	} else {
		$element.find(".timeline-visual").removeClass("extra-time");
		$(".timeline-visual .eventset3, .timeline-visual .eventset4, .timeline-visual .eventsetSeparator", $element).remove();
	}
	if (data.thermometerEvents) {
		$.each(data.thermometerEvents, function (idx, event) {
			if (LiveRefresh.isSupportedTimelineEventType(event)) {
				var target = null;
				if (event.phase == "FIRST_HALF") {
					target = eventSet1H;
				} else {
					if (event.phase == "HALFTIME") {
						target = eventSetHT;
					} else {
						if (event.phase == "SECOND_HALF") {
							target = eventSet2H;
						} else {
							if (event.phase == "FIRST_EXTRA_TIME") {
								target = eventSet1E;
							} else {
								if (event.phase == "SECOND_EXTRA_TIME") {
									target = eventSet2E;
								}
							}
						}
					}
				}
				if (target != null) {
					target.push(event);
				}
			}
		});
	}
	var filler;
	$element.find(".timeline-visual .eventset1").each(function () {
		filler = data.thermometerInfo.eventSet1FillerPercentage;
		$(this).replaceWith(LiveRefresh.renderTemplate("matchfiche-visualtimeline-eventset", {
			eventSetName: "eventset1",
			events: eventSet1H,
			progressFiller: filler
		}));
	});
	$element.find(".timeline-visual .eventsethalftime").each(function () {
		$(this).replaceWith(LiveRefresh.renderTemplate("matchfiche-visualtimeline-eventset", {
			eventSetName: "eventsethalftime",
			events: eventSetHT,
			progressFiller: "0"
		}));
	});
	$element.find(".timeline-visual .eventset2").each(function () {
		filler = data.thermometerInfo.eventSet2FillerPercentage;
		$(this).replaceWith(LiveRefresh.renderTemplate("matchfiche-visualtimeline-eventset", {
			eventSetName: "eventset2",
			events: eventSet2H,
			progressFiller: filler
		}));
	});
	if (eventSet1E.length > 0) {
		filler = data.thermometerInfo.eventSet3FillerPercentage;
		$element.find(".timeline-visual .eventset3").each(function () {
			$(this).replaceWith(LiveRefresh.renderTemplate("matchfiche-visualtimeline-eventset", {
				eventSetName: "eventset3",
				events: eventSet1E,
				progressFiller: filler
			}));
		});
	}
	if (eventSet2E.length > 0) {
		filler = data.thermometerInfo.eventSet4FillerPercentage;
		$element.find(".timeline-visual .eventset4").each(function () {
			$(this).replaceWith(LiveRefresh.renderTemplate("matchfiche-visualtimeline-eventset", {
				eventSetName: "eventset4",
				events: eventSet2E,
				progressFiller: filler
			}));
		});
	}
};
LiveRefresh.updateLineup = function ($element, data) {
	var $lastTr;
	if ($element.find("table.lineup").length == 0) {
		return;
	}
	for (var playerRowsToAdd = data.lineUpTable.nrOfPlayers - $element.find("table.lineup tr.player").length; playerRowsToAdd > 0; playerRowsToAdd -= 1) {
		$lastTr = $element.find("table.lineup tr.player:last");
		$lastTr.clone().insertAfter($lastTr);
	}
	for (var subRowsToAdd = data.lineUpTable.nrOfSubstitutes - $element.find("table.lineup tr.substitute").length; subRowsToAdd > 0; subRowsToAdd -= 1) {
		$lastTr = $element.find("table.lineup tr.substitute:last");
		$lastTr.clone().insertAfter($lastTr);
	}
	var enableLineUpIds = $element.find("table.lineup").hasClass("withids");
	$element.find("table.lineup tr.player").each(function (index) {
		var styleClass = (index % 2 == 0) ? "even" : "odd";
		$(this).replaceWith(LiveRefresh.renderTemplate("matchfiche-lineup-tablecol", {
			styleClass: "player " + styleClass,
			playerHome: data.lineUpTable.homePlayers[index],
			playerAway: data.lineUpTable.awayPlayers[index],
			enableLineupIds: enableLineUpIds
		}));
	});
	$element.find("table.lineup tr.substitute").each(function (index) {
		var styleClass = (index % 2 == 0) ? "even" : "odd";
		$(this).replaceWith(LiveRefresh.renderTemplate("matchfiche-lineup-tablecol", {
			styleClass: "substitute " + styleClass,
			playerHome: data.lineUpTable.homeSubstitutes[index],
			playerAway: data.lineUpTable.awaySubstitutes[index],
			enableLineupIds: enableLineUpIds
		}));
	});
};
LiveRefresh.isSupportedTimelineEventType = function (event) {
	return LiveRefresh.includedEventTypeGroups.indexOf(event.type.group) != -1;
};
LiveRefresh.callRefresh = function () {
	try {
		if (LiveRefresh.url) {
			LiveRefresh.log("Requesting live refresh data");
			$.ajax({
				type: "GET",
				url: LiveRefresh.url,
				dataType: "json",
				success: LiveRefresh.processLiveRefreshData,
				error: function (xhr, message) {
					LiveRefresh.log("Failed to retrieve live refresh data. Cause: " + message);
				}
			});
		}
	} catch (e) {
		console.error("Failed live refresh data", e.stack);
	}
	LiveRefresh.updateExternalData();
};
LiveRefresh.stop = function () {
	if (LiveRefresh.intervalId) {
		clearInterval(LiveRefresh.intervalId);
	}
};
LiveRefresh.setRate = function (rate) {
	if (rate && rate > 0 && LiveRefresh.rate != rate) {
		LiveRefresh.log("Changing live refresh rate to " + rate + "s");
		LiveRefresh.stop();
		LiveRefresh.rate = rate;
		LiveRefresh.intervalId = setInterval(LiveRefresh.callRefresh, 1000 * LiveRefresh.rate);
	}
};
LiveRefresh.registerHelpers = function () {
	Handlebars.registerHelper("debug", function (optionalValue) {
		console.log("Current Context");
		console.log("====================");
		console.log(this);
		if (optionalValue) {
			console.log("Value");
			console.log("====================");
			console.log(optionalValue);
		}
	});
	Handlebars.registerHelper("foreach", function (context, options) {
		var fn = options.fn,
			inverse = options.inverse;
		var ret = "";
		if (context && context.length > 0) {
			for (var i = 0, j = context.length; i < j; i++) {
				LiveRefresh.forEachIndex = (i + 1);
				LiveRefresh.forEachLast = (i == (j - 1));
				LiveRefresh.forEachOddEven = LiveRefresh.forEachIndex % 2 == 0 ? "even" : "odd";
				ret = ret + fn(context[i]);
			}
		} else {
			ret = inverse(this);
		}
		return ret;
	});
	Handlebars.registerHelper("ifequal", function (val1, val2, options) {
		if (val1 === val2) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
	Handlebars.registerHelper("ifnotequal", function (val1, val2, options) {
		if (val1 != val2) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
	Handlebars.registerHelper("foreach_last", function () {
		return LiveRefresh.forEachLast;
	});
	Handlebars.registerHelper("foreach_index", function () {
		return LiveRefresh.forEachIndex;
	});
	Handlebars.registerHelper("foreach_odd_even", function () {
		return LiveRefresh.forEachOddEven;
	});
	Handlebars.registerHelper("lowercase", function (value) {
		return value.toLowerCase();
	});
	Handlebars.registerHelper("jersey_width", function (value) {
		return Math.floor((value.length + 3) / 3);
	});
	Handlebars.registerHelper("setlist", function (items, options) {
		var buffer = [];
		for (var i = 0, l = items.length; i < l; i++) {
			buffer.push(options.fn(items[i]));
		}
		return buffer.join("");
	});
	Handlebars.registerHelper("eventtype_to_text", function (value) {
		switch (value) {
			case "PENALTY_SCORED":
				return "(pen)";
			case "OWN_GOAL":
				return "(own)";
			default:
				return "";
		}
	});
	Handlebars.registerHelper("ifnotnull", function (val1, val2, options) {
		if (val1 || val2) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
};
LiveRefresh.setupLiveRefresh = function () {
	var $elemsToRefresh = $("[data-json-id]");
	if ($elemsToRefresh.length > 0) {
		var urlArray = window.location.pathname.split("/");
		LiveRefresh.url = window.location.protocol + "//" + window.location.host + "/" + urlArray[1] + "/" + urlArray[2] + "?mode=json";
		$elemsToRefresh.each(function () {
			LiveRefresh.url += "&c=" + encodeURIComponent($(this).attr("data-json-id"));
		});
	} else {
		LiveRefresh.url = null;
	}
};
LiveRefresh.updateExternalData = function () {
	LiveRefresh.log("Update external data");
	var $elemsToRefresh = $("[data-json-ext]");
	var urlsToFetch = [];
	if ($elemsToRefresh.length > 0) {
		$elemsToRefresh.each(function () {
			urlsToFetch.appendIfNotInArray($(this).attr("data-json-ext"));
		});
	}
	if (urlsToFetch.length > 0) {
		LiveRefresh.log("Requesting new external data");
		$(urlsToFetch).each(function () {
			var urlToFetch = this;
			$.ajax({
				type: "GET",
				url: urlToFetch,
				dataType: "json",
				success: function (response) {
					LiveRefresh.log("Updating external live refresh data");
					$('[data-json-ext="' + urlToFetch.replace(/&amp;/g, "&") + '"]').each(function () {
						LiveRefresh.updateElement($(this), response);
					});
				},
				error: function (xhr, message) {
					LiveRefresh.log("Failed to retrieve external live refresh data. Cause: " + message);
				}
			});
		});
	}
};
LiveRefresh.log = function (msg) {
	if (window.location.search.indexOf("debug=true") > 0) {
		console.log(msg);
	}
};
LiveRefresh.showSpinners = function () {
	$("[data-json-id]").each(function () {
		if (!$(this).hasClass("matchfiche")) {
			$(this).addClass("refreshing");
		}
	});
	$("[data-json-ext]").each(function () {
		$(this).addClass("refreshing");
	});
};
LiveRefresh.calculateGapsWidth = function () {
	var totalWidth = 0;
	var $gaps = $(".matchfiche .gaps > ol");
	$gaps.find("> li").each(function () {
		var $gap = $(this);
		totalWidth += $gap.outerWidth() + 15;
		$gap.width($gap.outerWidth());
	});
	$gaps.width(totalWidth + "px");
};
LiveRefresh.init = function () {
	if (window.location.hash == "#nlr") {
		LiveRefresh.log("Disabled live refresh");
	} else {
		LiveRefresh.registerHelpers();
		LiveRefresh.pageChanged();
		if (LiveRefresh.isNotOnHomePage()) {
			LiveRefresh.setRate($("body").attr("data-json-rate"));
		}
	}
};
LiveRefresh.pageChanged = function () {
	LiveRefresh.updateExternalData();
	if (LiveRefresh.isNotOnHomePage()) {
		LiveRefresh.setupLiveRefresh();
		LiveRefresh.showSpinners();
		LiveRefresh.calculateGapsWidth();
	}
};
LiveRefresh.isNotOnHomePage = function () {
	var pathname = window.location.pathname;
	pathname = pathname.replace(/\/*$/, "");
	return pathname.split("/").length > 3;
};
LiveRefresh.onVideoClick = function (event) {
	if ($("embed, object, video", this).size() == 0) {
		var vars = [];
		var $video = $(this).find(".video");
		var videoId = $(this).find("[data-video-id]").attr("data-video-id");
		vars.type = $video.attr("data-video-type");
		vars.view = "streamEmbed";
		vars.divId = "div_" + videoId;
		vars.flashId = "fp_" + videoId;
		vars.format = "large";
		vars.wmode = "transparent";
		vars.title = $video.attr("data-video-title");
		vars.src = $video.attr("data-video-src");
		vars.mzid = $video.attr("data-video-mzid");
		vars.iphoneServer = $video.attr("data-video-iphone-server");
		vars.iphonePath = $video.attr("data-video-iphone-path");
		vars.rtmpServer = $video.attr("data-video-rtmp-server");
		vars.rtmpPath = $video.attr("data-video-rtmp-path");
		vars.thumb = $(this).find("img").attr("src");
		vars.w = String($video.width());
		vars.h = String($video.height());
		vars.copyright = $(this).find(".copyright").html();
		vars.popup = "false";
		vars.referrer = document.referrer;
		vars.statProgram = $video.attr("data-video-sitestat-program");
		vars.statPlaylist = $video.attr("data-video-sitestat-playlist");
		vars.statSite = $video.attr("data-video-sitestat-site");
		vars.statClipType = $video.attr("data-video-sitestat-cliptype");
		vars.statPubDate = $video.attr("data-video-sitestat-pubdate");
		vars.statDuration = $video.attr("data-video-sitestat-duration");
		vars.whatsOnId = $video.attr("data-video-whatsonid");
		vars.geoBlocking = $video.attr("data-video-geoblocking");
		vars.prerollsEnabled = $video.attr("data-video-prerolls-enabled");
		vars.prerollCategory = $video.attr("data-video-preroll-category");
		vars.duration = $video.attr("data-video-duration");
		loadVideo(vars);
	}
	event.preventDefault();
	return false;
};
LiveRefresh.setupVideoClick = function () {
	$(".eventstream .flashPlayer").livequery("click", LiveRefresh.onVideoClick);
};
LiveRefresh.minimizeEventStream = function ($stream) {
	var maxAmount = $stream.attr("data-maxdisplay");
	if (maxAmount != "all") {
		maxAmount = parseInt(maxAmount, 10);
		if ($stream.find("li:not(.line)").length > maxAmount) {
			$stream.find("li:not(.line):gt(" + (maxAmount - 1) + ")").hide();
			$stream.append("<p class='eventstream_showlink'><a href='#'>Toon alle berichten</a></p><div class='gradient_ender'></div>");
			$stream.find(".eventstream_showlink").click(function (event) {
				$stream.find("li:not(.line)").show();
				$stream.find(".eventstream_showlink").add(".gradient_ender").hide();
				event.preventDefault();
				return false;
			});
		}
	}
};
LiveRefresh.minimizeAllEventStreams = function () {
	$("ul.eventstream").each(function () {
		LiveRefresh.minimizeEventStream($(this));
	});
};
LiveRefresh.getParameterByName = function (name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
$(document).ready(function () {
	try {
		LiveRefresh.init();
	} catch (e) {
		console.error("Failed to init live refresh", e.stack);
	}
	try {
		LiveRefresh.setupVideoClick();
	} catch (e) {
		console.error("Failed to init video clicks on live stream", e.stack);
	}
	try {
		LiveRefresh.minimizeAllEventStreams();
	} catch (e) {
		console.error("Failed to minimize event streams", e.stack);
	}
});
var services = {
	widgetConfigs: [],
	hostnames: {
		widgets: "services.vrt.be",
		backend: "services.vrt.be"
	},
	loaderTimeout: 5000,
	addConfig: function (config) {
		this.widgetConfigs.push(config);
	},
	configureRedactieHeader: function () {
		this.addConfig({
			widgets: [{
				id: "vrtBalk",
				type: "vrtbalk_1.0",
				siteName: "deredactie-be",
				site: "www.deredactie.be"
			}]
		});
	},
	configureSporzaHeader: function () {
		this.addConfig({
			widgets: [{
				id: "vrtBalk",
				type: "vrtbalk_1.0",
				siteName: "sporza-be",
				site: "www.sporza.be"
			}]
		});
	},
	configureCobraHeader: function () {
		this.addConfig({
			widgets: [{
				id: "vrtBalk",
				type: "vrtbalk_1.0",
				siteName: "cobra-be",
				site: "www.cobra.be"
			}]
		});
	},
	init: function () {
		console.log("Services: initialize with " + this.widgetConfigs.length + " configs on ", this.hostnames);
		Modernizr.load({
			load: "timeout=" + this.loaderTimeout + "!https://" + this.hostnames.widgets + "/widgets/serviceloader/2.0/widgetLoader.js",
			callback: function () {
				if (typeof WidgetLoader !== "undefined") {
					WidgetLoader.serviceBaseUrl = "https://services.vrt.be";
					WidgetLoader.commonBaseUrl = "https://services.vrt.be";
					WidgetLoader.widgetsBaseUrl = "https://services.vrt.be/widgets";
					WidgetLoader.appsBaseUrl = "https://apps.vrt.be";
					new WidgetLoader(services.widgetConfigs);
				}
			}
		});
	}
};

function widgetsLoaded() {}

function setupExpandableTables() {
	var expId = 0;
	$(".expandable").each(function () {
		$(this).parent().find(".table").each(function () {
			attachAnchor($(this), expId);
			showOnlyFirstTenRows($(this));
			if ($(this).find("table tr").length > 10) {
				$(this).append('<a href="#" class="showMoreLess moreRows">Alles weergeven</a>');
			}
			$(this).find(".showMoreLess").data("expId", expId).click(function (event) {
				event.preventDefault();
				if ($(this).hasClass("moreRows")) {
					$(this).text("- maak kleiner -").removeClass("moreRows").parent().find("table tr").removeClass("hidden");
				} else {
					showOnlyFirstTenRows($(this).text("Alles weergeven").addClass("moreRows").parent());
					var new_position = $("#randomExpandableAnchor-" + $(this).data("expId")).offset();
					var left = 0;
					if (window.pageXOffset) {
						left = window.pageXOffset;
					} else {
						left = document.body.scrollLeft;
					}
					window.scrollTo(left, new_position.top);
					return false;
				}
				return false;
			});
		});
		expId++;
	});
}

function attachAnchor(thiz, expId) {
	thiz.prepend("<a id='randomExpandableAnchor-" + expId + "'></a>");
}

function showOnlyFirstTenRows(thiz) {
	var rows = thiz.find("table tr");
	rows.addClass("hidden");
	for (var i = 0; i < 10; i++) {
		rows.eq(i).removeClass("hidden");
	}
}
setupFacebookClick = function () {
	$(".facebook").livequery("click", function (event) {
		var url = "";
		var innerA = $(this).find("a:first");
		if (innerA.length > 0) {
			url = $(innerA).attr("href");
		} else {
			url = $(this).attr("href");
		}
		if (/s=100/.test(url)) {
			var parts = url.substring(url.indexOf("s=100") + 6).split("&");
			var title, summary, shareurl, image;
			for (var i = 0; i < parts.length; i++) {
				var keyval = parts[i].split("=");
				if (decodeURIComponent(keyval[0]) == "p[title]") {
					title = decodeURIComponent(keyval[1]).replace(/\+/g, " ");
				}
				if (decodeURIComponent(keyval[0]) == "p[summary]") {
					summary = decodeURIComponent(keyval[1]).replace(/\+/g, " ");
				}
				if (decodeURIComponent(keyval[0]) == "p[url]") {
					shareurl = decodeURIComponent(keyval[1]);
				}
				if (decodeURIComponent(keyval[0]) == "p[images][0]") {
					image = decodeURIComponent(keyval[1]);
				}
			}
			if (!image || image == "") {
				if (/deredactie/.test(window.location.hostname)) {
					image = "http://deredactie.be/html/images/nieuws/deredactie-fblogo.jpeg";
				} else {
					if (/sporza/.test(window.location.hostname)) {
						image = "http://sporza.be/html/images/sporza/sporza-fblogo.jpeg";
					}
				}
				if (/cobra/.test(window.location.hostname)) {
					image = "http://cobra.be/html/images/cultuur/cobra-fblogo.jpeg";
				}
			}
			FB.ui({
				method: "feed",
				name: title,
				link: shareurl,
				picture: image,
				description: summary
			}, function (response) {
				console.log(response);
			});
		} else {
			var windowWidth = 626;
			var windowHeight = 436;
			var windowLeft = (screen.width - windowWidth) / 2;
			var windowTop = (screen.height - windowHeight) / 2;
			var windowSize = "width=" + windowWidth + ",height=" + windowHeight + ",left=" + windowLeft + ",top=" + windowTop;
			var newWindow = window.open(url, "socialShare", "toolbar=0,status=0,scrollbars=1,resizable=1," + windowSize);
			if (window.focus) {
				newWindow.focus();
			}
		}
		event.preventDefault();
		return false;
	});
};
$(document).ready(function () {
	try {
		setupFacebookClick();
	} catch (e) {
		console.error("Failed to init facebook elements", e.stack);
	}
});
setupTiles = function (target) {
	function loadPagerContent($tile, $ulContainer, pageNo, animated) {
		animated = (animated != undefined) ? animated : true;
		var $ul = $ulContainer.find('ul[data-page="' + pageNo + '"]');
		if ($("li", $ul).length == 0) {
			$.ajax({
				type: "GET",
				url: $tile.attr("data-href") + "&page=" + pageNo,
				success: function (response) {
					$ul.html($(response).html());
					if (animated) {
						$ulContainer.animate({
							left: -($ulContainer.ulOWidth * pageNo)
						});
					}
				}
			});
		} else {
			if (animated) {
				$ulContainer.animate({
					left: -($ulContainer.ulOWidth * pageNo)
				});
			}
		}
	}

	function selectPage($tile, $ulContainer, pageNo) {
		loadPagerContent($tile, $ulContainer, pageNo);
		$(".pager a:eq(" + pageNo + ")", $tile).addClass("selected").siblings().removeClass("selected");
	}
	$(target).each(function () {
		var $tile = $(this);
		var $ulContainer = $("ul", $tile).parent();
		var $ulViewport = $ulContainer.parent();
		var isExpat = $tile.hasClass("expats");
		var ulContainerHeight = $ulContainer.height();
		$ulViewport.height(ulContainerHeight);
		$ulContainer.css("position", "absolute").find("ul").each(function () {
			var rightOffset = parseInt($("li", this).css("marginRight").replace("px", ""));
			if ($ulContainer.ulWidth == undefined) {
				$ulContainer.ulWidth = $(this).width() + ($("body").hasClass("ie7") ? rightOffset : 0);
			}
			if ($ulContainer.ulOWidth == undefined) {
				$ulContainer.ulOWidth = $(this).outerWidth() + ($("body").hasClass("ie7") ? rightOffset : 0);
			}
			if (!isExpat) {
				$(this).width($ulContainer.ulWidth);
			}
		});
		var $scrollContainerClearFix = $(".scrollcontainer .clearfix", $tile);
		var numberPages = $(".pager a", $tile).each(function (index) {
			if (index > 0) {
				$("<ul></ul>").attr("data-page", index).width($ulContainer.ulWidth).height(ulContainerHeight).insertBefore($scrollContainerClearFix);
			}
		}).bind("click", function (event) {
			var selectedPage = parseInt($(this).attr("data-page"));
			selectPage($tile, $ulContainer, selectedPage);
			if (isExpat && selectedPage < (numberPages - 1)) {
				loadPagerContent($tile, $ulContainer, selectedPage + 1, false);
			}
			event.preventDefault();
			return false;
		}).length;
		$ulContainer.width($ulContainer.ulOWidth * numberPages);
		if (isExpat) {
			loadPagerContent($tile, $ulContainer, 1, false);
		}
		$(".next", $tile).bind("click", function (event) {
			var currentPage = parseInt($(".pager a.selected", $tile).attr("data-page"));
			if (currentPage < (numberPages - 1)) {
				selectPage($tile, $ulContainer, currentPage + 1);
			}
			if (isExpat && currentPage < (numberPages - 2)) {
				loadPagerContent($tile, $ulContainer, currentPage + 2, false);
			}
			event.preventDefault();
			return false;
		});
		$(".prev", $tile).bind("click", function (event) {
			var currentPage = parseInt($(".pager a.selected", $tile).attr("data-page"));
			if (currentPage > 0) {
				selectPage($tile, $ulContainer, currentPage - 1);
			}
			event.preventDefault();
			return false;
		});
	});
};
setupStoryLine = function (target) {
	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	function scrolltoId() {
		var eventToScrollTo = getParameterByName("eid"),
			eventToScrollTo = eventToScrollTo.replace(".", "\\."),
			$article = $("#" + eventToScrollTo);
		if ($article) {
			if (eventToScrollTo !== "") {
				if ($(".more", $article).is(":visible")) {
					doMoreLink($article);
				}
				scrollIntoEId();
			}
		}
	}

	function initMoreLink() {
		var $storylineItem = $(this);
		$(".more", $storylineItem).bind("click", function (event) {
			event.preventDefault();
			doMoreLink($storylineItem, function () {
				$(".email", $storylineItem).focus();
			});
		});
	}

	function doMoreLink($storylineItem, callback) {
		var $more = $(".more", $storylineItem);
		var url = $("a", $more).attr("data-href");
		$.ajax({
			type: "GET",
			url: url,
			dataType: "text",
			success: function (response) {
				$("article", $storylineItem).append(response);
				$more.hide();
				$(".less", $storylineItem).show();
				if (typeof callback === "function") {
					callback();
				}
			}
		});
	}

	function initLessButton() {
		var storylineItem = this;
		var $storylineItem = $(this);
		$(".less", $storylineItem).bind("click", function (event) {
			event.preventDefault();
			doLessButton(storylineItem);
		});
	}

	function doLessButton(storylineItem) {
		$storylineItem = $(storylineItem);
		$(".more", $storylineItem).show();
		$(".less", $storylineItem).hide();
		var margin = 12,
			top = $storylineItem.offset().top - margin;
		if ($(".fakesticky")) {
			top = top - $(".fakesticky").height();
			if ($(".fakesticky").find("ul.nav2").length) {
				top = top - 43;
			}
		}
		if (storylineItem.getBoundingClientRect().top < 0) {
			$("html, body").animate({
				scrollTop: top
			}, 400);
		}
		$(".storyline-articlebody", $storylineItem).slideUp({
			duration: 400,
			complete: function () {
				$(this).remove();
			}
		});
	}

	function initLoadMore($story) {
		var page = 0;
		$story.waypoint(function (direction) {
			if (direction === "down" && $story.find(".storyline_showlink").is(":visible")) {
				var id = $("li.storyline_showlink").prev().attr("id");
				var dataUrl = $story.attr("data-href") + "&lastId=" + id;
				$.ajax({
					type: "GET",
					url: dataUrl,
					dataType: "text",
					success: function (response) {
						$(".storyline_showlink", $story).replaceWith(response);
						if (typeof trackGAEvent === "function") {
							trackGAEvent("StoryLinePaging", "LoadMore", "" + (++page));
						}
						$.waypoints("refresh");
					}
				});
			}
			return false;
		}, {
			offset: function () {
				var offset = ($.waypoints("viewportHeight") - $(this).outerHeight());
				return offset;
			}
		});
	}

	function initButtons($storyline) {
		$(".storyline-item", $storyline).livequery(initMoreLink);
		$(".storyline-item", $storyline).livequery(initLessButton);
	}
	$(target).each(function () {
		var $storyline = $(this);
		initLoadMore($storyline);
		initButtons($storyline);
		scrolltoId();
	});
};
getParameterByName = function (name, url) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url);
	if (results == null) {
		return "";
	} else {
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
};
setupVideoWall = function () {
	var $context = $("#videowall");
	$context.tabs();
	$(".videowall_block", $context).livequery(function () {
		$(this).tabs();
	});
	$(".videowall_button", $context).livequery("click", function (event) {
		var $button = $(this);
		var $contentLink = $button.parents(".videowall_block:first").find("li.ui-tabs-active > a");
		var dataUrl = $contentLink.attr("data-href");
		var $ulContainer = $button.parents(".videowall_videos:first").find("ul");
		var startRow = parseInt($ulContainer.children("li.videolist-item").length / 4);
		dataUrl += "&startRow=" + startRow;
		var numRows = getParameterByName("nrOfRows", dataUrl);
		$.ajax({
			type: "GET",
			url: dataUrl,
			success: function (response) {
				var fetchedItems = $(response).children("li.videolist-item").length;
				if (fetchedItems > 0) {
					$("li.videolist-item", response).appendTo($ulContainer);
				}
				if (fetchedItems < numRows * 4) {
					$button.hide();
				}
			}
		});
		event.preventDefault();
		return false;
	});
};
var MM_Carrousel = {
	mediaMasterData: [],
	activeCarouselKeyboard: 0,
	hasCSS3Transitions: Modernizr.csstransitions,
	audioWindow: null,
	videoVars: [],
	setUpMediaMasterData: function ($instance, index, layoutType) {
		var numberOfChildren = $instance.find(".media_navigation_thumbnailholder ul li").length;
		if (numberOfChildren > 0) {
			$instance.addClass("scripted");
		}
		var dataObject;
		if (layoutType == "navtop") {
			dataObject = {
				id: "mediamaster_" + index,
				type: layoutType,
				size: "large",
				leftPosThumbnailHolder: 0,
				masterMediaWidth: parseInt($instance.width()),
				thumbnailHolderWidth: parseInt($instance.find(".media_navigation_thumbnailholder").width()) + 10,
				thumbnailHolderUlWidth: numberOfChildren * 160,
				leftTreshold: 0,
				numberMediaElements: numberOfChildren,
				shownPictureIndex: 0,
				startupTimeout: null,
				removeStartupTimeout: null,
				removeSmallDurationTimeout: null,
				mouseX: 0,
				mouseY: 0,
				dataArray: []
			};
			$instance.attr("id", dataObject.id);
			if ($instance.parents(".col").hasClass("span-14")) {
				dataObject.size = "medium14";
			} else {
				if ($instance.parents(".col").hasClass("span-12")) {
					dataObject.size = "medium";
				} else {
					if ($instance.parents(".col").hasClass("span-10")) {
						dataObject.size = "small";
					}
				}
			}
			dataObject.leftTreshold = parseInt(dataObject.thumbnailHolderWidth - dataObject.thumbnailHolderUlWidth - 20);
		} else {
			var rowsPerPage = parseInt($instance.attr("data-navrows"));
			dataObject = {
				id: "mediamaster_" + index,
				type: layoutType,
				size: "large",
				leftPosThumbnailHolder: 0,
				masterMediaWidth: parseInt($instance.width()),
				thumbnailHolderWidth: parseInt($instance.find(".media_navigation_thumbnailholder").width()) + 10,
				thumbnailHolderUlWidth: numberOfChildren * 160,
				leftTreshold: 0,
				numberMediaElements: numberOfChildren,
				shownPictureIndex: 0,
				shownNavigationPanel: 0,
				thumbnailHolderSize: 193,
				thumbnailHolderPageSize: 581,
				numberMediaElementsPerPage: 3 * rowsPerPage,
				numberRowsPerPage: rowsPerPage,
				numberMediaElementsPerRow: 3,
				dataArray: []
			};
			$instance.attr("id", dataObject.id);
			if ($instance.parents(".col").hasClass("span-14")) {
				dataObject.numberMediaElementsPerPage = 2 * rowsPerPage;
				dataObject.numberMediaElementsPerRow = 2;
				dataObject.thumbnailHolderPageSize = 433;
				dataObject.thumbnailHolderSize = 218;
				dataObject.size = "medium14";
			} else {
				if ($instance.parents(".col").hasClass("span-12")) {
					dataObject.numberMediaElementsPerPage = 2 * rowsPerPage;
					dataObject.numberMediaElementsPerRow = 2;
					dataObject.thumbnailHolderPageSize = 381;
					dataObject.thumbnailHolderSize = 190;
					dataObject.size = "medium";
				} else {
					if ($instance.parents(".col").hasClass("span-10")) {
						dataObject.numberMediaElementsPerPage = rowsPerPage;
						dataObject.numberMediaElementsPerRow = 1;
						dataObject.thumbnailHolderPageSize = 301;
						dataObject.thumbnailHolderSize = 381;
						dataObject.size = "small";
					}
				}
			}
			dataObject.leftTreshold = (Math.ceil((numberOfChildren / dataObject.numberMediaElementsPerPage)) - 1) * (-1 * (dataObject.thumbnailHolderPageSize + 8));
		}
		this.mediaMasterData.push(dataObject);
	},
	setupKeyboardNavigation: function () {
		var that = this;
		$(document).keydown(function (e) {
			if (e.keyCode == 37) {
				if (that.mediaMasterData[that.activeCarouselKeyboard].shownPictureIndex > 0) {
					that.showLargeMediaElement($(".mediamaster").eq(that.activeCarouselKeyboard), that.activeCarouselKeyboard, that.mediaMasterData[that.activeCarouselKeyboard].shownPictureIndex - 1, false);
				}
			}
			if (e.keyCode == 39) {
				if (that.mediaMasterData[that.activeCarouselKeyboard].shownPictureIndex < (that.mediaMasterData[that.activeCarouselKeyboard].numberMediaElements - 1)) {
					that.showLargeMediaElement($(".mediamaster").eq(that.activeCarouselKeyboard), that.activeCarouselKeyboard, that.mediaMasterData[that.activeCarouselKeyboard].shownPictureIndex + 1, false);
				}
			}
		});
	},
	setupHoverEffect: function ($instance, index) {
		var that = this;
		$instance.find(".media_navigation").hover(function () {
			that.showTopNavigation($instance, index, true);
		}, function () {
			that.showTopNavigation($instance, index, false);
		});
		$instance.find(".media_shownav").bind("mouseenter", function () {
			that.showTopNavigation($instance, index, true);
		});
		$instance.bind("mouseleave", function () {
			that.showTopNavigation($instance, index, false);
			that.clearTimeouts(index);
		});
	},
	showTopNavigation: function ($instance, index, showTopNav) {
		if (this.hasCSS3Transitions && showTopNav) {
			$instance.addClass("showNavigation");
		} else {
			if (this.hasCSS3Transitions && !showTopNav) {
				$instance.removeClass("showNavigation");
			} else {
				if (!this.hasCSS3Transitions && showTopNav) {
					$instance.find(".media_shownav").animate({
						top: "-30px"
					}, {
						duration: 200,
						complete: function () {
							$(this).siblings(".large_media_holder").animate({
								top: "0px"
							}, {
								duration: 300
							});
							$instance.addClass("showNavigation");
						}
					});
				} else {
					if (!this.hasCSS3Transitions && !showTopNav) {
						$instance.find(".large_media_holder").animate({
							top: "-109px"
						}, {
							duration: 200,
							complete: function () {
								$instance.removeClass("showNavigation");
								$(this).siblings(".media_shownav").animate({
									top: "0px"
								}, {
									duration: 300
								});
							}
						});
					}
				}
			}
		}
	},
	setupLargeMediaElements: function ($instance, index) {
		var that = this;
		$instance.find(".large_media_holder ul.large_media li:first-child").addClass("shown_media").css({
			left: 0
		});
		$instance.find(".large_media_holder  ul.large_media li:gt(0)").addClass("right_media").css({
			left: that.mediaMasterData[index].masterMediaWidth
		});
		that.setupVideos($instance);
	},
	setupVideos: function ($instance) {
		var that = this;
		var j = 0;
		$instance.find(".media_navigation .media_navigation_thumbnailholder li").each(function (i) {
			if (that.isVideoOrAudio($instance, i)) {
				$(this).attr("data-videoaudio-nr", j);
				j++;
			}
		});
	},
	unloadAudio: function () {
		if (this.audioWindow != null) {
			this.audioWindow.close();
		}
	},
	unloadVideo: function ($instance) {
		var $videoPlayingElem = $instance.find(".videoPlaying");
		if ($videoPlayingElem.length > 0) {
			unloadVideo();
			$videoPlayingElem.removeClass("videoPlaying");
			$(".media_holder .copyright", $instance).show();
		}
	},
	clearVideo: function (player) {
		if ($(player).parents(".mediamaster").length > 0) {
			$instance = $(".mediamaster");
			var $videoPlayingElem = $instance.find(".videoPlaying");
			if ($videoPlayingElem.length > 0) {
				$videoPlayingElem.removeClass("videoPlaying");
				$(".media_holder .copyright", $instance).show();
			}
		}
	},
	playVideo: function ($instance, li, index, nrOfVideo, i, data) {
		this.unloadVideo($instance);
		this.unloadAudio();
		this.initVideoVars();
		this.videoVars.divId = "div_" + index + "_" + nrOfVideo;
		this.videoVars.flashId = "flash_" + index + "_" + nrOfVideo;
		this.videoVars.title = data.title;
		this.videoVars.thumb = data.imageData.imageURL;
		this.videoVars.duration = data.duration;
		if (this.mediaMasterData[index].size == "large") {
			this.videoVars.w = "670";
			this.videoVars.h = "377";
		} else {
			if (this.mediaMasterData[index].size == "medium14") {
				this.videoVars.w = "540";
				this.videoVars.h = "303";
			} else {
				if (this.mediaMasterData[index].size == "medium") {
					this.videoVars.w = "470";
					this.videoVars.h = "264";
				} else {
					if (this.mediaMasterData[index].size == "small") {
						this.videoVars.w = "390";
						this.videoVars.h = "219";
					}
				}
			}
		}
		if (data.videoType == "YOUTUBE") {
			this.videoVars.type = "YouTubeVideo";
			this.videoVars.src = data.videoURL;
		} else {
			if (data.videoType == "LIVESTREAM") {
				this.videoVars.type = "LiveStream";
			} else {
				if (data.videoType == "MZ_VOD") {
					this.videoVars.type = "MediazoneVideo";
					this.videoVars.src = data.videoURL;
					this.videoVars.mzid = data.mediazoneId;
				}
			}
		}
		if (data.iphoneURL) {
			this.videoVars.iphoneServer = data.iphoneURL.server;
			this.videoVars.iphonePath = data.iphoneURL.path;
		}
		if (data.rtmpURL) {
			this.videoVars.rtmpServer = data.rtmpURL.server;
			this.videoVars.rtmpPath = data.rtmpURL.path;
		}
		this.videoVars.statProgram = data.sitestatMediaModel.program;
		this.videoVars.statPlaylist = data.sitestatMediaModel.playlist;
		this.videoVars.statSite = data.sitestatMediaModel.site;
		this.videoVars.statPubDate = data.sitestatMediaModel.publicationDate;
		this.videoVars.statClipType = data.sitestatMediaModel.clipType;
		this.videoVars.statDuration = data.sitestatMediaModel.duration;
		this.videoVars.whatsOnId = data.whatsonId;
		this.videoVars.geoBlocking = data.geoBlocking;
		this.videoVars.prerollsEnabled = data.videoPreRollsEnabled;
		this.videoVars.prerollCategory = data.videoPreRollCategory;
		$instance.find(".large_media li:eq(" + i + ")").addClass("videoPlaying");
		$(".media_holder .copyright", $instance).hide();
		if (this.mediaMasterData[index].type == "navtop") {
			this.showTopNavigation($instance, index, false);
			$instance.find(".play_button_holder li:eq(" + nrOfVideo + ")").animate({
				left: "0px"
			}, {
				duration: 1500
			});
		}
		loadVideo(this.videoVars);
	},
	setUpNavigation: function ($instance, index) {
		this.attachPrevAndNextEventsThumbnailHolder($instance, index);
		if (this.mediaMasterData[index].type == "navtop") {
			$instance.find(".media_navigation_thumbnailholder ul").css("width", (this.mediaMasterData[index].numberMediaElements * 160) + "px");
		} else {
			var numberNavPages = Math.ceil(this.mediaMasterData[index].numberMediaElements / this.mediaMasterData[index].numberMediaElementsPerPage);
			var newUl = "";
			var newTree = $("<ul></ul>").css("width", (numberNavPages * ($instance.width() - 81)) + "px");
			var tempLi = "";
			var origUl = $instance.find(".media_navigation_thumbnailholder ul li");
			for (var i = 0; i < this.mediaMasterData[index].numberMediaElements; i++) {
				if (i % this.mediaMasterData[index].numberMediaElementsPerPage == 0) {
					newUl = $("<ul></ul>");
				}
				tempLi = origUl.eq(i);
				newUl.append(tempLi);
				if (i % this.mediaMasterData[index].numberMediaElementsPerPage == this.mediaMasterData[index].numberMediaElementsPerPage - 1 || i == this.mediaMasterData[index].numberMediaElements - 1) {
					newTree.append(newUl);
				}
			}
			$instance.find(".media_navigation_thumbnailholder ul").eq(0).replaceWith(newTree);
			$instance.find(".media_navigation_thumbnailholder ul ul").wrap("<li class='media_nav_pager'></li>");
			this.setupHoverEffectNavBottom($instance);
		}
		this.attachThumbClickEvents($instance, index);
		this.setupMicroNavBottom($instance, index);
	},
	setupHoverEffectNavBottom: function ($instance) {
		$instance.find(".media_navigation_thumbnailholder > ul").prepend("<div class='select_border'></div>");
	},
	setupMicroNavBottom: function ($instance, index) {
		var formattedNumberOfChildren = this.mediaMasterData[index].numberMediaElements;
		if (formattedNumberOfChildren < 10) {
			formattedNumberOfChildren = "0" + formattedNumberOfChildren;
		}
		$instance.find(".media_info_micronav .media_info_number span.media_info_totaal").html(formattedNumberOfChildren);
		var $navItem = $instance.find(".media_navigation .media_navigation_thumbnailholder li:not(.media_nav_pager):eq(0) img");
		this.setDescription($instance, index, $navItem.attr("title"));
		this.attachPrevAndNextEventsBottom($instance, index);
		$(".media_info .media_info_micronav p.media_info_number").fadeIn();
	},
	setDescription: function ($instance, index, text) {
		if (!text) {
			text = "";
		}
		$instance.find(".media_info .description").html(text);
		this.recalculatePlaybuttonPosition($instance, index);
	},
	recalculatePlaybuttonPosition: function ($instance, index) {
		var textHeight = $instance.find(".media_info .description").height();
		if (this.mediaMasterData[index].type == "navtop") {
			$instance.find(".play_button_holder").css("bottom", 19 + textHeight);
		}
	},
	attachPrevAndNextEventsThumbnailHolder: function ($instance, index) {
		$instance.find(".media_navigation_scrollers li.media_prev").addClass("not-active");
		var canScroll = true;
		if (this.mediaMasterData[index].type == "navtop" && this.mediaMasterData[index].thumbnailHolderUlWidth <= this.mediaMasterData[index].thumbnailHolderWidth) {
			$instance.find(".media_navigation_scrollers li.media_next").addClass("not-active");
			canScroll = false;
			$instance.find(".media_navigation_scrollers li").click(function (e) {
				e.preventDefault();
				return false;
			});
		}
		if (this.mediaMasterData[index].type == "navbottom" && this.mediaMasterData[index].numberMediaElements <= this.mediaMasterData[index].numberMediaElementsPerPage) {
			$instance.find(".media_navigation_scrollers li.media_next").addClass("not-active");
			canScroll = false;
			$instance.find(".media_navigation_scrollers li").click(function (e) {
				e.preventDefault();
				return false;
			});
		}
		if (canScroll) {
			var that = this;
			$instance.find(".media_navigation_scrollers li").click(function (event) {
				event.preventDefault();
				if (!$(this).hasClass("not-active")) {
					if ($(this).hasClass("media_prev")) {
						that.moveThumbnailHolder($instance, index, "right");
					} else {
						that.moveThumbnailHolder($instance, index, "left");
					}
				}
				return false;
			});
		}
	},
	attachPrevAndNextEventsBottom: function ($instance, index) {
		if (this.mediaMasterData[index].shownPictureIndex <= 0) {
			$instance.find(".media_info .media_info_micronav ul li.media_vorige").addClass("not-active");
		}
		if (this.mediaMasterData[index].shownPictureIndex > this.mediaMasterData[index].numberMediaElements) {
			$instance.find(".media_info .media_info_micronav ul li.media_volgende").addClass("not-active");
		}
		var that = this;
		$instance.find(".media_info .media_info_micronav ul li.media_vorige").unbind().click(function () {
			if (!$(this).hasClass("not-active")) {
				that.showLargeMediaElement($instance, index, that.mediaMasterData[index].shownPictureIndex - 1, false);
			}
		});
		$instance.find(".media_info .media_info_micronav ul li.media_volgende").unbind().click(function () {
			if (!$(this).hasClass("not-active")) {
				that.showLargeMediaElement($instance, index, that.mediaMasterData[index].shownPictureIndex + 1, false);
			}
		});
	},
	moveThumbnailHolder: function ($instance, index, dir) {
		var isNavTop = (this.mediaMasterData[index].type == "navtop");
		var isNavBottom = !isNavTop;
		var left = this.mediaMasterData[index].leftPosThumbnailHolder;
		if (isNavTop && left == 0) {
			left = left - 3;
		}
		var newLeft;
		if (isNavTop && dir == "left") {
			newLeft = left - 160;
			if (newLeft - 160 >= this.mediaMasterData[index].leftTreshold) {
				this.doThumbnailholderMove($instance, newLeft, index);
				$instance.find(".media_navigation_scrollers li").removeClass("not-active");
			} else {
				this.doThumbnailholderMove($instance, this.mediaMasterData[index].leftTreshold, index);
				$instance.find(".media_navigation_scrollers li.media_next").addClass("not-active");
			}
		} else {
			if (isNavTop && dir == "right") {
				newLeft = left + 160;
				if (newLeft <= -160) {
					this.doThumbnailholderMove($instance, newLeft, index);
					$instance.find(".media_navigation_scrollers li").removeClass("not-active");
				} else {
					this.doThumbnailholderMove($instance, 0, index);
					$instance.find(".media_navigation_scrollers li.media_prev").addClass("not-active");
				}
			} else {
				if (isNavBottom && dir == "left") {
					newLeft = left - this.mediaMasterData[index].thumbnailHolderPageSize - 8;
					this.mediaMasterData[index].shownNavigationPanel++;
					if (newLeft <= this.mediaMasterData[index].leftTreshold) {
						this.doThumbnailholderMove($instance, this.mediaMasterData[index].leftTreshold, index);
						$instance.find(".media_navigation_scrollers li").removeClass("not-active");
						$instance.find(".media_navigation_scrollers li.media_next").addClass("not-active");
					} else {
						this.doThumbnailholderMove($instance, newLeft, index);
						$instance.find(".media_navigation_scrollers li").removeClass("not-active");
					}
				} else {
					if (isNavBottom && dir == "right") {
						newLeft = left + this.mediaMasterData[index].thumbnailHolderPageSize + 8;
						this.mediaMasterData[index].shownNavigationPanel--;
						this.doThumbnailholderMove($instance, newLeft, index);
						$instance.find(".media_navigation_scrollers li").removeClass("not-active");
						if (newLeft >= 0) {
							this.doThumbnailholderMove($instance, 0, index);
							$instance.find(".media_navigation_scrollers li.media_prev").addClass("not-active");
						}
					}
				}
			}
		}
	},
	doThumbnailholderMove: function ($instance, newLeft, index) {
		if (this.hasCSS3Transitions) {
			$instance.find(".media_navigation_thumbnailholder > ul").css("left", newLeft);
		} else {
			$instance.find(".media_navigation_thumbnailholder > ul").eq(0).animate({
				left: newLeft
			}, {
				duration: 500
			});
		}
		this.mediaMasterData[index].leftPosThumbnailHolder = newLeft;
	},
	attachThumbClickEvents: function ($instance, index) {
		var that = this;
		if (that.mediaMasterData[index].type == "navtop") {
			$instance.find(".media_navigation_thumbnailholder li").each(function (i) {
				if (i == 0) {
					$(this).addClass("selected");
				}
				$(this).hover(function () {
					$(this).addClass("hovering");
				}, function () {
					$(this).removeClass("hovering");
				}).find("a").click(function (event) {
					event.preventDefault();
					that.showLargeMediaElement($instance, index, i, true, false);
					return false;
				});
			});
			if (that.hasCSS3Transitions) {
				$instance.find(".media_navigation_thumbnailholder").mousemove(function (e) {
					var $thumbnailHolder = $("#mediamaster_" + index + " .media_navigation_thumbnailholder");
					that.mediaMasterData[index].mouseX = e.pageX - $thumbnailHolder.offset().left;
					that.mediaMasterData[index].mouseY = e.pageY - $thumbnailHolder.offset().top;
				});
			}
		} else {
			$instance.find(".media_navigation_thumbnailholder ul ul li a").each(function (i) {
				$(this).click(function (event) {
					event.preventDefault();
					that.showLargeMediaElement($instance, index, i, false, true);
					return false;
				});
			});
		}
	},
	animationCallback: function ($instance, index, i, startPlayingVideo, li, nrOfVideo, data) {
		this.unloadVideo($instance);
		var $navItem = $instance.find(".media_navigation .media_navigation_thumbnailholder li:not(.media_nav_pager):eq(" + i + ") img");
		this.setDescription($instance, index, $navItem.attr("title"));
		if ((startPlayingVideo) && this.mediaMasterData[index].type == "navbottom") {
			if (li.hasClass("video")) {
				if (!$instance.find(".large_media_holder .large-media li:eq(" + i + ")").hasClass("videoPlaying")) {
					this.playVideo($instance, li, index, nrOfVideo, i, data);
				}
			} else {
				if (li.hasClass("audio")) {
					this.playAudio(data.contentId);
				}
			}
		}
	},
	showLargeMediaElement: function ($instance, index, i, hovering, startPlayingVideo) {
		var that = this;
		if ($instance.find(".large_media_holder .large_media li:eq(" + i + ") span").length > 0 && that.mediaMasterData[index].dataArray.length > 0) {
			if (that.mediaMasterData[index].shownPictureIndex != i) {
				var k = 0;
				var l = that.mediaMasterData[index].dataArray.length;
				var data = "";
				while (k < l) {
					if (that.mediaMasterData[index].dataArray[k].id == ("data_" + i)) {
						data = that.mediaMasterData[index].dataArray[k].dataObject;
						that.animateLargeMediaElement($instance, index, i, hovering, startPlayingVideo, data);
						k = l;
					}
					k = k + 1;
				}
			}
		} else {
			var ajaxURL = $instance.find(".media_navigation .media_navigation_thumbnailholder li:not(.media_nav_pager):eq(" + i + ") a").attr("data-ajax-url");
			if (ajaxURL) {
				$.ajax({
					url: ajaxURL,
					dataType: "json",
					success: function (data) {
						that.mediaMasterData[index].dataArray.push({
							id: "data_" + i,
							dataObject: data
						});
						var dataType = data.type;
						var dataSource = data.source == undefined ? "" : data.source;
						var html = "";
						if (dataType == "PHOTO") {
							html = "<span class='media_holder'><img src='" + data.url + "' alt='" + data.description + "'><span class='copyright'>" + dataSource + "</span></span>";
						} else {
							if (dataType == "VIDEO") {
								html = "<span class='media_holder'><img src='" + data.imageData.imageURL + "' alt='" + data.title + "'><span class='copyright'>" + dataSource + "</span><div class='video_holder'><div class='video_holder_wrapper'></div></div><span class='videotype " + data.videoType.toLowerCase() + "'>" + data.videoType + "</span></span>";
							} else {
								if (dataType == "AUDIO") {
									var imageTag = "";
									if (data.imageData) {
										imageTag = "<img src='" + data.imageData.imageURL + "' alt='" + data.title + "'>";
									} else {
										imageTag = "<p>" + data.title + "</p>";
									}
									html = "<span class='media_holder'>" + imageTag + "<span class='copyright'>" + dataSource + "</span></span>";
								}
							}
						}
						if ((dataType == "AUDIO" || dataType == "VIDEO") && that.mediaMasterData[index].type == "navbottom") {
							html += "<span class='play_button'><i></i></span>";
						}
						$instance.find(".large_media_holder .large_media li:eq(" + i + ")").html(html);
						if (dataType == "AUDIO" || dataType == "VIDEO") {
							that.attachVideoAudioPlayButtonClick($instance, index, i, data);
						}
						that.animateLargeMediaElement($instance, index, i, hovering, startPlayingVideo, data);
					}
				});
			}
		}
	},
	isVideoOrAudio: function ($instance, i) {
		return ($instance.find(".media_navigation .media_navigation_thumbnailholder li:not(.media_nav_pager)").eq(i).hasClass("videoitem") || $instance.find(".media_navigation .media_navigation_thumbnailholder li:not(.media_nav_pager)").eq(i).hasClass("audioitem"));
	},
	animateLargeMediaElement: function ($instance, index, i, hovering, startPlayingVideo, data) {
		var nrOfVideo = -1;
		var closestVideoNrLeft = -1;
		var closestVideoNrRight = -1;
		var that = this;
		var shownPictureIndex = that.mediaMasterData[index].shownPictureIndex;
		var nrElements = that.mediaMasterData[index].numberMediaElements;
		if (that.isVideoOrAudio($instance, i)) {
			nrOfVideo = parseInt($instance.find(".media_navigation .media_navigation_thumbnailholder li:not(.media_nav_pager)").eq(i).attr("data-videoaudio-nr"));
		}
		for (var counterLeft = i - 1; counterLeft >= 0; counterLeft--) {
			if (that.isVideoOrAudio($instance, counterLeft)) {
				closestVideoNrLeft = parseInt($instance.find(".media_navigation .media_navigation_thumbnailholder li:eq(" + counterLeft + ")").attr("data-videoaudio-nr"));
				break;
			}
		}
		for (var counterRight = i + 1; counterRight < nrElements; counterRight++) {
			if (that.isVideoOrAudio($instance, counterRight)) {
				closestVideoNrRight = parseInt($instance.find(".media_navigation .media_navigation_thumbnailholder li:eq(" + counterRight + ")").attr("data-videoaudio-nr"));
				break;
			}
		}
		if (i < shownPictureIndex) {
			if (nrOfVideo >= 0) {
				$instance.find(".play_button_holder li").eq(nrOfVideo).animate({
					left: "33.33333333333%"
				}, {
					duration: 600,
					complete: function () {
						$(this).css({
							"z-index": 4
						});
					}
				});
			}
			$instance.find(".large_media_holder .large_media li").eq(i).animate({
				left: "0px"
			}, {
				duration: 600,
				complete: function () {
					$instance.find(".large_media_holder .large_media li:gt(" + i + ")").css({
						left: (that.mediaMasterData[index].masterMediaWidth) + "px",
						"z-index": 6
					});
					$instance.find(".large_media_holder .large_media li:eq(" + i + ")").css({
						"z-index": 3
					});
					that.animationCallback($instance, index, i, startPlayingVideo, $instance.find(".large_media_holder .large_media li:eq(" + i + ")"), nrOfVideo, data);
					if (closestVideoNrLeft >= 0) {
						$instance.find(".play_button_holder li:lt(" + (closestVideoNrLeft + 1) + ")").css({
							left: 0,
							"z-index": 6
						});
					}
					if (closestVideoNrRight >= 0) {
						$instance.find(".play_button_holder li:gt(" + (closestVideoNrRight - 1) + ")").css({
							left: "66.6666666666%",
							"z-index": 6
						});
					}
				}
			});
			that.mediaMasterData[index].shownPictureIndex = i;
		} else {
			if (i > shownPictureIndex) {
				if (nrOfVideo >= 0) {
					$instance.find(".play_button_holder li").eq(nrOfVideo).animate({
						left: "33.33333333333333%"
					}, {
						duration: 600,
						complete: function () {
							$(this).css({
								"z-index": 4
							});
						}
					});
				}
				$instance.find(".large_media_holder .large_media li").eq(i).animate({
					left: "0px"
				}, {
					duration: 600,
					complete: function () {
						$instance.find(".large_media_holder .large_media li:lt(" + i + ")").css({
							left: (-1 * that.mediaMasterData[index].masterMediaWidth) + "px",
							"z-index": 6
						});
						$instance.find(".large_media_holder .large_media li:eq(" + i + ")").css({
							"z-index": 3
						});
						that.animationCallback($instance, index, i, startPlayingVideo, $instance.find(".large_media_holder .large_media li:eq(" + i + ")"), nrOfVideo, data);
						if (closestVideoNrLeft >= 0) {
							$instance.find(".play_button_holder li:lt(" + (closestVideoNrLeft + 1) + ")").css({
								left: 0,
								"z-index": 6
							});
						}
						if (closestVideoNrRight >= 0) {
							$instance.find(".play_button_holder li:gt(" + (closestVideoNrRight - 1) + ")").css({
								left: "66.6666666666%",
								"z-index": 6
							});
						}
					}
				});
				that.mediaMasterData[index].shownPictureIndex = i;
			} else {
				that.animationCallback($instance, index, i, startPlayingVideo, $instance.find(".large_media_holder .large_media li:eq(" + i + ")"), nrOfVideo, data);
			}
		}
		if (that.mediaMasterData[index].type == "navtop") {
			that.centerThumbnail($instance, index, i, hovering);
		} else {
			that.setSelectedThumbnail($instance, index, i);
		}
		that.updateMicroNavBottom($instance, index, i);
	},
	setSelectedThumbnail: function ($instance, index, i) {
		$instance.find(".media_navigation_thumbnailholder .select_border").css({
			top: (Math.floor((i % this.mediaMasterData[index].numberMediaElementsPerPage / this.mediaMasterData[index].numberMediaElementsPerRow)) * 56) + 8,
			left: ((i % this.mediaMasterData[index].numberMediaElementsPerRow) * this.mediaMasterData[index].thumbnailHolderSize) + 9 + (Math.floor(i / this.mediaMasterData[index].numberMediaElementsPerPage) * this.mediaMasterData[index].thumbnailHolderPageSize) + (Math.floor(i / this.mediaMasterData[index].numberMediaElementsPerPage) * 8)
		});
		if (Math.floor(i / this.mediaMasterData[index].numberMediaElementsPerPage) < this.mediaMasterData[index].shownNavigationPanel) {
			this.moveThumbnailHolder($instance, index, "right");
		} else {
			if (Math.floor(i / this.mediaMasterData[index].numberMediaElementsPerPage) > this.mediaMasterData[index].shownNavigationPanel) {
				this.moveThumbnailHolder($instance, index, "left");
			}
		}
	},
	updateMicroNavBottom: function ($instance, index, i) {
		var shownPictureIndex = i + 1;
		var formattedPictureIndex = (shownPictureIndex < 10 ? "0" : "") + shownPictureIndex;
		$instance.find(".media_info_micronav .media_info_number span.media_info_nr").html(formattedPictureIndex);
		$instance.find(".media_info .media_info_micronav ul li").removeClass("not-active");
		if (this.mediaMasterData[index].shownPictureIndex <= 0) {
			$instance.find(".media_info .media_info_micronav ul li.media_vorige").addClass("not-active");
		}
		if (this.mediaMasterData[index].shownPictureIndex + 1 >= this.mediaMasterData[index].numberMediaElements) {
			$instance.find(".media_info .media_info_micronav ul li.media_volgende").addClass("not-active");
		}
	},
	centerThumbnail: function ($instance, index, i, hovering) {
		var middle = (this.mediaMasterData[index].thumbnailHolderWidth / 2);
		var offset = (i * 160) + 85;
		var newPos = middle - offset;
		$instance.find(".media_navigation_thumbnailholder li.selected").removeClass("selected");
		$instance.find(".media_navigation_thumbnailholder li").eq(i).addClass("selected");
		if (this.mediaMasterData[index].thumbnailHolderUlWidth > this.mediaMasterData[index].thumbnailHolderWidth) {
			if ((newPos > 0 || newPos < this.mediaMasterData[index].leftTreshold)) {
				if (newPos > 0) {
					newPos = 0;
					$instance.find(".media_navigation_scrollers li.media_next").removeClass("not-active");
					$instance.find(".media_navigation_scrollers li.media_prev").addClass("not-active");
				} else {
					newPos = this.mediaMasterData[index].leftTreshold;
					$instance.find(".media_navigation_scrollers li.media_next").addClass("not-active");
					$instance.find(".media_navigation_scrollers li.media_prev").removeClass("not-active");
				}
			} else {
				$instance.find(".media_navigation_scrollers li").removeClass("not-active");
			}
			if (this.hasCSS3Transitions) {
				$instance.find(".media_navigation_thumbnailholder ul").css("left", newPos);
				if (hovering) {
					setTimeout("MM_Carrousel.recalculateWhereTheMouseIs(" + index + ", " + i + ")", 250);
				}
			} else {
				$instance.find(".media_navigation_thumbnailholder ul").eq(0).animate({
					left: newPos
				}, {
					duration: 200
				});
			}
			this.mediaMasterData[index].leftPosThumbnailHolder = newPos;
		}
	},
	recalculateWhereTheMouseIs: function (index, i) {
		var leftPositionOfThumbnailHolder = $("#mediamaster_" + index + " .media_navigation_thumbnailholder ul").position().left;
		var leftBound = leftPositionOfThumbnailHolder + (i * 160);
		var mouseX = this.mediaMasterData[index].mouseX - 10;
		if (leftBound <= mouseX && mouseX <= leftBound + 160) {} else {
			var $thumbnailHolder = $("#mediamaster_" + index + " .media_navigation_thumbnailholder ul li");
			$thumbnailHolder.eq(i).mouseout();
			var j = Math.floor((mouseX - leftPositionOfThumbnailHolder) / 160);
			$thumbnailHolder.eq(j).mouseover();
		}
	},
	initVideoVars: function () {
		this.videoVars = [];
		this.videoVars.type = "video";
		this.videoVars.view = "mediaCarouselItem";
		this.videoVars.divId = "";
		this.videoVars.flashId = "";
		this.videoVars.format = "large";
		this.videoVars.wmode = "transparent";
		this.videoVars.thumb = "";
		this.videoVars.w = "670";
		this.videoVars.h = "377";
		this.videoVars.copyright = "VRT";
		this.videoVars.popup = "false";
		this.videoVars.referrer = document.referrer;
		this.videoVars.statProgram = "";
		this.videoVars.statPlaylist = "";
		this.videoVars.statSite = "";
	},
	startAnimation: function (index) {
		this.mediaMasterData[index].startupTimeout = setTimeout("$('#mediamaster_" + index + "').addClass('showNavigation');", 200);
		this.mediaMasterData[index].removeStartupTimeout = setTimeout("$('#mediamaster_" + index + "').addClass('small_duration').removeClass('showNavigation');", 5200);
		this.mediaMasterData[index].removeSmallDurationTimeout = setTimeout("$('#mediamaster_" + index + "').removeClass('small_duration');", 6200);
	},
	setupVideoPlayButtons: function ($instance) {
		$instance.find(".play_button_holder li").css({
			"z-index": 6,
			left: "66.66666666666666%"
		});
		if (this.isVideoOrAudio($instance, 0)) {
			$instance.find(".play_button_holder li:first-child").css({
				"z-index": 4,
				left: "33.333333333333333%"
			});
		}
	},
	attachVideoAudioPlayButtonClick: function ($instance, index, i, data) {
		var videoNr = $instance.find(".media_navigation .media_navigation_thumbnailholder li:not(.media_nav_pager):eq(" + i + ")").attr("data-videoaudio-nr");
		var that = this;
		$instance.find(".large_media_holder .large_media li:eq(" + i + ") .video_holder_wrapper").attr("id", "div_" + index + "_" + videoNr);
		if (that.mediaMasterData[index].type == "navtop") {
			$instance.find(".play_button_holder li:eq(" + videoNr + ")").click(function () {
				that.doAudioOrVideoAction($instance, $(this), index, videoNr, i, data);
			});
		} else {
			$instance.find(".large_media_holder .large_media li:eq(" + i + ")").click(function () {
				that.doAudioOrVideoAction($instance, $(this).find(".play_button").eq(0), index, videoNr, i, data);
			});
		}
	},
	doAudioOrVideoAction: function ($instance, playbutton, index, videoNr, i, data) {
		var isVideo = $instance.find(".media_navigation .media_navigation_thumbnailholder li:not(.media_nav_pager):eq(" + i + ")").hasClass("videoitem");
		var isAudio = $instance.find(".media_navigation .media_navigation_thumbnailholder li:not(.media_nav_pager):eq(" + i + ")").hasClass("audioitem");
		if (isVideo) {
			if (!$instance.find(".large_media_holder .large_media li:eq(" + i + ")").hasClass("videoPlaying")) {
				this.playVideo($instance, playbutton, index, videoNr, i, data);
				$instance.removeClass("showNavigation");
			}
		} else {
			if (isAudio) {
				this.playAudio(data.contentId);
			}
		}
	},
	playAudio: function (id) {
		openAudioPopup("/cm/" + id + "?view=popupPlayer");
		return false;
	},
	clearTimeouts: function (index) {
		if (this.mediaMasterData[index].startupTimeout != null) {
			clearTimeout(this.mediaMasterData[index].startupTimeout);
		}
		if (this.mediaMasterData[index].removeStartupTimeout != null) {
			clearTimeout(this.mediaMasterData[index].removeStartupTimeout);
		}
		if (this.mediaMasterData[index].removeSmallDurationTimeout != null) {
			clearTimeout(this.mediaMasterData[index].removeSmallDurationTimeout);
		}
	},
	init: function () {
		var $mediaMasters = $(".mediamaster");
		var that = this;
		$mediaMasters.each(function (index) {
			if ($(this).hasClass("navtop")) {
				that.setUpMediaMasterData($(this), index, "navtop");
				that.setupLargeMediaElements($(this), index);
				that.setupVideoPlayButtons($(this));
				if (that.mediaMasterData[index].numberMediaElements > 1) {
					that.setUpNavigation($(this), index);
					that.setupHoverEffect($(this), index);
					that.startAnimation(index);
				}
			} else {
				that.setUpMediaMasterData($(this), index, "navbottom");
				that.setupLargeMediaElements($(this), index);
				if (that.mediaMasterData[index].numberMediaElements > 1) {
					that.setUpNavigation($(this), index);
				}
			}
			that.showLargeMediaElement($(this), index, 0, false, false);
		});
		if ($mediaMasters.length > 0) {
			that.setupKeyboardNavigation();
		}
		that.initVideoVars();
	}
};
var $popup = null;
var $hasSlideshow = false;
ColumnPars = function (nrOfCols, colWidth, colHeight) {
	this.nrOfColumns = nrOfCols;
	this.columnWidth = colWidth;
	this.columnHeight = colHeight;
};
ColumnPars.prototype.getNrOfColumns = function () {
	return this.nrOfColumns;
};
ColumnPars.prototype.getColumnWidth = function () {
	return this.columnWidth;
};
ColumnPars.prototype.getColumnHeight = function () {
	return this.columnHeight;
};

function initNavTabs2() {
	$(".nav-tabs2").livequery(function () {
		$(this).find(".hidden").removeClass("hidden");
		$(this).tabs();
	});
}

function initNavTabs() {
	$(".nav-tabs").tabs();
}

function fixTableStriping() {
	$("ul.striped li:odd, ol.striped li:odd").addClass("odd");
	$("ul.striped li:even, ol.striped li:even, table.striped tr:even").addClass("even");
}

function initBottomNavOnClick() {
	$("#bottomnav").find("li a").click(function (event) {
		$(this).parent().addClass("current").siblings(".current").removeClass("current");
		$("#bottomlist").load($(this).attr("href"), makeColumnCallback);
		event.preventDefault();
		return false;
	});
}
var columnPars = null;

function setColumnPars(colPars) {
	columnPars = colPars;
}

function makeColumnCallback(response, status) {
	if (status == "success") {
		makeColumn();
	}
}

function makeColumn() {
	try {
		if (columnPars !== null) {
			var $bottomList = $("#bottomlist");
			$(".vnav", $bottomList).removeClass("vnav");
			$bottomList.columnize({
				columns: columnPars.getNrOfColumns(),
				width: columnPars.getColumnWidth(),
				height: columnPars.getColumnHeight()
			});
			hideBottomMoreThanThreeColumns();
		} else {
			if (typeof setupMicroNavigation !== "undefined") {
				setupMicroNavigation($("#bottomlist").find("ol"));
			}
		}
	} catch (e) {
		console.error("Failed to init columns", e.stack);
	}
}

function initPrevNextOnClick() {
	$("a.prev, a.next").livequery("click", function (event) {
		event.preventDefault();
		var div = $(this).parents("div:first");
		var url = $(this).attr("href");
		$.ajax({
			type: "GET",
			url: url,
			dataType: "text",
			success: function (response) {
				if (div[0].outerHTML) {
					div[0].outerHTML = response;
				} else {
					div[0].innerHTML = response.split("").reverse().join("").replace(/.*<[^\/]+>/im, ">").split("").reverse().join("");
				}
				div.attr("class", $(response).attr("class"));
				var jsonId = $(response).attr("data-json-id");
				if (jsonId) {
					div.attr("data-json-id", jsonId);
					if (LiveRefresh) {
						LiveRefresh.pageChanged();
					}
				} else {
					div.removeAttr("data-json-id");
				}
				if ($("html").hasClass("ie7")) {
					div.find("table:first").addClass("ie-zoom-fix").removeClass("ie-zoom-fix").height();
				}
			}
		});
		return false;
	});
}

function initSlideshow() {
	$(".slideshow.contentitem, .contentitem:has(.slideshow), .slideshow:has(.slideshowitem), .slideshow.slideshowitem").livequery(function () {
		var $thizz = $(this);
		var $slideshowContainer = $('<div id="slideshow" class="slideshow-overlay closed"><div class="slideshow-loader"></div></div>');
		if (!$hasSlideshow) {
			$("body").append($slideshowContainer);
			$hasSlideshow = true;
		}
		$(".j-slideshow-overlay", $thizz).on("click", function (event) {
			event.preventDefault();
			var $slideshowContainer = $("#slideshow");
			$slideshowContainer.toggleClass("open closed");
			$("body").addClass("slideshow-disable");
			$.ajax({
				type: "GET",
				url: $(this).data("url"),
				dataType: "text",
				success: function (response) {
					$slideshowContainer.html(response).slideshow();
				}
			});
		});
	});
}

function initPermalinkOnClick() {
	$("a.permalinkInfo").livequery("click", function (event) {
		event.preventDefault();
		var $permalinkInfoPopup = $("#permalinkInfoPopup");
		$permalinkInfoPopup.show();
		var dataUrl = $(this).data("url");
		if (typeof dataUrl !== "undefined" && dataUrl !== false) {
			$("#permalinkInfoSelect").val(dataUrl);
		}
		$("#permalinkInfoSelect").focus().select();
		$(".bg").click(function () {
			$permalinkInfoPopup.hide();
		});
		$("#permalinkInfoClose").click(function () {
			$permalinkInfoPopup.hide();
		});
		$(document).keyup(function (e) {
			if (e.keyCode == 27) {
				$permalinkInfoPopup.hide();
			}
		});
	});
	$("a.infoPopup").livequery("click", function (event) {
		event.preventDefault();
		$("#infoPopupTitle").html($(this).attr("data-popup-title"));
		var $infoPopupText = $("#infoPopupText");
		$infoPopupText.html($(this).attr("data-popup-text"));
		var $infoPopup = $("#infoPopup");
		$infoPopup.show();
		$infoPopupText.focus().select();
		$(".bg").click(function () {
			$infoPopup.hide();
		});
		$("#infoPopupClose").click(function () {
			$infoPopup.hide();
		});
		$(document).keyup(function (e) {
			if (e.keyCode == 27) {
				$infoPopup.hide();
			}
		});
	});
}

function initCarouselAndEPG() {
	$("div.carousel").livequery(function () {
		$(this).each(function () {
			if ($(this).parents(".epg").size() > 0) {
				$(this).epg({});
			} else {
				$(this).carousel({});
			}
		});
	});
}

function initAnimatedGrid() {
	$(".grid.animate").livequery(function () {
		$(this).each(function () {
			var elem = $("li", this);
			elem.each(function () {
				var $title = $(".title", this);
				var height = $title.height();
				$title.css("bottom", "-" + height + "px");
			});
			elem.hover(function () {
				$(".title", this).animate({
					bottom: "0px"
				}, 200);
			}, function () {
				$(".title", this).animate({
					bottom: "-" + ($(".title", this).height()) + "px"
				}, 200);
			});
		});
	});
}

function initNavigableGrid() {
	$(".grid.navigate").each(function () {
		var $n = $(this);
		var $ul = $("ul", $n);
		var itemWidth = $("li", $ul).outerWidth() + 10;
		$ul.height("auto").wrap('<div class="gridcontainer"></div>').width(itemWidth * $("li", $ul).size()).css("left", "0px");
		$(".gridcontainer", $n).append('<div class="prev"><span>&lt;</span></div>').append('<div class="next"><span>&gt;</span></div>');
		$(".prev", $n).click(function () {
			var currentOffset = stripPX($ul.css("left"));
			if (currentOffset < 0) {
				$ul.filter(":not(:animated)").animate({
					left: currentOffset + itemWidth
				}, 200);
			}
		});
		$(".next", $n).click(function () {
			var currentOffset = stripPX($ul.css("left"));
			if (currentOffset > -$ul.width() + $(".gridcontainer", $n).width()) {
				$ul.filter(":not(:animated)").animate({
					left: currentOffset - itemWidth
				}, 200);
			}
		});
	});
}

function initTicker() {
	$(".ticker ol, .ticker ul").ticker();
}

function openAudioPopup(url) {
	try {
		pauseActiveFlash();
	} catch (e) {}
	var audioWindow = window.open(url, "Audioplayer", "width=420,height=135,menubar=0,toolbar=0,titlebar=0,status=0,directories=0,scrollbars=0");
	if (audioWindow && audioWindow.focus) {
		audioWindow.focus();
	}
	return audioWindow;
}

function initAudioPlayerOnClick() {
	$("li:not(.mediaItem).audio a, div.audio > h3 a, div.media.audio a, a.audiolink, li.AUDIO > a").livequery("click", function (event) {
		var url = $(this).attr("href");
		if (url === "" || url === undefined || url === "#") {
			url = $(this).attr("rel");
		}
		openAudioPopup(url);
		event.preventDefault();
		return false;
	});
}

function initAccordion() {
	$("div.accordion").each(function () {
		$("div.section", this).each(function () {
			$(this).before("<h5>" + $("h4:first", this).html() + "</h5>");
			$("h4:first", this).remove();
		});
		$(this).accordion({
			header: "h5",
			heightStyle: $(this).hasClass("autoheight") ? "auto" : "content",
			beforeActivate: function (event, ui) {
				var $carousel = $(".carousel", ui.newPanel);
				$(".carouselband li", $carousel).css("height", "auto").equalHeights().animate({
					opacity: 1
				}, 1000, function () {
					$(".carouselbandcontainer", $carousel).css("height", "auto");
				});
			}
		});
	});
}

function hideBottomMoreThanThreeColumns() {
	$("#bottom").find(".column:gt(2)").hide();
}

function addMediaVideoLinks() {
	$("span.media.video").livequery(function () {
		var $a = $(this).parent();
		var $div = $a.parent();
		var link = $a.attr("href");
		$("h3, h2", $div).each(function () {
			$(this).html('<a class="videolink" href="' + link + '">' + $(this).html() + "</a>");
		});
	});
}

function addMediaAudioLinks() {
	$("div.media.audio").livequery(function () {
		var $a = $("a", this);
		var $div = $(this).parent();
		var link = $a.attr("href");
		$("h3, h2", $div).each(function () {
			$(this).html('<a class="audiolink" href="' + link + '">' + $(this).html() + "</a>");
		});
	});
}

function initPopupLinksOnClick() {
	function closePopup() {
		$(document).unbind("keydown", closeOnEscape);
		$(".ie7 .popup-ie-index").removeClass("popup-ie-index");
		$popup.remove();
		$popup = null;
	}

	function closeOnEscape(event) {
		if (event.keyCode == 27) {
			closePopup();
			event.preventDefault();
			return false;
		} else {
			return true;
		}
	}
	$("a.popup").livequery("click", function (event) {
		event.preventDefault();
		var href = $(this).attr("data-href");
		var h = ($(this).attr("data-height") > 0) ? $(this).attr("data-height") : 600;
		var w = ($(this).attr("data-width") > 0) ? $(this).attr("data-width") : 400;
		var docWidth = $(document).width();
		var docHeight = $(document).height();
		if ($popup !== null) {
			$popup.remove();
		}
		$popup = $('<div id="popup"><a href="#" id="closePopup">X</a><iframe></iframe></div>').appendTo($("body"));
		if ($(this).parents(".ie7").size() > 0) {
			$(this).parents().addClass("popup-ie-index");
		}
		$popup.css("width", w + "px").css("height", h + "px");
		$("iframe", $popup).attr("src", href).css("width", w + "px").css("height", h + "px");
		$(document).bind("keydown", closeOnEscape);
		$("#closePopup").click(function (event) {
			closePopup();
			event.preventDefault();
			return false;
		});
		var leftVal, topVal;
		if ($(this).parents("#aside").size() > 0 || $(this).parents(".context").size() > 0) {
			leftVal = event.pageX - w;
			topVal = event.pageY;
		} else {
			leftVal = event.pageX;
			topVal = event.pageY;
		}
		if (leftVal < 50) {
			leftVal = 50;
		}
		if (topVal < 50) {
			topVal = 50;
		}
		$popup.css({
			left: leftVal + "px",
			top: topVal + "px"
		});
		if ($popup.offset().top + $popup.height() > docHeight) {
			var heightDiff = $popup.offset().top + $popup.height() - docHeight + 20;
			$popup.css("margin-top", "-" + heightDiff + "px");
		}
		if ($popup.offset().left + $popup.width() > docWidth) {
			var widthDiff = $popup.offset().left + $popup.width() - docWidth + 20;
			$popup.css("margin-left", "-" + widthDiff + "px");
		}
		return false;
	});
}

function initShortAndWidgetAccordeon() {
	$(".shortAccordion,.widgetaccordion").accordion({
		header: "h3",
		animate: true,
		heightStyle: "content"
	});
}

function initMenu() {
	$("#topnav ul.nav3, #topnav ul.nav2").each(function () {
		var $parent = $(this).parent();
		if ($("li", this).hasClass("current")) {
			$parent.addClass("current");
		}
	});
	$("#topnav ul.nav1 > li.current, #topnav ul.nav2 > li.current").each(function () {
		var $child = $("> ul", this);
		if ($child.size() > 0) {
			$child.show();
		}
	});
}

function stripPX(s) {
	return parseInt(s.replace(/px/, ""));
}

function initStandardArticleMasterMedia() {
	$("#mediaGroupList .mediaItem").each(function () {
		$("> a", this).attr({
			href: "#"
		});
		$(this).click(function (event) {
			if ($("#media .playing").size() > 0) {
				$("#audioPlayer").stopSound();
			}
			var itemUrl = $(this).attr("id");
			if (itemUrl.indexOf("landscape") > -1) {
				$("#mastermedia #media").html($("<img />").attr("src", itemUrl));
			} else {
				$.get(itemUrl, function (response) {
					$("#mastermedia #media").html(response);
				});
			}
			event.preventDefault();
			return false;
		});
	});
}
Modernizr.addTest("ipad", function () {
	return !!navigator.userAgent.match(/iPad/i);
});
Modernizr.addTest("iphone", function () {
	return !!navigator.userAgent.match(/iPhone/i);
});
Modernizr.addTest("ipod", function () {
	return !!navigator.userAgent.match(/iPod/i);
});

function initTiles() {
	setupTiles(".tile");
}

function searchAdvanced(element) {
	var $this = (!!element) ? element : $("#searchAdvanced"),
		$hides = $this.siblings(".hide");
	($this.is(":checked")) ? $hides.addClass("checked"): $hides.removeClass("checked");
}

function initDatePickers() {
	searchAdvanced();
	var lang = $("html").attr("lang");
	var datePickerSettings = {
		format: "DD/MM/YY",
		firstDay: 1,
		yearRange: 3,
		i18n: {
			previousMonth: "<",
			nextMonth: ">",
			months: moment.langData(lang)._months,
			weekdays: moment.langData(lang)._weekdays,
			weekdaysShort: moment.langData(lang)._weekdaysMin
		}
	};
	var datepickers = ["searchInputAtDate", "searchInputStartDate", "searchInputEndDate"];
	datepickers.forEach(function (datepicker) {
		var datepickerElement = document.getElementById(datepicker),
			$datepickerElement = $(datepickerElement);
		var picker = new Pikaday($.extend({
			field: datepickerElement,
			onSelect: function (date) {
				$datepickerElement.parents(".search-item").find("input[type=radio]").prop("checked", true);
			}
		}, datePickerSettings));
		$datepickerElement.next("i").click(function () {
			picker.show();
		});
	});
}(function () {
	$("#searchAdvanced").click(function () {
		searchAdvanced($(this));
	});
})();
$(document).ready(function () {
	var functions = [initMenu, initPopupLinksOnClick, initAudioPlayerOnClick, initPrevNextOnClick, initPermalinkOnClick, initNavTabs, initNavTabs2, initTiles, initSlideshow, initCarouselAndEPG, initAnimatedGrid, initNavigableGrid, initTicker, initAccordion, initShortAndWidgetAccordeon, initBottomNavOnClick, initStandardArticleMasterMedia, initDatePickers, addMediaVideoLinks, addMediaAudioLinks, fixTableStriping, hideBottomMoreThanThreeColumns];
	for (var i = 0, len = functions.length; i < len; i++) {
		try {
			functions[i].call(this);
		} catch (e) {
			var functionName = "(anonymous)";
			if (functions[i].name) {
				functionName = functions[i].name;
			}
			console.error("Failed to execute " + functionName, e.stack);
		}
	}
});
var deviceIsIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
var deviceIsAndroid = navigator.userAgent.match(/Android/i);
if (deviceIsAndroid) {
	$("html").addClass("android");
}

function setAsHome(myLink) {
	try {
		myLink.style.behavior = "url(#default#homepage)";
		myLink.setHomePage(location.href);
	} catch (e) {
		var msg = "";
		var browserNaam = navigator.appName;
		if (browserNaam == "Netscape") {
			msg = "Sleep deze link naar het homepage ";
			msg += "icoontje (het huisje) om deze pagina in te stellen als ";
			msg += "startpagina!";
		} else {
			if (browserNaam == "Opera") {
				msg = "Ga naar Extra of Tools (bij de Engelstalige versie)";
				msg += "Kies Voorkeuren of Preferences";
				msg += "Bij Startpagina of Home Page geef je het adres van deze website";
				msg += "Klik op OK";
			} else {
				if (browserNaam == "Microsoft Internet Explorer") {
					msg = "Ga naar Extra of Tools (bij de Engelstalige versie)";
					msg += "Kies Internet-opties/Internet-options.";
					msg += "Bij Startpagina of Home Page geef je het adres van deze website";
				}
			}
		}
		if (msg != "") {
			alert(msg);
		}
	}
}

function openPopup(url, title, x, y, width, height, resizable, menubar, scrollbars) {
	window.open(url, title, "menubar=" + menubar + ",resizable=" + resizable + ",width=" + width + ",height=" + height + ",left=" + x + ",top=" + y + ",scrollbars=" + scrollbars);
}

function showMobileAlternative() {
	var $mobileAgentsElem = $("#mobileAgents");
	if ($mobileAgentsElem.length > 0 && $mobileAgentsElem.attr("data-mobile-url") !== "" && new MobileDetect(window.navigator.userAgent).phone() && !($.cookie("hideHintbox"))) {
		var hintboxContainer = $("<p></p>").attr("id", "hintbox").addClass("alert").append($("<a></a>").attr("href", $mobileAgentsElem.attr("data-mobile-url")).addClass("text").text($mobileAgentsElem.attr("data-mobile-text")));
		var hintboxControl = $("<a></a>").addClass("close").text("X").on("click", function (e) {
			console.log("cookies?");
			hintboxContainer.slideUp(function () {
				$.cookie("hideHintbox", true);
			});
			e.preventDefault();
		});
		hintboxContainer.append(hintboxControl);
		$("body").addClass("hintbox").prepend(hintboxContainer);
	}
}

function setLabel(className, label) {
	$("#main .contentitem." + className + ", #fullwidth .contentitem." + className).each(function () {
		if ($(".category", this).size() > 0) {
			$(".media .category small", this).html(label);
			$(".desc .category small a", this).html(label);
		}
	});
}

function initScrollToTopOnClick() {
	$("#top-button").click(function (e) {
		$("html, body").animate({
			scrollTop: 0
		}, "fast");
		e.preventDefault();
		return false;
	});
}

function initFlashObjects() {
	$(".divider.flash").each(function () {
		var $flashDiv = $(this);
		var params = {
			allowfullscreen: "true",
			allowscriptaccess: "always",
			bgcolor: $flashDiv.attr("data-bgcolor"),
			wmode: "transparent"
		};
		var flashvars = $flashDiv.data("flashvars");
		var attributes = {
			id: $flashDiv.attr("data-flash-id"),
			name: $flashDiv.attr("data-flash-id")
		};
		swfobject.embedSWF($flashDiv.attr("data-url"), $flashDiv.attr("data-div-id"), String($flashDiv.attr("data-width")), String($flashDiv.attr("data-height")), String($flashDiv.attr("data-min-version")), "/html/flash/expressinstall.swf", flashvars, params, attributes);
	});
}

function olderBrowsers() {
	if ($("body").is(".ie6,.ie7,.ie8") && !$.cookie("olderbrowser")) {
		var msg = '<div id="widget-olderbrowser"><div class="widget-olderbrowser-wrapper"><span>Opgelet: uw browser is verouderd. Update uw browser voor meer veiligheid en een betere beleving op deze site. <a href="http://www.vrt.be/faq/welke-browsers-heb-ik-nodig-om-naar-de-vrt-sites-te-surfen" target="_blank">Meer info</a></span><a class="close" href="#" title="verder gaan">x</a></div></div>';
		$("body").addClass("widget-olderbrowser").prepend(msg);
	}
	$("#widget-olderbrowser .close").on("click", function (e) {
		e.preventDefault();
		$("#widget-olderbrowser").slideUp();
		$("body").removeClass("widget-olderbrowser");
		$.cookie("olderbrowser", 1, {
			expires: 1,
			domain: window.location.host
		});
	});
}

function getURLParameter(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function scrollIntoEId() {
	$(window).load(function () {
		var eventToScrollTo = getURLParameter("eid");
		if (eventToScrollTo) {
			eventToScrollTo = eventToScrollTo.replace(".", "\\."), article = $("#" + eventToScrollTo);
			if (article.length) {
				var margin = 12,
					elemtop = article.offset().top - margin;
				if ($(".fakesticky")) {
					elemtop = elemtop - 39;
					if ($(".fakesticky").find("ul.nav2").length) {
						elemtop = elemtop - 43;
					}
				}
				$("html, body").animate({
					scrollTop: elemtop
				}, 500);
			}
		}
	});
}
$(document).ready(function () {
	showMobileAlternative();
	initScrollToTopOnClick();
	initFlashObjects();
	olderBrowsers();
});
var loadVideoCallers = [];
var vrtMediaPlayers = {};
var currentMediaPlayerId = null;
var deviceUsesVideoPlayer = true;
var vampInitialized = false;
var onLoadVideo = function ($videoDiv) {
	$videoDiv.parents(".eyeXL").find("h1").hide();
};
var onUnloadVideo = function (oldMediaContentId, $videoDiv) {
	$videoDiv.parents(".eyeXL").find("h1").show();
};
var onVideoError = function (statProgram, errorMessage) {};
var onVideoStateChange = function (statProgram, oldStatus, newStatus) {};
var onVideoClicked = function (statProgram, status) {};
var onCreateVideoPlayerConfig = function (playerConfig) {};
var videoNotAvailableMsg = {
	nl: "Deze video is nog niet beschikbaar. Probeer het later opnieuw.",
	de: "Dieses Video ist nicht verfügbar. Bitte später erneut versuchen.",
	en: "This video is not available yet. Please try again later.",
	fr: "Cette vidéo n'est pas disponible pour le moment, veuillez réessayer plus tard."
};

function isNotBlank(str) {
	return str != undefined && str !== "";
}

function isYouTube(vars) {
	return vars.type == "YouTubeVideo";
}

function isMediazoneVideo(vars) {
	return vars.type == "MediazoneVideo";
}

function isLiveStream(vars) {
	return vars.type == "LiveStream";
}

function getPageLanguage() {
	var lang = $("html").attr("lang");
	if (lang == "") {
		lang = "nl";
	}
	return lang;
}

function videoErrorListener(vars, error) {
	if (isDebug) {
		console.log("videoplayer error: " + error);
	}
	onVideoError(vars.statProgram, error);
	var language = getPageLanguage();
	errorVideo(videoNotAvailableMsg[language], vars.divId);
}

function showVideoError($elem, errorMessage) {
	$elem.html("").addClass("errorVideo");
	$elem.prepend('<div class="errorWrapper"><span class="errorMessage">' + errorMessage + "</span></div>");
}

function errorVideo(errorMessage, divId) {
	log("unloading bad video " + divId);
	var playerId = divId;
	var $content = $("#" + playerId);
	if ($content.length == 0) {
		$content = $("#" + playerId + "_wrapper");
	}
	showVideoError($content, errorMessage);
}

function unloadVideo(errorMessage, divId) {
	log("unloadVideo");
	var playerId = null;
	if (typeof divId === "string") {
		playerId = divId;
	} else {
		playerId = currentMediaPlayerId;
	}
	if (playerId != null) {
		var arrayIndex = loadVideoCallers.indexOf(playerId);
		if (arrayIndex > -1) {
			loadVideoCallers.splice(arrayIndex, 1);
		}
		removeVideoPlayer(playerId);
		log("Restoring old content for " + playerId + " ...");
		var $oldMediaContent = $("#" + playerId).parent();
		var oldMediaContent = vrtMediaPlayers[playerId]["content"];
		$oldMediaContent.html(oldMediaContent).attr("id", playerId);
		log("Removing " + playerId + " from vrtMediaPlayers ...");
		delete vrtMediaPlayers[playerId];
		onUnloadVideo(playerId, $oldMediaContent);
		$oldMediaContent.find(".embedExpand").removeClass("embedExpand");
		if (errorMessage) {
			showVideoError($oldMediaContent, errorMessage);
		}
		currentMediaPlayerId = null;
	}
}

function loadVideo(vars) {
	log("Start loadVideo " + vars.divId + " callers were " + loadVideoCallers);
	if ($.inArray(vars.divId, loadVideoCallers) < 0) {
		log("Start loadVideo " + vars.divId + " not called before");
		loadVideoCallers.push(vars.divId);
		if (isDebug) {
			console.log("videoplayer vars object follows:");
			console.dir(vars);
		}
		if (currentMediaPlayerId != vars.divId) {
			log("videoplayer: video CLICKED");
			onVideoClicked(vars.statProgram, "CLICKED");
			vrtMediaPlayers[vars.divId] = {};
			vrtMediaPlayers[vars.divId]["data"] = vars;
			loadPlayer(vars);
		}
	} else {
		log("Start loadVideo " + vars.divId + " WAS called before");
	}
}

function initMediazoneVideo(playerConfig, vars) {
	playerConfig.mzsource = {
		hls: vars.src
	};
	playerConfig.mzclient = "polopoly";
	playerConfig.mzid = vars.mzid;
}

function initVideoResources(playerConfig, vars) {
	playerConfig.source = {};
	if (isNotBlank(vars.rtmpServer) && isNotBlank(vars.rtmpPath)) {
		playerConfig.source = {
			rtmp: {
				streamer: vars.rtmpServer,
				file: vars.rtmpPath
			}
		};
	}
	if (isNotBlank(vars.iphoneServer) && isNotBlank(vars.iphonePath)) {
		var url = vars.iphoneServer + "/" + vars.iphonePath;
		if (/sport\/FiFa/.test(url)) {
			url = url.replace("sporza/_definst_", "sport_geo/_definst_");
		}
		playerConfig.source = {
			hls: url
		};
	}
}

function getIdFromLiveUrl(vars) {
	if (isNotBlank(vars.iphoneServer)) {
		return vars.iphoneServer.replace(/^.*vrt_/, "").replace("_live", "");
	}
}

function loadPlayer(vars) {
	var bMediazoneVideo = isMediazoneVideo(vars);
	var bYouTube = isYouTube(vars);
	var bLiveStream = isLiveStream(vars);
	if (!vampInitialized) {
		log("Registering vamp event listeners ...");
		$vamp.on("error", function (playerId, event, err) {
			try {
				var vars = vrtMediaPlayers[playerId]["data"];
				videoErrorListener(vars, err.message);
			} catch (e) {
				log("Failed to execute error listener callback");
			}
		});
		$vamp.on("setupError", function (playerId, event) {
			try {
				var vars = vrtMediaPlayers[playerId]["data"];
				videoErrorListener(vars, "Could not load Flash nor HTML5 player");
			} catch (e) {
				log("Failed to execute setupError listener callback");
			}
		});
		vampInitialized = true;
	}
	unloadVideo();
	currentMediaPlayerId = vars.divId;
	var $divId = $("#" + currentMediaPlayerId);
	vrtMediaPlayers[currentMediaPlayerId]["content"] = $divId.html();
	$divId.css("min-height", $divId.height());
	$divId.empty();
	onLoadVideo($divId);
	$divId.attr("id", "");
	$("<div></div>").attr("id", currentMediaPlayerId).appendTo($divId);
	var imgUrl = vars.thumb;
	if (!/^http/.test(imgUrl)) {
		imgUrl = window.location.protocol + "//" + window.location.host + imgUrl;
	}
	var playerConfig = {
		id: vars.divId,
		image: imgUrl,
		height: parseInt(vars.h),
		width: parseInt(vars.w),
		ads: vars.prerollsEnabled == undefined ? true : String(vars.prerollsEnabled) == "true",
		category: vars.prerollCategory,
		analytics: {
			date: vars.statPubDate == undefined ? null : new Date(Number(vars.statPubDate)),
			episode: vars.title,
			playlist: vars.statPlaylist,
			program: vars.statProgram,
			type_clip: vars.statClipType,
			whatson: vars.whatsOnId
		},
		duration: parseInt(vars.duration)
	};
	if (!isNotBlank(vars.autoStart) || String(vars.autoStart) == "true") {
		playerConfig.autostart = true;
	}
	if (bMediazoneVideo) {
		initMediazoneVideo(playerConfig, vars);
	} else {
		if (bYouTube) {
			playerConfig.source = {
				youtube: vars.src
			};
		} else {
			if (bLiveStream) {
				playerConfig.source = {
					live: getIdFromLiveUrl(vars)
				};
			} else {
				initVideoResources(playerConfig, vars);
			}
		}
	}
	onCreateVideoPlayerConfig(playerConfig);
	if (isDebug) {
		console.log("vamp config follows:");
		console.dir(playerConfig);
	}
	log("Initializing vamp ...");
	$vamp.create(playerConfig);
	if (currentMediaPlayerId != null) {
		vrtMediaPlayers[currentMediaPlayerId]["player"] = vars.divId;
	}
}

function removeVideoPlayer(currentPlayerId) {
	$.each(vrtMediaPlayers, function (playerId, data) {
		if (data.hasOwnProperty("player")) {
			if (currentPlayerId === playerId) {
				try {
					log("Removing vamp " + playerId + " ...");
					$vamp(playerId).remove();
				} catch (e) {
					console.error("Failed to remove vamp " + playerId, e.stack);
				}
			}
		}
	});
}
newVideozone = {
	GAP: 4,
	FULL_ITEMS_VISIBLE: 3,
	setupVideoPage: function () {
		$(".video[data-video-id]").livequery("click", function (event) {
			if ($("embed, object, video", this).size() == 0) {
				loadVideo(newVideozone.getVideoVars(this));
			}
			event.preventDefault();
			return false;
		});
		$(".video[data-video-id] a").livequery("click", function (event) {
			event.stopImmediatePropagation();
		});
		newVideozone.startAutoplayVideos();
	},
	startAutoplayVideos: function () {
		$('.video[data-video-autoplay="true"]').each(function () {
			var vars = newVideozone.getVideoVars($(this));
			if (deviceUsesVideoPlayer) {
				vars.autoStart = "true";
				loadVideo(vars);
			}
		});
	},
	getVideoVars: function (target) {
		var vars = [];
		vars.type = $(target).attr("data-video-type");
		vars.view = "streamEmbed";
		vars.divId = "div_" + $(target).attr("data-video-id");
		vars.flashId = "fp_" + $(target).attr("data-video-id");
		vars.format = "large";
		vars.wmode = "transparent";
		vars.title = $(target).attr("data-video-title");
		vars.src = $(target).attr("data-video-src");
		vars.mzid = $(target).attr("data-video-mzid");
		vars.iphoneServer = $(target).attr("data-video-iphone-server");
		vars.iphonePath = $(target).attr("data-video-iphone-path");
		vars.rtmpServer = $(target).attr("data-video-rtmp-server");
		vars.rtmpPath = $(target).attr("data-video-rtmp-path");
		vars.thumb = $(target).find("img").attr("src");
		vars.duration = $(target).attr("data-video-duration");
		var $flashPlayer = $(target).parents(".videoarticle:first");
		var width = $flashPlayer.attr("data-video-width");
		var height = $flashPlayer.attr("data-video-height");
		if (width == undefined || height == undefined) {
			var $divId = $("#" + vars.divId);
			width = $divId.width();
			height = $divId.height();
		}
		vars.w = width;
		vars.h = height;
		vars.copyright = $(target).find(".copyright").html();
		vars.popup = "false";
		vars.referrer = document.referrer;
		vars.statProgram = $(target).attr("data-video-sitestat-program");
		vars.statPlaylist = $(target).attr("data-video-sitestat-playlist");
		vars.statSite = $(target).attr("data-video-sitestat-site");
		vars.statClipType = $(target).attr("data-video-sitestat-cliptype");
		vars.statPubDate = $(target).attr("data-video-sitestat-pubdate");
		vars.statDuration = $(target).attr("data-video-sitestat-duration");
		vars.whatsOnId = $(target).attr("data-video-whatsonid");
		vars.geoBlocking = $(target).attr("data-video-geoblocking");
		vars.prerollsEnabled = $(target).attr("data-video-prerolls-enabled");
		vars.prerollCategory = $(target).attr("data-video-preroll-category");
		return vars;
	},
	setupEpisodeClick: function () {
		$(".videoarticle").each(function () {
			var $videoArticle = $(this);
			var playerWidth = $(".flashPlayer", $videoArticle).width();
			var playerHeight = $(".flashPlayer", $videoArticle).height();
			$videoArticle.attr("data-video-width", playerWidth);
			$videoArticle.attr("data-video-height", playerHeight);
			$(".ajax-detail-episode", $videoArticle).bind("click", function (event) {
				$(".videolist-item.current", $videoArticle).removeClass("current");
				$(this).parent().addClass("current");
				var url = $(this).attr("data-json");
				var title = $(this).attr("data-video-title");
				var permalink = $(this).attr("data-video-permalink");
				$.ajax({
					type: "GET",
					url: url,
					dataType: "html",
					success: function (response) {
						var content = $(".videoarticle-video", response).html();
						var newId = $(content).attr("id");
						var oldId = $(".media", $videoArticle).attr("id");
						if (newId != oldId) {
							unloadVideo();
							$(".media", $videoArticle).remove();
							$videoArticle.prepend(content);
							var $ajaxDescription = $(".videoarticle-description", response);
							var $videoDescription = $(".videoarticle-description", $videoArticle);
							$videoDescription.html($ajaxDescription.html());
							$videoDescription.removeClass("geoblocked");
							if ($ajaxDescription.hasClass("geoblocked")) {
								$videoDescription.addClass("geoblocked");
							}
							$(".videoarticle-socialsharing .email a", $videoArticle).attr("href", "mailto:?subject=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(permalink));
							$(".videoarticle-socialsharing .permalink a", $videoArticle).attr("data-popup-text", permalink).attr("href", permalink);
							$("#permalinkInfoSelect").attr("value", permalink);
							var $facebookShare = $(".videoarticle-socialsharing .facebookshare .fb-like", $videoArticle);
							$facebookShare.empty().removeAttr("fb-xfbml-state").attr("data-href", permalink);
							var $twitterShare = $(".videoarticle-socialsharing .twittershare", $videoArticle);
							var $newTwitterShare = $('<a href="https://twitter.com/share" class="twitter-share-button" data-lang="en">Tweet</a>').attr("data-url", permalink).attr("data-text", title);
							$twitterShare.empty().append($newTwitterShare);
							try {
								FB.XFBML.parse();
							} catch (e) {
								console.error("Failed to re-init facebook share button", e.stack);
							}
							try {
								twttr.widgets.load();
							} catch (e) {
								console.error("Failed to re-init twitter share button", e.stack);
							}
							newVideozone.startAutoplayVideos();
							var margin = 12,
								top = $($videoArticle).offset().top - margin;
							if ($(".fakesticky")) {
								top = top - $(".fakesticky").height();
								if ($(".fakesticky").find("ul.nav2").length) {
									top = top - 43;
								}
							}
							$("html,body").animate({
								scrollTop: (top)
							}, "fast");
						}
					}
				});
				event.preventDefault();
				return false;
			});
		});
	},
	setupEpisodeNavigation: function () {
		$(".videoarticle .videolist").each(function () {
			var $vl = $(this);
			var $ul = $("ul", $vl);
			var $liItems = $("li.videolist-item", $ul);
			var numberLiItems = $liItems.size();
			var vliWidth = $liItems.width() + newVideozone.GAP;
			$ul.width(numberLiItems * vliWidth);
			$ul.css("position", "relative");
			var offsetSkip = newVideozone.FULL_ITEMS_VISIBLE * vliWidth;
			var minLeft = -$ul.width() + offsetSkip;
			if (numberLiItems > newVideozone.FULL_ITEMS_VISIBLE) {
				$vl.append('<p class="slider"><span class="prev">&lt;</span><span class="next">&gt;</span></p>');
				$(".prev", $vl).click(function () {
					var currentOffset = stripPX($ul.css("left"));
					if (currentOffset < 0) {
						newVideozone.setCurrentOffset(currentOffset + offsetSkip, true, $ul);
					}
				});
				$(".next", $vl).click(function () {
					var currentOffset = stripPX($ul.css("left"));
					if (currentOffset > minLeft) {
						newVideozone.setCurrentOffset(currentOffset - offsetSkip, true, $ul);
					}
				});
			}
		});
	},
	setCurrentOffset: function (newOffset, animated, $container) {
		var $liItems = $("li.videolist-item", $container);
		var vliWidth = $liItems.width() + newVideozone.GAP;
		var offsetSkip = newVideozone.FULL_ITEMS_VISIBLE * vliWidth;
		var minLeft = -$liItems.size() * vliWidth + offsetSkip;
		var currentOffset = newOffset;
		if (currentOffset > 0) {
			currentOffset = 0;
		} else {
			if (currentOffset < minLeft) {
				currentOffset = minLeft;
			}
		}
		if (animated) {
			$container.animate({
				left: currentOffset + "px"
			}, 200);
		} else {
			$container.css("left", currentOffset + "px");
		}
	},
	focusOnCurrentEpisode: function () {
		$(".videoarticle").each(function () {
			var $vl = $(this);
			var $ul = $(".videolist > ul", $vl);
			var $liItems = $("li.videolist-item", $ul);
			var vliWidth = $liItems.width() + newVideozone.GAP;
			var numberLiItems = $liItems.size();
			if (numberLiItems > newVideozone.FULL_ITEMS_VISIBLE) {
				var indexOfCurrentItem = $liItems.index($(".current", $ul));
				var newOffset = -indexOfCurrentItem * vliWidth;
				newVideozone.setCurrentOffset(newOffset, false, $ul);
			}
		});
	}
};
$(document).ready(function () {
	var functions = [newVideozone.setupEpisodeClick, newVideozone.focusOnCurrentEpisode, newVideozone.setupVideoPage, setupVideoWall];
	for (var i = 0, len = functions.length; i < len; i++) {
		try {
			functions[i].call(this);
		} catch (e) {
			var functionName = "(anonymous)";
			if (functions[i].name) {
				functionName = functions[i].name;
			}
			console.error("Failed to execute " + functionName, e.stack);
		}
	}
});
var onUnloadVideo = function (oldMediaContentId, $videoDiv) {
	var $mediamasterParent = $videoDiv.parents(".mediamaster");
	if ($mediamasterParent.length > 0) {
		var re = /^div_(\d+)_(\d+)$/;
		var num1 = oldMediaContentId.replace(re, "$1");
		var num2 = oldMediaContentId.replace(re, "$2");
		var $playButton = $("#mediamaster_" + num1 + " .play_button_holder li:eq(" + num2 + ")");
		$playButton.css({
			left: "33.33%",
			"z-index": "4"
		});
		var video = $("#mediamaster_" + num1 + " .videoPlaying");
		video.removeClass("videoPlaying");
	} else {
		if (deviceUsesVideoPlayer) {
			$videoDiv.find(".overlay").css({
				left: "0px"
			});
			$videoDiv.parents(".eyeXL").find("h1").show();
		}
	}
};
var onLoadVideo = function ($videoDiv) {
	var $mediamasterParent = $videoDiv.parents(".mediamaster");
	if ($mediamasterParent.length === 0 && deviceUsesVideoPlayer) {
		$videoDiv.parents(".eyeXL").find("h1").hide();
		$videoDiv.find(".overlay").animate({
			left: "-100px"
		});
	}
};
var cfg = {};
var hoverIntentTimer = "";

function showInfoBox(element, text, className) {
	var offsetX = 10;
	var offsetY = 10;
	if (className === "largerBox") {
		offsetX = -50;
		offsetY = 25;
	}
	$(element).mousemove(function (event) {
		$("#infoBox").addClass(className).html(text).show().css({
			top: event.pageY + offsetY,
			left: event.pageX + offsetX
		});
	});
}

function hideInfoBox(className) {
	$("#infoBox").removeClass(className).hide();
}

function setupCyclingJerseyInfoBoxes() {
	$(".scoreboard.cycling ul.jerseys").livequery(function () {
		$(this).each(function () {
			var el = $(this);
			var content = el.parent().find(".gapdescription").text();
			if (content !== "") {
				el.hover(function () {
					showInfoBox(el, content, "largerBox");
				}, function () {
					hideInfoBox("matchfiche-cycling, largerBox");
				});
			}
		});
	});
}

function setupProfilePointsInfoBoxes() {
	$(".scoreboard.cycling ol.profilepoints li span.title").livequery(function () {
		$(this).each(function () {
			var el = $(this);
			el.hover(function () {
				showInfoBox(el, el.parent().html(), "largerBox");
			}, function () {
				hideInfoBox("matchfiche-cycling, largerBox");
			});
		});
	});
}

function setupRoundOverviewInfoBoxes() {
	$(".roundoverview i[title], i[title], li[title], span[title]").livequery(function () {
		$(this).each(function () {
			var el = $(this);
			el.data("titleText", el.attr("title"));
			el.hover(function () {
				showInfoBox(el, el.data("titleText"));
			}, function () {
				hideInfoBox();
			}).removeAttr("title");
		});
	});
}

function setupLargeEPGImages() {
	$(".epg img").livequery(function () {
		$(this).each(function () {
			$(this).attr("src", $(this).attr("src").replace("landscape190", "landscape270"));
		});
	});
}

function setupMenuHoverDelay() {
	$("#topnav").addClass("js-enabled").find("ul.nav1 > li.current ul").bind("mouseleave", function () {
		$("#topnav ul.nav1 > li.current ul").removeClass("hoverIntent");
		clearTimeout(hoverIntentTimer);
		hoverIntentTimer = "";
	});
	$("#topnav ul.nav2 > li:not(.nohover)").hover(function () {
		if (hoverIntentTimer === "") {
			hoverIntentTimer = setTimeout(function () {
				$("#topnav ul.nav1 > li.current ul").addClass("hoverIntent").find(".hovering").trigger("mouseenter");
			}, ($(".ie7, .ie8").size() === 0) ? 300 : 100);
		}
		$(this).addClass("hovering");
		if ($(this).parent().hasClass("hoverIntent")) {
			$(this).find("div.nav3container").css("display", "block");
			restoreLink($("> a", this));
		}
	}, function () {
		$(this).removeClass("hovering").find("div.nav3container").css("display", "none");
		removeLinks();
	});
	if (deviceIsAndroid) {
		$("#topnav ul.nav2 > li > a").click(function () {
			if ($(this).parent().find(".nav3container").is(":hidden")) {
				return false;
			}
		});
	}
}

function setupMenuOpenOnHover() {
	$("#topnav  ul.nav2").mousemove(function () {
		if ($(this).ismouseover() && !$(this).hasClass("hovering")) {
			$(this).trigger("mouseenter");
		}
	});
}

function setupBordersInNav3Container() {
	$(".nav3container").each(function () {
		$(".nav3border", this).height($(this).height() - 40);
	});
}

function addNoHoverLiToTopNav() {
	$("#topnav .nav2 > li:not(.menutop):last").after('<li class="nohover">&nbsp;&nbsp;</li>');
}

function removeLinks() {
	if (deviceIsIOS) {
		$("#topnav ul.nav2 > li > a").each(function () {
			$(this).attr("data-url", $(this).attr("href"));
			$(this).removeAttr("href");
		});
	}
}

function restoreLink(a) {
	if (deviceIsIOS && a.attr("data-url") !== "") {
		a.attr("href", a.attr("data-url"));
	}
}

function fixClearType() {
	var ua = navigator.userAgent;
	if (ua.search(/NT 5\.[12]]/i) > 0 && ua.search(/chrome/i) > 0) {
		document.getElementsByTagName("html")[0].className += " noCleartype";
	}
}
fixClearType();
(function ($) {
	jQuery.mlp = {
		x: 0,
		y: 0
	};
	$(document).mousemove(function (e) {
		jQuery.mlp = {
			x: e.pageX,
			y: e.pageY
		};
	});

	function notNans(value) {
		if (isNaN(value)) {
			return 0;
		} else {
			return value;
		}
	}
	$.fn.ismouseover = function () {
		var result = false;
		this.eq(0).each(function () {
			var offSet = $(this).offset();
			var w = Number($(this).width()) + notNans(Number($(this).css("padding-left").replace("px", ""))) + notNans(Number($(this).css("padding-right").replace("px", ""))) + notNans(Number($(this).css("border-right-width").replace("px", ""))) + notNans(Number($(this).css("border-left-width").replace("px", "")));
			var h = Number($(this).height()) + notNans(Number($(this).css("padding-top").replace("px", ""))) + notNans(Number($(this).css("padding-bottom").replace("px", ""))) + notNans(Number($(this).css("border-top-width").replace("px", ""))) + notNans(Number($(this).css("border-bottom-width").replace("px", "")));
			if (offSet.left < jQuery.mlp.x && offSet.left + w > jQuery.mlp.x && offSet.top < jQuery.mlp.y && offSet.top + h > jQuery.mlp.y) {
				result = true;
			}
		});
		return result;
	};
})(jQuery);

function expandSportsOnClick() {
	$(".matchgroup tr, .roundoverview tr, .dashboard tr, .scoreboardview tr, .scoreboard table, .navigationgroup li").livequery(function () {
		var foundElement = $(this).find("a");
		if (foundElement.length > 0) {
			$(this).css("cursor", "pointer").css("cursor", "hand");
			foundElement.css("text-decoration", "none");
			if (!foundElement.attr("target")) {
				$(this).click(function () {
					location.href = foundElement.attr("href");
				});
			}
		}
	});
}

function initSeasonViewSelectChange() {
	$("div.seasonoverview select").livequery("change", function () {
		var div = $(this).parent();
		var url = $(this).val();
		$.ajax({
			type: "GET",
			url: url,
			success: function (response) {
				div.html($(response).html());
			}
		});
	});
}
$(document).ready(function () {
	if (!$("body").hasClass("no_vrthead")) {
		services.configureSporzaHeader();
	}
	services.init();
	addNoHoverLiToTopNav();
	setupBordersInNav3Container();
	setupMenuOpenOnHover();
	setupMenuHoverDelay();
	try {
		SpotlightElement.init(".spotlight");
	} catch (e) {
		console.error("Failed to init spotlight", e.stack);
	}
	setupStoryLine(".storyline");
	try {
		MM_Carrousel.init();
	} catch (e) {
		console.error("Failed to init mediaMaster", e.stack);
	}
	try {
		setupTiles(".expats");
	} catch (e) {
		console.error("Failed to init expats elements", e.stack);
	}
	setupRoundOverviewInfoBoxes();
	setupProfilePointsInfoBoxes();
	setupCyclingJerseyInfoBoxes();
	try {
		initSeasonViewSelectChange();
	} catch (e) {
		console.error("Failed to init season overview elements", e.stack);
	}
	try {
		expandSportsOnClick();
	} catch (e) {
		console.error("Failed to expand click events", e.stack);
	}
	try {
		setupWidgetMedia(".widgetMedia");
	} catch (e) {
		console.error("Failed to setup widgetmedia", e.stack);
	}
	setupLargeEPGImages();
	try {
		setupExpandableTables();
	} catch (e) {
		console.error("Failed to init expandable tables", e.stack);
	}
	removeLinks();
	setLabel("vrtnieuws", "de redactie");
	setLabel("cobra", "cobra.be");
	try {
		setupMicroNavigation("#bottomlist ol");
	} catch (e) {
		console.error("Failed to setup micronavigation", e.stack);
	}
});
var GIGYA_API = "3_VtNb8oW77IQITt0zDUGO2c4KEbKJiK3Kt9g-TA7E5fgrYxAyfdIq-tG5SqmBCKQK";
var GIGYA_LANG = "nl";
var GIGYA_MEDIAID_LOGO_URL = "http://iam.vrt.be/MediaID.png";
var GIGYA_MD5_URL = "https://c.pebblemedia.be/js/md5.js";
var GIGYA_IDP_NAME = "media-id-prod";
var GIGYA_NEWSLETTER_CLASS = "gigya-screenset";
var GIGYA_FIELDS_TO_DISABLE = ["profile.email"];
var GIGYA_REQUIRED_FIELDS = [{
	screensetColl: "11SP_WEB_CONTEST",
	fieldName: "profile.firstName"
}];
var GIGYA_PROFILE_SCREEN_SET = "11SP_WEB_PROFILE";
var GIGYA_PROFILE_SCREEN_SET_MOBILE = "11SP_MOB_PROFILE";
var GIGYA_LOGIN_SCREEN_SET = "11SP_WEB_LOGIN";
var GIGYA_LOGIN_SCREEN_SET_MOBILE = "11SP_MOB_LOGIN";
var GIGYA_PROFILE_CONTAINER = "gigya-profile";
var GIGYA_IS_LOGGED = false;
var GIGYA_PROFILE = null;
var GIGYA_SELLIGENT_CREATE = "https://iam.vrt.be/selligent-integration/createUser.php";
//On document load.
$(document).ready(function () {
	loadGigya();
});
//Load Script
var loadGigya = function () {
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.async = true;
	s.src = "https://cdns.gigya.com/js/gigya.js?apiKey=" + GIGYA_API + "&lang=nl-be&services=socialize.share,accounts.screenset,socialize.shareCounts,socialize.simpleShare,socialize.reactions";
	document.getElementsByTagName('head')[0].appendChild(s);
	var m = document.createElement('script');
	m.type = 'text/javascript';
	m.async = true;
	m.src = GIGYA_MD5_URL;
	document.getElementsByTagName('head')[0].appendChild(m);
};
//Once the script is loaded, init all components
var onGigyaServiceReady = function (serviceName) {
	//event listener for login
	gigya.accounts.addEventHandlers({
		onLogin: handleLogin,
		onLogout: evalSession
	});
	evalSession();
	escapeScreenSet();
	$('#' + GIGYA_NEWSLETTER_CLASS).click(function (e) {
		e.preventDefault();
		showScreenSet();
	});
	$('.' + GIGYA_NEWSLETTER_CLASS).click(function (e) {
		e.preventDefault();
		showScreenSet();
	});
	$(window).bind('resize', function () {
		centerScreenSet();
	});
};
//check if active session exists
var evalSession = function () {
	var evalResponse = function (response) {
		if (response.errorCode == 0) {
			GIGYA_IS_LOGGED = true;
			GIGYA_PROFILE = response;
			trackBrands(response);
		} else {
			GIGYA_IS_LOGGED = false;
			GIGYA_PROFILE = null;
		}
		initProfile();
	};
	gigya.accounts.getAccountInfo({
		callback: evalResponse
	});
};
var handleLogin = function (loginEvent) {
	execPebbleMedia(loginEvent.profile);
	evalSession();
	trackBrands(loginEvent);
};
//login
var showLogin = function () {
	var loginParams = {
		screenSet: GIGYA_LOGIN_SCREEN_SET,
		mobileScreenSet: GIGYA_LOGIN_SCREEN_SET_MOBILE,
		startScreen: 'gigya-login-screen',
		onBeforeScreenLoad: createOverlay,
		onAfterScreenLoad: customValidation,
		onAfterSubmit: afterLoginShowProfile,
		onHide: removeOverlay
	};
	gigya.accounts.showScreenSet(loginParams);
};
//After the login event, check for new or registering users.
var afterLoginShowProfile = function (eventObj) {
	gigya.socialize.getUserInfo({
		callback: checkUserIsLoggedInAndShowProfile
	});
};
//Validate the user is logged in and not pending approval.
var checkUserIsLoggedInAndShowProfile = function (userObj) {
	if ((userObj != null) && (userObj.user.isLoggedIn != undefined) && (userObj.user.isLoggedIn == true)) {
		//Call the profile page after 300ms.
		setTimeout(function () {
			showProfile();
		}, 300);
		//Update the Selligent
		updateSelligent(userObj.user);
	}
};
//logout
var logOut = function () {
	gigya.accounts.logout();
};
//profile
var showProfile = function () {
	var profileParams = {
		screenSet: GIGYA_PROFILE_SCREEN_SET,
		mobileScreenSet: GIGYA_PROFILE_SCREEN_SET_MOBILE,
		onBeforeScreenLoad: createOverlay,
		onAfterScreenLoad: disableFields,
		onHide: removeOverlay
	};
	gigya.accounts.showScreenSet(profileParams);
};
//determine what screen-set to show
var showScreenSet = function () {
	if (GIGYA_IS_LOGGED) {
		showProfile();
	} else {
		showLogin();
	}
};
//hide screensets when the esc key is pressed
var escapeScreenSet = function () {
	$(document).bind("keyup", null, function (e) {
		if (e.which == 27) {
			var screenset = null;
			if (GIGYA_IS_LOGGED) {
				screenset = GIGYA_PROFILE_SCREEN_SET;
			} else {
				screenset = GIGYA_LOGIN_SCREEN_SET;
			}
			var params = {
				screenSet: screenset
			};
			gigya.accounts.hideScreenSet(params);
		}
	});
};
//Center modal window
var centerScreenSet = function () {
	if ($('.gigya-screen-dialog-content').is(":visible")) {
		var $gigyaDialog = $('.gigya-screen-dialog-inner');
		var screenw = $gigyaDialog.width();
		var screenh = $gigyaDialog.height();
		var windoww = $(window).width();
		var windowh = $(window).height();
		var left,
			top;
		left = windoww - screenw;
		top = windowh - screenh;
		left = left / 2;
		top = top / 2;
		if (top < 10) {
			top = 10;
		}
		if (left < 10) {
			left = 10;
		}
		$('.gigya-screen-dialog').css('position', 'absolute').css({
			'left': left + 'px',
			'top': top + 'px'
		});
	}
};
//add modal window overlay
var createOverlay = function () {
	var docHeight = $(document).height();
	$("body").append("<div id='gigya-overlay'></div>");
	$("#gigya-overlay")
		.height(docHeight)
		.css({
			'opacity': 0.4,
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'background-color': 'black',
			'width': '100%',
			'z-index': 5000
		});
	centerScreenSet();
};
//removed the modal window overlay
var removeOverlay = function () {
	$('#gigya-overlay').remove();
};
/**
 * This script checks if there is an active gigya session
 * if the session got started on a different site or inside a selligent iframe
 * If there is an active session, integrate pebble media's logic
 **/
//execPebbleMedia() inserts a script from pebblemedia
//to drop a cookie with the user's hashed email address
var execPebbleMedia = function (user) {
	// if (user.user) {
	//   user = user.user
	// }
	// var email = user.email;
	// var hashkey = md5(email); //md5() is a function from pebblemedia located in the md5.js
	// var script = document.createElement('script');
	// script.type = 'text/javascript';
	// script.src = 'http://cs.pebblemedia.be/js/hk.php?h=' + hashkey.toUpperCase();
	// $("body").append(script);
};
//Add the brand to the users schema.
var trackBrands = function (loginObject) {
	var hasBrand = false;
	var brandName = checkBrandFromURL();
	if ((loginObject.data[brandName] != undefined) || (loginObject.data[brandName] != null)) {
		hasBrand = loginObject.data[brandName];
	}
	if (hasBrand != true) {
		var strIn = '{ "data": {"' + brandName + '": true } }';
		var jsonObj = JSON.parse(strIn);
		gigya.accounts.setAccountInfo(jsonObj);
	}
};
//Check the brand based on the URL
var checkBrandFromURL = function () {
	var strURL = document.location.href;
	if (strURL.indexOf('deredactie') > -1) {
		return 'vrtnieuws';
	}
	if (strURL.indexOf('radio2') > -1) {
		return 'radio2';
	}
	if (strURL.indexOf('sporza') > -1) {
		return 'sporza';
	}
	if (strURL.indexOf('cobra') > -1) {
		return 'cobra';
	}
	if (strURL.indexOf('een') > -1) {
		return 'een';
	}
	//catch all...
	return 'vrtnieuws'
};
//Custom form validation
var customValidation = function (screenObject) {
	disableFields(screenObject);
	//Update the Selligent
	if (screenObject.response.UID != undefined) {
		updateSelligent(screenObject.response);
	}
	var currentScreen = screenObject.currentScreen;
	var currentScreenSetName = getScreenSetName();
	for (var i = 0; i < GIGYA_REQUIRED_FIELDS.length; i++) {
		if (GIGYA_REQUIRED_FIELDS[i]['screensetColl'] == currentScreenSetName) {
			var name = GIGYA_REQUIRED_FIELDS[i]['fieldName'];
			var element = $("#" + currentScreen + " [data-gigya-name='" + name + "']")[0];
			$('label[data-bound-to="' + name + '"]').removeClass('gigya-hidden');
		}
	}
};
//Handle the before post of the screen set, check for valid values
var customValidationPost = function (screenObject) {
	disableFields(screenObject);
	var currentScreen = screenObject.currentScreen;
	var currentScreenSetName = getScreenSetName();
	for (var i = 0; i < GIGYA_REQUIRED_FIELDS.length; i++) {
		if (GIGYA_REQUIRED_FIELDS[i]['screensetColl'] == currentScreenSetName) {
			var name = GIGYA_REQUIRED_FIELDS[i]['fieldName'];
			var element = $("#" + currentScreen + " [data-gigya-name='" + name + "']")[0];
			if ($(element).val() == "") {
				var displayName = 'Veld is vereist.';
				$('span[data-bound-to="' + name + '"]').html(displayName);
				return false;
			}
		}
	}
};
//Get the screenset name but the outer ID.
var getScreenSetName = function () {
	return $('.gigya-screen-set').attr('id');
};
//profile
var initProfile = function () {
	if ($('#' + GIGYA_PROFILE_CONTAINER).length) {
		if (GIGYA_IS_LOGGED) {
			var profileParams = {
				screenSet: GIGYA_PROFILE_SCREEN_SET,
				mobileScreenSet: GIGYA_PROFILE_SCREEN_SET_MOBILE,
				containerID: GIGYA_PROFILE_CONTAINER,
				onAfterScreenLoad: customValidation
			};
			gigya.accounts.showScreenSet(profileParams);
		} else {
			var loginParams = {
				screenSet: GIGYA_LOGIN_SCREEN_SET,
				mobileScreenSet: GIGYA_LOGIN_SCREEN_SET_MOBILE,
				containerID: GIGYA_PROFILE_CONTAINER,
				onAfterScreenLoad: customValidation
			};
			gigya.accounts.showScreenSet(loginParams);
		}
	}
};
//Update Selligent with the user data after registration
var updateSelligent = function (profile) {
	// sendConsoleLog();
	// var request = $.ajax({
	//   url: GIGYA_SELLIGENT_CREATE,
	//   type: "POST",
	//   data: profile,
	//   contentType: "application/json; charset=utf-8",
	//   dataType: "json",
	//   error: function (json) {
	//     console.log(json);
	//   },
	//   success: function (json, textStatus, jqXHR) {
	//     console.log("Updated Selligent");
	//   }
	// });
};
//Create a console object for logging when not open.
var sendConsoleLog = function (logText) {
	if (typeof console == "undefined") {
		window.console = {
			log: function () {}
		};
	}
};
// postcode picker switch logic
var currentZip = "";
var currentCountry = 'BE';
var zipChange = function (screen) {
	try {
		if (currentZip.length == 0) {
			currentZip = GIGYA_PROFILE.profile.zip;
		}
	} catch (err) {
		currentZip = "";
		currentCountry = 'BE';
	}
	try {
		currentCountry = GIGYA_PROFILE.profile.country;
	} catch (err) {}
	// append Zip text box for other countries
	if ($("#" + screen + " input[id='profile.zipText']").length == 0) {
		$("#" + screen + " select[name='profile.zip']").after('<input id="profile.zipText" tabindex="0" class="gigya-input-text" value="' + currentZip + '" style="display:none;">');
	}
	// swap display of Zip field based on country
	$("#" + screen + " [name='profile.country']").change(function () {
		var isBE = $(this).val() == 'BE';
		$("#" + screen + " select[name='profile.zip']").toggle(isBE);
		$("#" + screen + " input[id='profile.zipText']").toggle(!isBE);
		// clear down free text on switch of country
		if ($("#" + screen + " input[id='profile.zipText']").not(':visible')) {
			if (currentZip.length == 0 || (currentZip.length > 0 && currentZip != $("#" + screen + " [id='profile.zipText']").val())) {
				currentZip = "";
				$("#" + screen + " [id='profile.zipText']").val('');
				$("#" + screen + " select[name='profile.zip'] > option:contains('**')").remove();
			} else if (currentCountry != $("#" + screen + " [name='profile.country']").val()) {
				$("#" + screen + " [id='profile.zipText']").val(currentZip);
				$("#" + screen + " select[name='profile.zip'] > option:contains('**')").remove();
			} else if (currentCountry == $("#" + screen + " [name='profile.country']").val() && $("#" + screen + " [id='profile.zipText']").val().length > 0) {
				if ($("#" + screen + " select[name='profile.zip'] option[value='" + currentZip + "']").length == 0) {
					$("#" + screen + " select[name='profile.zip'] > option:contains('**')").remove();
					$("#" + screen + " select[name='profile.zip']").append('<option value="' + $("#" + screen + " [id='profile.zipText']").val() + '" selected="selected">**</option>');
				}
			}
		}
	}).change();
	// swap display of Zip field based on country
	$("#" + screen + " [id='profile.zipText']").change(function () {
		currentZip = $("#" + screen + " [id='profile.zipText']").val();
		$("#" + screen + " select[name='profile.zip'] > option:contains('**')").remove();
		if ($("#" + screen + " select[name='profile.zip'] option[value='" + $("#" + screen + " [id='profile.zipText']").val() + "']").length == 0 && $("#" + screen + " [id='profile.zipText']").val().length > 0) {
			$("#" + screen + " select[name='profile.zip']").append('<option value="' + $("#" + screen + " [id='profile.zipText']").val() + '" selected="selected">**</option>');
		}
	}).change();
};
//Populate the city based on the ZIP code
var populateCity = function (screen) {
	var elementZip = $("#" + screen + " select[name='profile.zip']");
	//Once we have the postal code element, lets add an onChange event listener
	$(elementZip).change(function () {
		var elementCity = $("#" + screen + " input[name='profile.city']");
		var elementDropdown = $("#citySelect");
		//This is the postal code the user selected
		var value = elementZip[0].value;
		//Let's now get the index the postal code selected relates to
		var resultsArr = functiontofindIndexByKeyValue(getZipToPostCodeArray(), "value", value);
		//Based on the results, allow the selection of city
		if (resultsArr.length == 1) {
			elementCity.val(resultsArr[0]["label"]);
			elementDropdown.hide();
			elementCity.show();
		}
		if (resultsArr.length > 1) {
			if (elementDropdown.length > 0) {
				elementDropdown.show();
				elementDropdown.empty();
				elementCity.hide();
			} else {
				elementCity.after('<select id="citySelect" class="gigya-input-text"></select>');
				elementCity.hide();
				elementDropdown = $("#citySelect");
			}
			for (var i = 0; i < resultsArr.length; i++) {
				elementDropdown.append("<option value=\"" + resultsArr[i]['label'] + "\" >" + resultsArr[i]['label'] + "</option>");
			}
			elementDropdown.change(function () {
				$("#" + screen + " input[name='profile.city']").val($('#citySelect').find(":selected").text());
			});
		}
		if (resultsArr.length < 1) {
			elementDropdown.hide();
			elementCity.show();
			elementCity.val("");
		}
	});
};
// This function allows us to iterate through an associative array to get the index
// of a member of the object that matches the criteria
var functiontofindIndexByKeyValue = function (arraytosearch, key, valuetosearch) {
	var resultsArr = [];
	for (var i = 0; i < arraytosearch.length; i++) {
		if (arraytosearch[i][key] == valuetosearch) {
			resultsArr.push(arraytosearch[i]);
		}
	}
	return resultsArr;
};
var disableFields = function (screenObject) {
	var currentScreen = screenObject.currentScreen;
	//Handle non BE ZIP codes
	zipChange(currentScreen);
	//Handle city population
	populateCity(currentScreen);
	for (var i = 0; i < GIGYA_FIELDS_TO_DISABLE.length; i++) {
		var name = GIGYA_FIELDS_TO_DISABLE[i];
		var element = $("#" + currentScreen + " [data-gigya-name='" + name + "']")[0];
		if ($(element).val().length > 0) {
			$(element).attr("disabled", "disabled");
		}
	}
};
//Return the array of postcode to city locations
var getZipToPostCodeArray = function () {
	return [
		{
			value: "1000",
			label: "Brussel"
		},
		{
			value: "1020",
			label: "Laken (Bru.)"
		},
		{
			value: "1030",
			label: "Schaarbeek"
		},
		{
			value: "1040",
			label: "Etterbeek"
		},
		{
			value: "1050",
			label: "Elsene"
		},
		{
			value: "1060",
			label: "Sint-Gillis"
		},
		{
			value: "1070",
			label: "Anderlecht"
		},
		{
			value: "1080",
			label: "Sint-Jans-Molenbeek"
		},
		{
			value: "1081",
			label: "Koekelberg"
		},
		{
			value: "1082",
			label: "Sint-Agatha-Berchem"
		},
		{
			value: "1083",
			label: "Ganshoren"
		},
		{
			value: "1090",
			label: "Jette"
		},
		{
			value: "1120",
			label: "Neder-over-Heembeek (Bru.)"
		},
		{
			value: "1130",
			label: "Haren (Bru.)"
		},
		{
			value: "1140",
			label: "Evere"
		},
		{
			value: "1150",
			label: "Sint-Pieters-Woluwe"
		},
		{
			value: "1160",
			label: "Oudergem"
		},
		{
			value: "1170",
			label: "Watermaal-Bosvoorde"
		},
		{
			value: "1180",
			label: "Ukkel"
		},
		{
			value: "1190",
			label: "Vorst"
		},
		{
			value: "1200",
			label: "Sint-Lambrechts-Woluwe"
		},
		{
			value: "1210",
			label: "Sint-Joost-ten-Node"
		},
		{
			value: "1300",
			label: "Limal"
		},
		{
			value: "1300",
			label: "Wavre"
		},
		{
			value: "1301",
			label: "Bierges"
		},
		{
			value: "1310",
			label: "La Hulpe"
		},
		{
			value: "1315",
			label: "Glimes"
		},
		{
			value: "1315",
			label: "Incourt"
		},
		{
			value: "1315",
			label: "Opprebais"
		},
		{
			value: "1315",
			label: "Piétrebais"
		},
		{
			value: "1315",
			label: "Roux-Miroir"
		},
		{
			value: "1320",
			label: "Beauvechain"
		},
		{
			value: "1320",
			label: "Hamme-Mille"
		},
		{
			value: "1320",
			label: "l'Ecluse"
		},
		{
			value: "1320",
			label: "Nodebais"
		},
		{
			value: "1320",
			label: "Tourinnes-la-Grosse"
		},
		{
			value: "1325",
			label: "Bonlez"
		},
		{
			value: "1325",
			label: "Chaumont-Gistoux"
		},
		{
			value: "1325",
			label: "Corroy-le-Grand"
		},
		{
			value: "1325",
			label: "Dion-Valmont"
		},
		{
			value: "1325",
			label: "Longueville"
		},
		{
			value: "1330",
			label: "Rixensart"
		},
		{
			value: "1331",
			label: "Rosières"
		},
		{
			value: "1332",
			label: "Genval"
		},
		{
			value: "1340",
			label: "Ottignies"
		},
		{
			value: "1340",
			label: "Ottignies-Louvain-la-Neuve"
		},
		{
			value: "1341",
			label: "Céroux-Mousty"
		},
		{
			value: "1342",
			label: "Limelette"
		},
		{
			value: "1348",
			label: "Louvain-la-Neuve"
		},
		{
			value: "1350",
			label: "Enines"
		},
		{
			value: "1350",
			label: "Folx-les-Caves"
		},
		{
			value: "1350",
			label: "Jandrain-Jandrenouille"
		},
		{
			value: "1350",
			label: "Jauche"
		},
		{
			value: "1350",
			label: "Marilles"
		},
		{
			value: "1350",
			label: "Noduwez"
		},
		{
			value: "1350",
			label: "Orp-Jauche"
		},
		{
			value: "1350",
			label: "Orp-le-Grand"
		},
		{
			value: "1357",
			label: "Hélécine"
		},
		{
			value: "1357",
			label: "Linsmeau"
		},
		{
			value: "1357",
			label: "Neerheylissem"
		},
		{
			value: "1357",
			label: "Opheylissem"
		},
		{
			value: "1360",
			label: "Malèves-Sainte-Marie-Wastines"
		},
		{
			value: "1360",
			label: "Orbais"
		},
		{
			value: "1360",
			label: "Perwez"
		},
		{
			value: "1360",
			label: "Thorembais-les-Béguines"
		},
		{
			value: "1360",
			label: "Thorembais-Saint-Trond"
		},
		{
			value: "1367",
			label: "Autre-Eglise"
		},
		{
			value: "1367",
			label: "Bomal (Br.W.)"
		},
		{
			value: "1367",
			label: "Geest-Gérompont-Petit-Rosière"
		},
		{
			value: "1367",
			label: "Gérompont"
		},
		{
			value: "1367",
			label: "Grand-Rosière-Hottomont"
		},
		{
			value: "1367",
			label: "Huppaye"
		},
		{
			value: "1367",
			label: "Mont-Saint-André"
		},
		{
			value: "1367",
			label: "Ramillies-Offus"
		},
		{
			value: "1370",
			label: "Dongelberg"
		},
		{
			value: "1370",
			label: "Jauchelette"
		},
		{
			value: "1370",
			label: "Jodoigne"
		},
		{
			value: "1370",
			label: "Jodoigne-Souveraine"
		},
		{
			value: "1370",
			label: "Lathuy"
		},
		{
			value: "1370",
			label: "Mélin"
		},
		{
			value: "1370",
			label: "Piétrain"
		},
		{
			value: "1370",
			label: "Saint-Jean-Geest"
		},
		{
			value: "1370",
			label: "Saint-Remy-Geest"
		},
		{
			value: "1370",
			label: "Zétrud-Lumay"
		},
		{
			value: "1380",
			label: "Couture-Saint-Germain"
		},
		{
			value: "1380",
			label: "Lasne"
		},
		{
			value: "1380",
			label: "Lasne-Chapelle-Saint-Lambert"
		},
		{
			value: "1380",
			label: "Maransart"
		},
		{
			value: "1380",
			label: "Ohain"
		},
		{
			value: "1380",
			label: "Plancenoit"
		},
		{
			value: "1390",
			label: "Archennes"
		},
		{
			value: "1390",
			label: "Biez"
		},
		{
			value: "1390",
			label: "Bossut-Gottechain"
		},
		{
			value: "1390",
			label: "Grez-Doiceau"
		},
		{
			value: "1390",
			label: "Nethen"
		},
		{
			value: "1400",
			label: "Monstreux"
		},
		{
			value: "1400",
			label: "Nivelles"
		},
		{
			value: "1401",
			label: "Baulers"
		},
		{
			value: "1402",
			label: "Thines"
		},
		{
			value: "1404",
			label: "Bornival"
		},
		{
			value: "1410",
			label: "Waterloo"
		},
		{
			value: "1420",
			label: "Braine-l'Alleud"
		},
		{
			value: "1421",
			label: "Ophain-Bois-Seigneur-Isaac"
		},
		{
			value: "1428",
			label: "Lillois-Witterzée"
		},
		{
			value: "1430",
			label: "Bierghes"
		},
		{
			value: "1430",
			label: "Quenast"
		},
		{
			value: "1430",
			label: "Rebecq"
		},
		{
			value: "1430",
			label: "Rebecq-Rognon"
		},
		{
			value: "1435",
			label: "Corbais"
		},
		{
			value: "1435",
			label: "Hévillers"
		},
		{
			value: "1435",
			label: "Mont-Saint-Guibert"
		},
		{
			value: "1440",
			label: "Braine-le-Château"
		},
		{
			value: "1440",
			label: "Wauthier-Braine"
		},
		{
			value: "1450",
			label: "Chastre"
		},
		{
			value: "1450",
			label: "Chastre-Villeroux-Blanmont"
		},
		{
			value: "1450",
			label: "Cortil-Noirmont"
		},
		{
			value: "1450",
			label: "Gentinnes"
		},
		{
			value: "1450",
			label: "Saint-Géry"
		},
		{
			value: "1457",
			label: "Nil-Saint-Vincent-Saint-Martin"
		},
		{
			value: "1457",
			label: "Tourinnes-Saint-Lambert"
		},
		{
			value: "1457",
			label: "Walhain"
		},
		{
			value: "1457",
			label: "Walhain-Saint-Paul"
		},
		{
			value: "1460",
			label: "Ittre"
		},
		{
			value: "1460",
			label: "Virginal-Samme"
		},
		{
			value: "1461",
			label: "Haut-Ittre"
		},
		{
			value: "1470",
			label: "Baisy-Thy"
		},
		{
			value: "1470",
			label: "Bousval"
		},
		{
			value: "1470",
			label: "Genappe"
		},
		{
			value: "1471",
			label: "Loupoigne"
		},
		{
			value: "1472",
			label: "Vieux-Genappe"
		},
		{
			value: "1473",
			label: "Glabais"
		},
		{
			value: "1474",
			label: "Ways"
		},
		{
			value: "1476",
			label: "Houtain-le-Val"
		},
		{
			value: "1480",
			label: "Clabecq"
		},
		{
			value: "1480",
			label: "Oisquercq"
		},
		{
			value: "1480",
			label: "Saintes"
		},
		{
			value: "1480",
			label: "Tubize"
		},
		{
			value: "1490",
			label: "Court-Saint-Etienne"
		},
		{
			value: "1495",
			label: "Marbais (Br.W.)"
		},
		{
			value: "1495",
			label: "Mellery"
		},
		{
			value: "1495",
			label: "Sart-Dames-Avelines"
		},
		{
			value: "1495",
			label: "Tilly"
		},
		{
			value: "1495",
			label: "Villers-la-Ville"
		},
		{
			value: "1500",
			label: "Halle"
		},
		{
			value: "1501",
			label: "Buizingen"
		},
		{
			value: "1502",
			label: "Lembeek"
		},
		{
			value: "1540",
			label: "Herfelingen"
		},
		{
			value: "1540",
			label: "Herne"
		},
		{
			value: "1541",
			label: "Sint-Pieters-Kapelle (Vl.Br.)"
		},
		{
			value: "1547",
			label: "Bever/Biévène"
		},
		{
			value: "1560",
			label: "Hoeilaart"
		},
		{
			value: "1570",
			label: "Galmaarden"
		},
		{
			value: "1570",
			label: "Tollembeek"
		},
		{
			value: "1570",
			label: "Vollezele"
		},
		{
			value: "1600",
			label: "Oudenaken"
		},
		{
			value: "1600",
			label: "Sint-Laureins-Berchem"
		},
		{
			value: "1600",
			label: "Sint-Pieters-Leeuw"
		},
		{
			value: "1601",
			label: "Ruisbroek (Vl.Br.)"
		},
		{
			value: "1602",
			label: "Vlezenbeek"
		},
		{
			value: "1620",
			label: "Drogenbos"
		},
		{
			value: "1630",
			label: "Linkebeek"
		},
		{
			value: "1640",
			label: "Sint-Genesius-Rode/Rhode-Saint-Genèse"
		},
		{
			value: "1650",
			label: "Beersel"
		},
		{
			value: "1651",
			label: "Lot"
		},
		{
			value: "1652",
			label: "Alsemberg"
		},
		{
			value: "1653",
			label: "Dworp"
		},
		{
			value: "1654",
			label: "Huizingen"
		},
		{
			value: "1670",
			label: "Bogaarden"
		},
		{
			value: "1670",
			label: "Heikruis"
		},
		{
			value: "1670",
			label: "Pepingen"
		},
		{
			value: "1671",
			label: "Elingen"
		},
		{
			value: "1673",
			label: "Beert"
		},
		{
			value: "1674",
			label: "Bellingen"
		},
		{
			value: "1700",
			label: "Dilbeek"
		},
		{
			value: "1700",
			label: "Sint-Martens-Bodegem"
		},
		{
			value: "1700",
			label: "Sint-Ulriks-Kapelle"
		},
		{
			value: "1701",
			label: "Itterbeek"
		},
		{
			value: "1702",
			label: "Groot-Bijgaarden"
		},
		{
			value: "1703",
			label: "Schepdaal"
		},
		{
			value: "1730",
			label: "Asse"
		},
		{
			value: "1730",
			label: "Bekkerzeel"
		},
		{
			value: "1730",
			label: "Kobbegem"
		},
		{
			value: "1730",
			label: "Mollem"
		},
		{
			value: "1731",
			label: "Relegem"
		},
		{
			value: "1731",
			label: "Zellik"
		},
		{
			value: "1740",
			label: "Ternat"
		},
		{
			value: "1741",
			label: "Wambeek"
		},
		{
			value: "1742",
			label: "Sint-Katherina-Lombeek"
		},
		{
			value: "1745",
			label: "Mazenzele"
		},
		{
			value: "1745",
			label: "Opwijk"
		},
		{
			value: "1750",
			label: "Gaasbeek"
		},
		{
			value: "1750",
			label: "Lennik"
		},
		{
			value: "1750",
			label: "Sint-Kwintens-Lennik"
		},
		{
			value: "1750",
			label: "Sint-Martens-Lennik"
		},
		{
			value: "1755",
			label: "Gooik"
		},
		{
			value: "1755",
			label: "Kester"
		},
		{
			value: "1755",
			label: "Leerbeek"
		},
		{
			value: "1755",
			label: "Oetingen"
		},
		{
			value: "1760",
			label: "Onze-Lieve-Vrouw-Lombeek"
		},
		{
			value: "1760",
			label: "Pamel"
		},
		{
			value: "1760",
			label: "Roosdaal"
		},
		{
			value: "1760",
			label: "Strijtem"
		},
		{
			value: "1761",
			label: "Borchtlombeek"
		},
		{
			value: "1770",
			label: "Liedekerke"
		},
		{
			value: "1780",
			label: "Wemmel"
		},
		{
			value: "1785",
			label: "Brussegem"
		},
		{
			value: "1785",
			label: "Hamme (Vl.Br.)"
		},
		{
			value: "1785",
			label: "Merchtem"
		},
		{
			value: "1790",
			label: "Affligem"
		},
		{
			value: "1790",
			label: "Essene"
		},
		{
			value: "1790",
			label: "Hekelgem"
		},
		{
			value: "1790",
			label: "Teralfene"
		},
		{
			value: "1800",
			label: "Peutie"
		},
		{
			value: "1800",
			label: "Vilvoorde"
		},
		{
			value: "1820",
			label: "Melsbroek"
		},
		{
			value: "1820",
			label: "Perk"
		},
		{
			value: "1820",
			label: "Steenokkerzeel"
		},
		{
			value: "1830",
			label: "Machelen (Vl.Br.)"
		},
		{
			value: "1831",
			label: "Diegem"
		},
		{
			value: "1840",
			label: "Londerzeel"
		},
		{
			value: "1840",
			label: "Malderen"
		},
		{
			value: "1840",
			label: "Steenhuffel"
		},
		{
			value: "1850",
			label: "Grimbergen"
		},
		{
			value: "1851",
			label: "Humbeek"
		},
		{
			value: "1852",
			label: "Beigem"
		},
		{
			value: "1853",
			label: "Strombeek-Bever"
		},
		{
			value: "1860",
			label: "Meise"
		},
		{
			value: "1861",
			label: "Wolvertem"
		},
		{
			value: "1880",
			label: "Kapelle-op-den-Bos"
		},
		{
			value: "1880",
			label: "Nieuwenrode"
		},
		{
			value: "1880",
			label: "Ramsdonk"
		},
		{
			value: "1910",
			label: "Berg (Vl.Br.)"
		},
		{
			value: "1910",
			label: "Buken"
		},
		{
			value: "1910",
			label: "Kampenhout"
		},
		{
			value: "1910",
			label: "Nederokkerzeel"
		},
		{
			value: "1930",
			label: "Nossegem"
		},
		{
			value: "1930",
			label: "Zaventem"
		},
		{
			value: "1932",
			label: "Sint-Stevens-Woluwe"
		},
		{
			value: "1933",
			label: "Sterrebeek"
		},
		{
			value: "1950",
			label: "Kraainem"
		},
		{
			value: "1970",
			label: "Wezembeek-Oppem"
		},
		{
			value: "1980",
			label: "Eppegem"
		},
		{
			value: "1980",
			label: "Zemst"
		},
		{
			value: "1981",
			label: "Hofstade (Vl.Br.)"
		},
		{
			value: "1982",
			label: "Elewijt"
		},
		{
			value: "1982",
			label: "Weerde"
		},
		{
			value: "2000",
			label: "Antwerpen"
		},
		{
			value: "2018",
			label: "Antwerpen"
		},
		{
			value: "2020",
			label: "Antwerpen"
		},
		{
			value: "2030",
			label: "Antwerpen"
		},
		{
			value: "2040",
			label: "Antwerpen"
		},
		{
			value: "2040",
			label: "Berendrecht"
		},
		{
			value: "2040",
			label: "Lillo"
		},
		{
			value: "2040",
			label: "Zandvliet"
		},
		{
			value: "2050",
			label: "Antwerpen"
		},
		{
			value: "2060",
			label: "Antwerpen"
		},
		{
			value: "2070",
			label: "Burcht"
		},
		{
			value: "2070",
			label: "Zwijndrecht"
		},
		{
			value: "2100",
			label: "Deurne"
		},
		{
			value: "2110",
			label: "Wijnegem"
		},
		{
			value: "2140",
			label: "Borgerhout"
		},
		{
			value: "2150",
			label: "Borsbeek (Antw.)"
		},
		{
			value: "2160",
			label: "Wommelgem"
		},
		{
			value: "2170",
			label: "Merksem"
		},
		{
			value: "2180",
			label: "Ekeren"
		},
		{
			value: "2200",
			label: "Herentals"
		},
		{
			value: "2200",
			label: "Morkhoven"
		},
		{
			value: "2200",
			label: "Noorderwijk"
		},
		{
			value: "2220",
			label: "Hallaar"
		},
		{
			value: "2220",
			label: "Heist-op-den-Berg"
		},
		{
			value: "2221",
			label: "Booischot"
		},
		{
			value: "2222",
			label: "Itegem"
		},
		{
			value: "2222",
			label: "Wiekevorst"
		},
		{
			value: "2223",
			label: "Schriek"
		},
		{
			value: "2230",
			label: "Herselt"
		},
		{
			value: "2230",
			label: "Ramsel"
		},
		{
			value: "2235",
			label: "Houtvenne"
		},
		{
			value: "2235",
			label: "Hulshout"
		},
		{
			value: "2235",
			label: "Westmeerbeek"
		},
		{
			value: "2240",
			label: "Massenhoven"
		},
		{
			value: "2240",
			label: "Viersel"
		},
		{
			value: "2240",
			label: "Zandhoven"
		},
		{
			value: "2242",
			label: "Pulderbos"
		},
		{
			value: "2243",
			label: "Pulle"
		},
		{
			value: "2250",
			label: "Olen"
		},
		{
			value: "2260",
			label: "Oevel"
		},
		{
			value: "2260",
			label: "Tongerlo (Antw.)"
		},
		{
			value: "2260",
			label: "Westerlo"
		},
		{
			value: "2260",
			label: "Zoerle-Parwijs"
		},
		{
			value: "2270",
			label: "Herenthout"
		},
		{
			value: "2275",
			label: "Gierle"
		},
		{
			value: "2275",
			label: "Lille"
		},
		{
			value: "2275",
			label: "Poederlee"
		},
		{
			value: "2275",
			label: "Wechelderzande"
		},
		{
			value: "2280",
			label: "Grobbendonk"
		},
		{
			value: "2288",
			label: "Bouwel"
		},
		{
			value: "2290",
			label: "Vorselaar"
		},
		{
			value: "2300",
			label: "Turnhout"
		},
		{
			value: "2310",
			label: "Rijkevorsel"
		},
		{
			value: "2320",
			label: "Hoogstraten"
		},
		{
			value: "2321",
			label: "Meer"
		},
		{
			value: "2322",
			label: "Minderhout"
		},
		{
			value: "2323",
			label: "Wortel"
		},
		{
			value: "2328",
			label: "Meerle"
		},
		{
			value: "2330",
			label: "Merksplas"
		},
		{
			value: "2340",
			label: "Beerse"
		},
		{
			value: "2340",
			label: "Vlimmeren"
		},
		{
			value: "2350",
			label: "Vosselaar"
		},
		{
			value: "2360",
			label: "Oud-Turnhout"
		},
		{
			value: "2370",
			label: "Arendonk"
		},
		{
			value: "2380",
			label: "Ravels"
		},
		{
			value: "2381",
			label: "Weelde"
		},
		{
			value: "2382",
			label: "Poppel"
		},
		{
			value: "2387",
			label: "Baarle-Hertog"
		},
		{
			value: "2390",
			label: "Malle"
		},
		{
			value: "2390",
			label: "Oostmalle"
		},
		{
			value: "2390",
			label: "Westmalle"
		},
		{
			value: "2400",
			label: "Mol"
		},
		{
			value: "2430",
			label: "Eindhout"
		},
		{
			value: "2430",
			label: "Laakdal"
		},
		{
			value: "2430",
			label: "Vorst (Kempen)"
		},
		{
			value: "2431",
			label: "Varendonk"
		},
		{
			value: "2431",
			label: "Veerle"
		},
		{
			value: "2440",
			label: "Geel"
		},
		{
			value: "2450",
			label: "Meerhout"
		},
		{
			value: "2460",
			label: "Kasterlee"
		},
		{
			value: "2460",
			label: "Lichtaart"
		},
		{
			value: "2460",
			label: "Tielen"
		},
		{
			value: "2470",
			label: "Retie"
		},
		{
			value: "2480",
			label: "Dessel"
		},
		{
			value: "2490",
			label: "Balen"
		},
		{
			value: "2491",
			label: "Olmen"
		},
		{
			value: "2500",
			label: "Koningshooikt"
		},
		{
			value: "2500",
			label: "Lier"
		},
		{
			value: "2520",
			label: "Broechem"
		},
		{
			value: "2520",
			label: "Emblem"
		},
		{
			value: "2520",
			label: "Oelegem"
		},
		{
			value: "2520",
			label: "Ranst"
		},
		{
			value: "2530",
			label: "Boechout"
		},
		{
			value: "2531",
			label: "Vremde"
		},
		{
			value: "2540",
			label: "Hove"
		},
		{
			value: "2547",
			label: "Lint"
		},
		{
			value: "2550",
			label: "Kontich"
		},
		{
			value: "2550",
			label: "Waarloos"
		},
		{
			value: "2560",
			label: "Bevel"
		},
		{
			value: "2560",
			label: "Kessel"
		},
		{
			value: "2560",
			label: "Nijlen"
		},
		{
			value: "2570",
			label: "Duffel"
		},
		{
			value: "2580",
			label: "Beerzel"
		},
		{
			value: "2580",
			label: "Putte"
		},
		{
			value: "2590",
			label: "Berlaar"
		},
		{
			value: "2590",
			label: "Gestel"
		},
		{
			value: "2600",
			label: "Berchem"
		},
		{
			value: "2610",
			label: "Wilrijk"
		},
		{
			value: "2620",
			label: "Hemiksem"
		},
		{
			value: "2627",
			label: "Schelle"
		},
		{
			value: "2630",
			label: "Aartselaar"
		},
		{
			value: "2640",
			label: "Mortsel"
		},
		{
			value: "2650",
			label: "Edegem"
		},
		{
			value: "2660",
			label: "Hoboken"
		},
		{
			value: "2800",
			label: "Mechelen"
		},
		{
			value: "2800",
			label: "Walem"
		},
		{
			value: "2801",
			label: "Heffen"
		},
		{
			value: "2811",
			label: "Hombeek"
		},
		{
			value: "2811",
			label: "Leest"
		},
		{
			value: "2812",
			label: "Muizen (Mechelen)"
		},
		{
			value: "2820",
			label: "Bonheiden"
		},
		{
			value: "2820",
			label: "Rijmenam"
		},
		{
			value: "2830",
			label: "Blaasveld"
		},
		{
			value: "2830",
			label: "Heindonk"
		},
		{
			value: "2830",
			label: "Tisselt"
		},
		{
			value: "2830",
			label: "Willebroek"
		},
		{
			value: "2840",
			label: "Reet"
		},
		{
			value: "2840",
			label: "Rumst"
		},
		{
			value: "2840",
			label: "Terhagen"
		},
		{
			value: "2845",
			label: "Niel"
		},
		{
			value: "2850",
			label: "Boom"
		},
		{
			value: "2860",
			label: "Sint-Katelijne-Waver"
		},
		{
			value: "2861",
			label: "Onze-Lieve-Vrouw-Waver"
		},
		{
			value: "2870",
			label: "Breendonk"
		},
		{
			value: "2870",
			label: "Liezele"
		},
		{
			value: "2870",
			label: "Puurs"
		},
		{
			value: "2870",
			label: "Ruisbroek (Antw.)"
		},
		{
			value: "2880",
			label: "Bornem"
		},
		{
			value: "2880",
			label: "Hingene"
		},
		{
			value: "2880",
			label: "Mariekerke (Bornem)"
		},
		{
			value: "2880",
			label: "Weert"
		},
		{
			value: "2890",
			label: "Lippelo"
		},
		{
			value: "2890",
			label: "Oppuurs"
		},
		{
			value: "2890",
			label: "Sint-Amands"
		},
		{
			value: "2900",
			label: "Schoten"
		},
		{
			value: "2910",
			label: "Essen"
		},
		{
			value: "2920",
			label: "Kalmthout"
		},
		{
			value: "2930",
			label: "Brasschaat"
		},
		{
			value: "2940",
			label: "Hoevenen"
		},
		{
			value: "2940",
			label: "Stabroek"
		},
		{
			value: "2950",
			label: "Kapellen (Antw.)"
		},
		{
			value: "2960",
			label: "Brecht"
		},
		{
			value: "2960",
			label: "Sint-Job-in-'t-Goor"
		},
		{
			value: "2960",
			label: "Sint-Lenaarts"
		},
		{
			value: "2970",
			label: "'s Gravenwezel"
		},
		{
			value: "2970",
			label: "Schilde"
		},
		{
			value: "2980",
			label: "Halle (Kempen)"
		},
		{
			value: "2980",
			label: "Zoersel"
		},
		{
			value: "2990",
			label: "Loenhout"
		},
		{
			value: "2990",
			label: "Wuustwezel"
		},
		{
			value: "3000",
			label: "Leuven"
		},
		{
			value: "3001",
			label: "Heverlee"
		},
		{
			value: "3010",
			label: "Kessel-Lo"
		},
		{
			value: "3012",
			label: "Wilsele"
		},
		{
			value: "3018",
			label: "Wijgmaal (Vl.Br.)"
		},
		{
			value: "3020",
			label: "Herent"
		},
		{
			value: "3020",
			label: "Veltem-Beisem"
		},
		{
			value: "3020",
			label: "Winksele"
		},
		{
			value: "3040",
			label: "Huldenberg"
		},
		{
			value: "3040",
			label: "Loonbeek"
		},
		{
			value: "3040",
			label: "Neerijse"
		},
		{
			value: "3040",
			label: "Ottenburg"
		},
		{
			value: "3040",
			label: "Sint-Agatha-Rode"
		},
		{
			value: "3050",
			label: "Oud-Heverlee"
		},
		{
			value: "3051",
			label: "Sint-Joris-Weert"
		},
		{
			value: "3052",
			label: "Blanden"
		},
		{
			value: "3053",
			label: "Haasrode"
		},
		{
			value: "3054",
			label: "Vaalbeek"
		},
		{
			value: "3060",
			label: "Bertem"
		},
		{
			value: "3060",
			label: "Korbeek-Dijle"
		},
		{
			value: "3061",
			label: "Leefdaal"
		},
		{
			value: "3070",
			label: "Kortenberg"
		},
		{
			value: "3071",
			label: "Erps-Kwerps"
		},
		{
			value: "3078",
			label: "Everberg"
		},
		{
			value: "3078",
			label: "Meerbeek"
		},
		{
			value: "3080",
			label: "Duisburg"
		},
		{
			value: "3080",
			label: "Tervuren"
		},
		{
			value: "3080",
			label: "Vossem"
		},
		{
			value: "3090",
			label: "Overijse"
		},
		{
			value: "3110",
			label: "Rotselaar"
		},
		{
			value: "3111",
			label: "Wezemaal"
		},
		{
			value: "3118",
			label: "Werchter"
		},
		{
			value: "3120",
			label: "Tremelo"
		},
		{
			value: "3128",
			label: "Baal"
		},
		{
			value: "3130",
			label: "Begijnendijk"
		},
		{
			value: "3130",
			label: "Betekom"
		},
		{
			value: "3140",
			label: "Keerbergen"
		},
		{
			value: "3150",
			label: "Haacht"
		},
		{
			value: "3150",
			label: "Tildonk"
		},
		{
			value: "3150",
			label: "Wespelaar"
		},
		{
			value: "3190",
			label: "Boortmeerbeek"
		},
		{
			value: "3191",
			label: "Hever"
		},
		{
			value: "3200",
			label: "Aarschot"
		},
		{
			value: "3200",
			label: "Gelrode"
		},
		{
			value: "3201",
			label: "Langdorp"
		},
		{
			value: "3202",
			label: "Rillaar"
		},
		{
			value: "3210",
			label: "Linden"
		},
		{
			value: "3210",
			label: "Lubbeek"
		},
		{
			value: "3211",
			label: "Binkom"
		},
		{
			value: "3212",
			label: "Pellenberg"
		},
		{
			value: "3220",
			label: "Holsbeek"
		},
		{
			value: "3220",
			label: "Kortrijk-Dutsel"
		},
		{
			value: "3220",
			label: "Sint-Pieters-Rode"
		},
		{
			value: "3221",
			label: "Nieuwrode"
		},
		{
			value: "3270",
			label: "Scherpenheuvel"
		},
		{
			value: "3270",
			label: "Scherpenheuvel-Zichem"
		},
		{
			value: "3271",
			label: "Averbode"
		},
		{
			value: "3271",
			label: "Zichem"
		},
		{
			value: "3272",
			label: "Messelbroek"
		},
		{
			value: "3272",
			label: "Testelt"
		},
		{
			value: "3290",
			label: "Deurne (Vl.Br.)"
		},
		{
			value: "3290",
			label: "Diest"
		},
		{
			value: "3290",
			label: "Schaffen"
		},
		{
			value: "3290",
			label: "Webbekom"
		},
		{
			value: "3293",
			label: "Kaggevinne"
		},
		{
			value: "3294",
			label: "Molenstede"
		},
		{
			value: "3300",
			label: "Bost"
		},
		{
			value: "3300",
			label: "Goetsenhoven"
		},
		{
			value: "3300",
			label: "Hakendover"
		},
		{
			value: "3300",
			label: "Kumtich"
		},
		{
			value: "3300",
			label: "Oorbeek"
		},
		{
			value: "3300",
			label: "Oplinter"
		},
		{
			value: "3300",
			label: "Sint-Margriete-Houtem (Tienen)"
		},
		{
			value: "3300",
			label: "Tienen"
		},
		{
			value: "3300",
			label: "Vissenaken"
		},
		{
			value: "3320",
			label: "Hoegaarden"
		},
		{
			value: "3320",
			label: "Meldert (Vl.Br.)"
		},
		{
			value: "3321",
			label: "Outgaarden"
		},
		{
			value: "3350",
			label: "Drieslinter"
		},
		{
			value: "3350",
			label: "Linter"
		},
		{
			value: "3350",
			label: "Melkwezer"
		},
		{
			value: "3350",
			label: "Neerhespen"
		},
		{
			value: "3350",
			label: "Neerlinter"
		},
		{
			value: "3350",
			label: "Orsmaal-Gussenhoven"
		},
		{
			value: "3350",
			label: "Overhespen"
		},
		{
			value: "3350",
			label: "Wommersom"
		},
		{
			value: "3360",
			label: "Bierbeek"
		},
		{
			value: "3360",
			label: "Korbeek-Lo"
		},
		{
			value: "3360",
			label: "Lovenjoel"
		},
		{
			value: "3360",
			label: "Opvelp"
		},
		{
			value: "3370",
			label: "Boutersem"
		},
		{
			value: "3370",
			label: "Kerkom"
		},
		{
			value: "3370",
			label: "Neervelp"
		},
		{
			value: "3370",
			label: "Roosbeek"
		},
		{
			value: "3370",
			label: "Vertrijk"
		},
		{
			value: "3370",
			label: "Willebringen"
		},
		{
			value: "3380",
			label: "Bunsbeek"
		},
		{
			value: "3380",
			label: "Glabbeek-Zuurbemde"
		},
		{
			value: "3381",
			label: "Kapellen (Vl.Br.)"
		},
		{
			value: "3384",
			label: "Attenrode"
		},
		{
			value: "3390",
			label: "Houwaart"
		},
		{
			value: "3390",
			label: "Sint-Joris-Winge"
		},
		{
			value: "3390",
			label: "Tielt (Vl.Br.)"
		},
		{
			value: "3390",
			label: "Tielt-Winge"
		},
		{
			value: "3391",
			label: "Meensel-Kiezegem"
		},
		{
			value: "3400",
			label: "Eliksem"
		},
		{
			value: "3400",
			label: "Ezemaal"
		},
		{
			value: "3400",
			label: "Laar"
		},
		{
			value: "3400",
			label: "Landen"
		},
		{
			value: "3400",
			label: "Neerwinden"
		},
		{
			value: "3400",
			label: "Overwinden"
		},
		{
			value: "3400",
			label: "Rumsdorp"
		},
		{
			value: "3400",
			label: "Wange"
		},
		{
			value: "3401",
			label: "Waasmont"
		},
		{
			value: "3401",
			label: "Walsbets"
		},
		{
			value: "3401",
			label: "Walshoutem"
		},
		{
			value: "3401",
			label: "Wezeren"
		},
		{
			value: "3404",
			label: "Attenhoven"
		},
		{
			value: "3404",
			label: "Neerlanden"
		},
		{
			value: "3440",
			label: "Budingen"
		},
		{
			value: "3440",
			label: "Dormaal"
		},
		{
			value: "3440",
			label: "Halle-Booienhoven"
		},
		{
			value: "3440",
			label: "Helen-Bos"
		},
		{
			value: "3440",
			label: "Zoutleeuw"
		},
		{
			value: "3450",
			label: "Geetbets"
		},
		{
			value: "3450",
			label: "Grazen"
		},
		{
			value: "3454",
			label: "Rummen"
		},
		{
			value: "3460",
			label: "Assent"
		},
		{
			value: "3460",
			label: "Bekkevoort"
		},
		{
			value: "3461",
			label: "Molenbeek-Wersbeek"
		},
		{
			value: "3470",
			label: "Kortenaken"
		},
		{
			value: "3470",
			label: "Ransberg"
		},
		{
			value: "3471",
			label: "Hoeleden"
		},
		{
			value: "3472",
			label: "Kersbeek-Miskom"
		},
		{
			value: "3473",
			label: "Waanrode"
		},
		{
			value: "3500",
			label: "Hasselt"
		},
		{
			value: "3500",
			label: "Sint-Lambrechts-Herk"
		},
		{
			value: "3501",
			label: "Wimmertingen"
		},
		{
			value: "3510",
			label: "Kermt"
		},
		{
			value: "3510",
			label: "Spalbeek"
		},
		{
			value: "3511",
			label: "Kuringen"
		},
		{
			value: "3511",
			label: "Stokrooie"
		},
		{
			value: "3512",
			label: "Stevoort"
		},
		{
			value: "3520",
			label: "Zonhoven"
		},
		{
			value: "3530",
			label: "Helchteren"
		},
		{
			value: "3530",
			label: "Houthalen"
		},
		{
			value: "3530",
			label: "Houthalen-Helchteren"
		},
		{
			value: "3540",
			label: "Berbroek"
		},
		{
			value: "3540",
			label: "Donk"
		},
		{
			value: "3540",
			label: "Herk-de-Stad"
		},
		{
			value: "3540",
			label: "Schulen"
		},
		{
			value: "3545",
			label: "Halen"
		},
		{
			value: "3545",
			label: "Loksbergen"
		},
		{
			value: "3545",
			label: "Zelem"
		},
		{
			value: "3550",
			label: "Heusden (Limb.)"
		},
		{
			value: "3550",
			label: "Heusden-Zolder"
		},
		{
			value: "3550",
			label: "Zolder"
		},
		{
			value: "3560",
			label: "Linkhout"
		},
		{
			value: "3560",
			label: "Lummen"
		},
		{
			value: "3560",
			label: "Meldert (Limb.)"
		},
		{
			value: "3570",
			label: "Alken"
		},
		{
			value: "3580",
			label: "Beringen"
		},
		{
			value: "3581",
			label: "Beverlo"
		},
		{
			value: "3582",
			label: "Koersel"
		},
		{
			value: "3583",
			label: "Paal"
		},
		{
			value: "3590",
			label: "Diepenbeek"
		},
		{
			value: "3600",
			label: "Genk"
		},
		{
			value: "3620",
			label: "Gellik"
		},
		{
			value: "3620",
			label: "Lanaken"
		},
		{
			value: "3620",
			label: "Neerharen"
		},
		{
			value: "3620",
			label: "Veldwezelt"
		},
		{
			value: "3621",
			label: "Rekem"
		},
		{
			value: "3630",
			label: "Eisden"
		},
		{
			value: "3630",
			label: "Leut"
		},
		{
			value: "3630",
			label: "Maasmechelen"
		},
		{
			value: "3630",
			label: "Mechelen-aan-de-Maas"
		},
		{
			value: "3630",
			label: "Meeswijk"
		},
		{
			value: "3630",
			label: "Opgrimbie"
		},
		{
			value: "3630",
			label: "Vucht"
		},
		{
			value: "3631",
			label: "Boorsem"
		},
		{
			value: "3631",
			label: "Uikhoven"
		},
		{
			value: "3640",
			label: "Kessenich"
		},
		{
			value: "3640",
			label: "Kinrooi"
		},
		{
			value: "3640",
			label: "Molenbeersel"
		},
		{
			value: "3640",
			label: "Ophoven"
		},
		{
			value: "3650",
			label: "Dilsen-Stokkem"
		},
		{
			value: "3650",
			label: "Elen"
		},
		{
			value: "3650",
			label: "Lanklaar"
		},
		{
			value: "3650",
			label: "Rotem"
		},
		{
			value: "3660",
			label: "Opglabbeek"
		},
		{
			value: "3665",
			label: "As"
		},
		{
			value: "3668",
			label: "Niel-bij-As"
		},
		{
			value: "3670",
			label: "Ellikom"
		},
		{
			value: "3670",
			label: "Gruitrode"
		},
		{
			value: "3670",
			label: "Meeuwen"
		},
		{
			value: "3670",
			label: "Meeuwen-Gruitrode"
		},
		{
			value: "3670",
			label: "Neerglabbeek"
		},
		{
			value: "3670",
			label: "Wijshagen"
		},
		{
			value: "3680",
			label: "Maaseik"
		},
		{
			value: "3680",
			label: "Neeroeteren"
		},
		{
			value: "3680",
			label: "Opoeteren"
		},
		{
			value: "3690",
			label: "Zutendaal"
		},
		{
			value: "3700",
			label: "Berg (Limb.)"
		},
		{
			value: "3700",
			label: "Diets-Heur"
		},
		{
			value: "3700",
			label: "Haren (Tongeren)"
		},
		{
			value: "3700",
			label: "Henis"
		},
		{
			value: "3700",
			label: "Kolmont (Tongeren)"
		},
		{
			value: "3700",
			label: "Koninksem"
		},
		{
			value: "3700",
			label: "Lauw"
		},
		{
			value: "3700",
			label: "Mal"
		},
		{
			value: "3700",
			label: "Neerrepen"
		},
		{
			value: "3700",
			label: "Nerem"
		},
		{
			value: "3700",
			label: "Overrepen (Kolmont)"
		},
		{
			value: "3700",
			label: "Piringen (Haren)"
		},
		{
			value: "3700",
			label: "Riksingen"
		},
		{
			value: "3700",
			label: "Rutten"
		},
		{
			value: "3700",
			label: "'s Herenelderen"
		},
		{
			value: "3700",
			label: "Sluizen"
		},
		{
			value: "3700",
			label: "Tongeren"
		},
		{
			value: "3700",
			label: "Vreren"
		},
		{
			value: "3700",
			label: "Widooie (Haren)"
		},
		{
			value: "3717",
			label: "Herstappe"
		},
		{
			value: "3720",
			label: "Kortessem"
		},
		{
			value: "3721",
			label: "Vliermaalroot"
		},
		{
			value: "3722",
			label: "Wintershoven"
		},
		{
			value: "3723",
			label: "Guigoven"
		},
		{
			value: "3724",
			label: "Vliermaal"
		},
		{
			value: "3730",
			label: "Hoeselt"
		},
		{
			value: "3730",
			label: "Romershoven"
		},
		{
			value: "3730",
			label: "Sint-Huibrechts-Hern"
		},
		{
			value: "3730",
			label: "Werm"
		},
		{
			value: "3732",
			label: "Schalkhoven"
		},
		{
			value: "3740",
			label: "Beverst"
		},
		{
			value: "3740",
			label: "Bilzen"
		},
		{
			value: "3740",
			label: "Eigenbilzen"
		},
		{
			value: "3740",
			label: "Grote-Spouwen"
		},
		{
			value: "3740",
			label: "Hees"
		},
		{
			value: "3740",
			label: "Kleine-Spouwen"
		},
		{
			value: "3740",
			label: "Mopertingen"
		},
		{
			value: "3740",
			label: "Munsterbilzen"
		},
		{
			value: "3740",
			label: "Rijkhoven"
		},
		{
			value: "3740",
			label: "Rosmeer"
		},
		{
			value: "3740",
			label: "Spouwen"
		},
		{
			value: "3740",
			label: "Waltwilder"
		},
		{
			value: "3742",
			label: "Martenslinde"
		},
		{
			value: "3746",
			label: "Hoelbeek"
		},
		{
			value: "3770",
			label: "Genoelselderen"
		},
		{
			value: "3770",
			label: "Herderen"
		},
		{
			value: "3770",
			label: "Kanne"
		},
		{
			value: "3770",
			label: "Membruggen"
		},
		{
			value: "3770",
			label: "Millen"
		},
		{
			value: "3770",
			label: "Riemst"
		},
		{
			value: "3770",
			label: "Val-Meer"
		},
		{
			value: "3770",
			label: "Vlijtingen"
		},
		{
			value: "3770",
			label: "Vroenhoven"
		},
		{
			value: "3770",
			label: "Zichen-Zussen-Bolder"
		},
		{
			value: "3790",
			label: "Moelingen/Mouland"
		},
		{
			value: "3790",
			label: "Sint-Martens-Voeren/Fouron-Saint-Martin"
		},
		{
			value: "3790",
			label: "Voeren/Fourons"
		},
		{
			value: "3791",
			label: "Remersdaal"
		},
		{
			value: "3792",
			label: "Sint-Pieters-Voeren/Fouron-Saint-Pierre"
		},
		{
			value: "3793",
			label: "Teuven"
		},
		{
			value: "3798",
			label: "'s Gravenvoeren/Fouron-le-Comte"
		},
		{
			value: "3800",
			label: "Aalst (Limb.)"
		},
		{
			value: "3800",
			label: "Brustem"
		},
		{
			value: "3800",
			label: "Engelmanshoven"
		},
		{
			value: "3800",
			label: "Gelinden"
		},
		{
			value: "3800",
			label: "Groot-Gelmen"
		},
		{
			value: "3800",
			label: "Halmaal"
		},
		{
			value: "3800",
			label: "Kerkom-bij-Sint-Truiden"
		},
		{
			value: "3800",
			label: "Ordingen"
		},
		{
			value: "3800",
			label: "Sint-Truiden"
		},
		{
			value: "3800",
			label: "Zepperen"
		},
		{
			value: "3803",
			label: "Duras"
		},
		{
			value: "3803",
			label: "Gorsem"
		},
		{
			value: "3803",
			label: "Runkelen"
		},
		{
			value: "3803",
			label: "Wilderen"
		},
		{
			value: "3806",
			label: "Velm"
		},
		{
			value: "3830",
			label: "Berlingen"
		},
		{
			value: "3830",
			label: "Wellen"
		},
		{
			value: "3831",
			label: "Herten"
		},
		{
			value: "3832",
			label: "Ulbeek"
		},
		{
			value: "3840",
			label: "Bommershoven (Haren)"
		},
		{
			value: "3840",
			label: "Borgloon"
		},
		{
			value: "3840",
			label: "Broekom"
		},
		{
			value: "3840",
			label: "Gors-Opleeuw"
		},
		{
			value: "3840",
			label: "Gotem"
		},
		{
			value: "3840",
			label: "Groot-Loon"
		},
		{
			value: "3840",
			label: "Haren (Borgloon)"
		},
		{
			value: "3840",
			label: "Hendrieken"
		},
		{
			value: "3840",
			label: "Hoepertingen"
		},
		{
			value: "3840",
			label: "Jesseren (Kolmont)"
		},
		{
			value: "3840",
			label: "Kerniel"
		},
		{
			value: "3840",
			label: "Kolmont (Borgloon)"
		},
		{
			value: "3840",
			label: "Kuttekoven"
		},
		{
			value: "3840",
			label: "Rijkel"
		},
		{
			value: "3840",
			label: "Voort"
		},
		{
			value: "3850",
			label: "Binderveld"
		},
		{
			value: "3850",
			label: "Kozen"
		},
		{
			value: "3850",
			label: "Nieuwerkerken (Limb.)"
		},
		{
			value: "3850",
			label: "Wijer"
		},
		{
			value: "3870",
			label: "Batsheers"
		},
		{
			value: "3870",
			label: "Bovelingen"
		},
		{
			value: "3870",
			label: "Gutschoven"
		},
		{
			value: "3870",
			label: "Heers"
		},
		{
			value: "3870",
			label: "Heks"
		},
		{
			value: "3870",
			label: "Horpmaal"
		},
		{
			value: "3870",
			label: "Klein-Gelmen"
		},
		{
			value: "3870",
			label: "Mechelen-Bovelingen"
		},
		{
			value: "3870",
			label: "Mettekoven"
		},
		{
			value: "3870",
			label: "Opheers"
		},
		{
			value: "3870",
			label: "Rukkelingen-Loon"
		},
		{
			value: "3870",
			label: "Vechmaal"
		},
		{
			value: "3870",
			label: "Veulen"
		},
		{
			value: "3890",
			label: "Boekhout"
		},
		{
			value: "3890",
			label: "Gingelom"
		},
		{
			value: "3890",
			label: "Jeuk"
		},
		{
			value: "3890",
			label: "Kortijs"
		},
		{
			value: "3890",
			label: "Montenaken"
		},
		{
			value: "3890",
			label: "Niel-bij-Sint-Truiden"
		},
		{
			value: "3890",
			label: "Vorsen"
		},
		{
			value: "3891",
			label: "Borlo"
		},
		{
			value: "3891",
			label: "Buvingen"
		},
		{
			value: "3891",
			label: "Mielen-boven-Aalst"
		},
		{
			value: "3891",
			label: "Muizen (Limb.)"
		},
		{
			value: "3900",
			label: "Overpelt"
		},
		{
			value: "3910",
			label: "Neerpelt"
		},
		{
			value: "3910",
			label: "Sint-Huibrechts-Lille"
		},
		{
			value: "3920",
			label: "Lommel"
		},
		{
			value: "3930",
			label: "Achel"
		},
		{
			value: "3930",
			label: "Hamont"
		},
		{
			value: "3930",
			label: "Hamont-Achel"
		},
		{
			value: "3940",
			label: "Hechtel"
		},
		{
			value: "3940",
			label: "Hechtel-Eksel"
		},
		{
			value: "3941",
			label: "Eksel"
		},
		{
			value: "3945",
			label: "Ham"
		},
		{
			value: "3945",
			label: "Kwaadmechelen"
		},
		{
			value: "3945",
			label: "Oostham"
		},
		{
			value: "3950",
			label: "Bocholt"
		},
		{
			value: "3950",
			label: "Kaulille"
		},
		{
			value: "3950",
			label: "Reppel"
		},
		{
			value: "3960",
			label: "Beek"
		},
		{
			value: "3960",
			label: "Bree"
		},
		{
			value: "3960",
			label: "Gerdingen"
		},
		{
			value: "3960",
			label: "Opitter"
		},
		{
			value: "3960",
			label: "Tongerlo (Limb.)"
		},
		{
			value: "3970",
			label: "Leopoldsburg"
		},
		{
			value: "3971",
			label: "Heppen"
		},
		{
			value: "3980",
			label: "Tessenderlo"
		},
		{
			value: "3990",
			label: "Grote-Brogel"
		},
		{
			value: "3990",
			label: "Kleine-Brogel"
		},
		{
			value: "3990",
			label: "Peer"
		},
		{
			value: "3990",
			label: "Wijchmaal"
		},
		{
			value: "4000",
			label: "Glain"
		},
		{
			value: "4000",
			label: "Liège"
		},
		{
			value: "4000",
			label: "Rocourt"
		},
		{
			value: "4020",
			label: "Bressoux"
		},
		{
			value: "4020",
			label: "Jupille-sur-Meuse"
		},
		{
			value: "4020",
			label: "Liège"
		},
		{
			value: "4020",
			label: "Wandre"
		},
		{
			value: "4030",
			label: "Grivegnée"
		},
		{
			value: "4031",
			label: "Angleur"
		},
		{
			value: "4032",
			label: "Chênée"
		},
		{
			value: "4040",
			label: "Herstal"
		},
		{
			value: "4041",
			label: "Milmort"
		},
		{
			value: "4041",
			label: "Vottem"
		},
		{
			value: "4042",
			label: "Liers"
		},
		{
			value: "4050",
			label: "Chaudfontaine"
		},
		{
			value: "4051",
			label: "Vaux-sous-Chèvremont"
		},
		{
			value: "4052",
			label: "Beaufays"
		},
		{
			value: "4053",
			label: "Embourg"
		},
		{
			value: "4100",
			label: "Boncelles"
		},
		{
			value: "4100",
			label: "Seraing"
		},
		{
			value: "4101",
			label: "Jemeppe-sur-Meuse"
		},
		{
			value: "4102",
			label: "Ougrée"
		},
		{
			value: "4120",
			label: "Ehein"
		},
		{
			value: "4120",
			label: "Neupré"
		},
		{
			value: "4120",
			label: "Rotheux-Rimière"
		},
		{
			value: "4121",
			label: "Neuville-en-Condroz"
		},
		{
			value: "4122",
			label: "Plainevaux"
		},
		{
			value: "4130",
			label: "Esneux"
		},
		{
			value: "4130",
			label: "Tilff"
		},
		{
			value: "4140",
			label: "Dolembreux"
		},
		{
			value: "4140",
			label: "Gomzé-Andoumont"
		},
		{
			value: "4140",
			label: "Rouvreux"
		},
		{
			value: "4140",
			label: "Sprimont"
		},
		{
			value: "4141",
			label: "Louveigné"
		},
		{
			value: "4160",
			label: "Anthisnes"
		},
		{
			value: "4161",
			label: "Villers-aux-Tours"
		},
		{
			value: "4162",
			label: "Hody"
		},
		{
			value: "4163",
			label: "Tavier"
		},
		{
			value: "4170",
			label: "Comblain-au-Pont"
		},
		{
			value: "4171",
			label: "Poulseur"
		},
		{
			value: "4180",
			label: "Comblain-Fairon"
		},
		{
			value: "4180",
			label: "Comblain-la-Tour"
		},
		{
			value: "4180",
			label: "Hamoir"
		},
		{
			value: "4181",
			label: "Filot"
		},
		{
			value: "4190",
			label: "Ferrières"
		},
		{
			value: "4190",
			label: "My"
		},
		{
			value: "4190",
			label: "Vieuxville"
		},
		{
			value: "4190",
			label: "Werbomont"
		},
		{
			value: "4190",
			label: "Xhoris"
		},
		{
			value: "4210",
			label: "Burdinne"
		},
		{
			value: "4210",
			label: "Hannêche"
		},
		{
			value: "4210",
			label: "Lamontzée"
		},
		{
			value: "4210",
			label: "Marneffe"
		},
		{
			value: "4210",
			label: "Oteppe"
		},
		{
			value: "4217",
			label: "Héron"
		},
		{
			value: "4217",
			label: "Lavoir"
		},
		{
			value: "4217",
			label: "Waret-l'Evêque"
		},
		{
			value: "4218",
			label: "Couthuin"
		},
		{
			value: "4219",
			label: "Acosse"
		},
		{
			value: "4219",
			label: "Ambresin"
		},
		{
			value: "4219",
			label: "Meeffe"
		},
		{
			value: "4219",
			label: "Wasseiges"
		},
		{
			value: "4250",
			label: "Boëlhe"
		},
		{
			value: "4250",
			label: "Geer"
		},
		{
			value: "4250",
			label: "Hollogne-sur-Geer"
		},
		{
			value: "4250",
			label: "Lens-Saint-Servais"
		},
		{
			value: "4252",
			label: "Omal"
		},
		{
			value: "4253",
			label: "Darion"
		},
		{
			value: "4254",
			label: "Ligney"
		},
		{
			value: "4257",
			label: "Berloz"
		},
		{
			value: "4257",
			label: "Corswarem"
		},
		{
			value: "4257",
			label: "Rosoux-Crenwick"
		},
		{
			value: "4260",
			label: "Avennes"
		},
		{
			value: "4260",
			label: "Braives"
		},
		{
			value: "4260",
			label: "Ciplet"
		},
		{
			value: "4260",
			label: "Fallais"
		},
		{
			value: "4260",
			label: "Fumal"
		},
		{
			value: "4260",
			label: "Ville-en-Hesbaye"
		},
		{
			value: "4261",
			label: "Latinne"
		},
		{
			value: "4263",
			label: "Tourinne (Lg.)"
		},
		{
			value: "4280",
			label: "Abolens"
		},
		{
			value: "4280",
			label: "Avernas-le-Bauduin"
		},
		{
			value: "4280",
			label: "Avin"
		},
		{
			value: "4280",
			label: "Bertrée"
		},
		{
			value: "4280",
			label: "Blehen"
		},
		{
			value: "4280",
			label: "Cras-Avernas"
		},
		{
			value: "4280",
			label: "Crehen"
		},
		{
			value: "4280",
			label: "Grand-Hallet"
		},
		{
			value: "4280",
			label: "Hannut"
		},
		{
			value: "4280",
			label: "Lens-Saint-Remy"
		},
		{
			value: "4280",
			label: "Merdorp"
		},
		{
			value: "4280",
			label: "Moxhe"
		},
		{
			value: "4280",
			label: "Petit-Hallet"
		},
		{
			value: "4280",
			label: "Poucet"
		},
		{
			value: "4280",
			label: "Thisnes"
		},
		{
			value: "4280",
			label: "Trognée"
		},
		{
			value: "4280",
			label: "Villers-le-Peuplier"
		},
		{
			value: "4280",
			label: "Wansin"
		},
		{
			value: "4287",
			label: "Lincent"
		},
		{
			value: "4287",
			label: "Pellaines"
		},
		{
			value: "4287",
			label: "Racour"
		},
		{
			value: "4300",
			label: "Bettincourt"
		},
		{
			value: "4300",
			label: "Bleret"
		},
		{
			value: "4300",
			label: "Bovenistier"
		},
		{
			value: "4300",
			label: "Grand-Axhe"
		},
		{
			value: "4300",
			label: "Lantremange"
		},
		{
			value: "4300",
			label: "Oleye"
		},
		{
			value: "4300",
			label: "Waremme"
		},
		{
			value: "4317",
			label: "Aineffe"
		},
		{
			value: "4317",
			label: "Borlez"
		},
		{
			value: "4317",
			label: "Celles (Lg.)"
		},
		{
			value: "4317",
			label: "Faimes"
		},
		{
			value: "4317",
			label: "Les Waleffes"
		},
		{
			value: "4317",
			label: "Viemme"
		},
		{
			value: "4340",
			label: "Awans"
		},
		{
			value: "4340",
			label: "Fooz"
		},
		{
			value: "4340",
			label: "Othée"
		},
		{
			value: "4340",
			label: "Villers-l'Evêque"
		},
		{
			value: "4342",
			label: "Hognoul"
		},
		{
			value: "4347",
			label: "Fexhe-le-Haut-Clocher"
		},
		{
			value: "4347",
			label: "Freloux"
		},
		{
			value: "4347",
			label: "Noville (Lg.)"
		},
		{
			value: "4347",
			label: "Roloux"
		},
		{
			value: "4347",
			label: "Voroux-Goreux"
		},
		{
			value: "4350",
			label: "Lamine"
		},
		{
			value: "4350",
			label: "Momalle"
		},
		{
			value: "4350",
			label: "Pousset"
		},
		{
			value: "4350",
			label: "Remicourt"
		},
		{
			value: "4351",
			label: "Hodeige"
		},
		{
			value: "4357",
			label: "Donceel"
		},
		{
			value: "4357",
			label: "Haneffe"
		},
		{
			value: "4357",
			label: "Jeneffe (Lg.)"
		},
		{
			value: "4357",
			label: "Limont"
		},
		{
			value: "4360",
			label: "Bergilers"
		},
		{
			value: "4360",
			label: "Grandville"
		},
		{
			value: "4360",
			label: "Lens-sur-Geer"
		},
		{
			value: "4360",
			label: "Oreye"
		},
		{
			value: "4360",
			label: "Otrange"
		},
		{
			value: "4367",
			label: "Crisnée"
		},
		{
			value: "4367",
			label: "Fize-le-Marsal"
		},
		{
			value: "4367",
			label: "Kemexhe"
		},
		{
			value: "4367",
			label: "Odeur"
		},
		{
			value: "4367",
			label: "Thys"
		},
		{
			value: "4400",
			label: "Awirs"
		},
		{
			value: "4400",
			label: "Chokier"
		},
		{
			value: "4400",
			label: "Flémalle"
		},
		{
			value: "4400",
			label: "Flémalle-Grande"
		},
		{
			value: "4400",
			label: "Flémalle-Haute"
		},
		{
			value: "4400",
			label: "Gleixhe"
		},
		{
			value: "4400",
			label: "Ivoz-Ramet"
		},
		{
			value: "4400",
			label: "Mons-lez-Liège"
		},
		{
			value: "4420",
			label: "Montegnée"
		},
		{
			value: "4420",
			label: "Saint-Nicolas (Lg.)"
		},
		{
			value: "4420",
			label: "Tilleur"
		},
		{
			value: "4430",
			label: "Ans"
		},
		{
			value: "4431",
			label: "Loncin"
		},
		{
			value: "4432",
			label: "Alleur"
		},
		{
			value: "4432",
			label: "Xhendremael"
		},
		{
			value: "4450",
			label: "Juprelle"
		},
		{
			value: "4450",
			label: "Lantin"
		},
		{
			value: "4450",
			label: "Slins"
		},
		{
			value: "4451",
			label: "Voroux-lez-Liers"
		},
		{
			value: "4452",
			label: "Paifve"
		},
		{
			value: "4452",
			label: "Wihogne"
		},
		{
			value: "4453",
			label: "Villers-Saint-Siméon"
		},
		{
			value: "4458",
			label: "Fexhe-Slins"
		},
		{
			value: "4460",
			label: "Bierset"
		},
		{
			value: "4460",
			label: "Grâce-Berleur"
		},
		{
			value: "4460",
			label: "Grâce-Hollogne"
		},
		{
			value: "4460",
			label: "Hollogne-aux-Pierres"
		},
		{
			value: "4460",
			label: "Horion-Hozémont"
		},
		{
			value: "4460",
			label: "Velroux"
		},
		{
			value: "4470",
			label: "Saint-Georges-sur-Meuse"
		},
		{
			value: "4480",
			label: "Clermont-sous-Huy"
		},
		{
			value: "4480",
			label: "Engis"
		},
		{
			value: "4480",
			label: "Hermalle-sous-Huy"
		},
		{
			value: "4500",
			label: "Ben-Ahin"
		},
		{
			value: "4500",
			label: "Huy"
		},
		{
			value: "4500",
			label: "Tihange"
		},
		{
			value: "4520",
			label: "Antheit"
		},
		{
			value: "4520",
			label: "Bas-Oha"
		},
		{
			value: "4520",
			label: "Huccorgne"
		},
		{
			value: "4520",
			label: "Moha"
		},
		{
			value: "4520",
			label: "Vinalmont"
		},
		{
			value: "4520",
			label: "Wanze"
		},
		{
			value: "4530",
			label: "Fize-Fontaine"
		},
		{
			value: "4530",
			label: "Vaux-et-Borset"
		},
		{
			value: "4530",
			label: "Vieux-Waleffe"
		},
		{
			value: "4530",
			label: "Villers-le-Bouillet"
		},
		{
			value: "4530",
			label: "Warnant-Dreye"
		},
		{
			value: "4537",
			label: "Chapon-Seraing"
		},
		{
			value: "4537",
			label: "Seraing-le-Château"
		},
		{
			value: "4537",
			label: "Verlaine"
		},
		{
			value: "4540",
			label: "Amay"
		},
		{
			value: "4540",
			label: "Ampsin"
		},
		{
			value: "4540",
			label: "Flône"
		},
		{
			value: "4540",
			label: "Jehay"
		},
		{
			value: "4540",
			label: "Ombret"
		},
		{
			value: "4550",
			label: "Nandrin"
		},
		{
			value: "4550",
			label: "Saint-Séverin"
		},
		{
			value: "4550",
			label: "Villers-le-Temple"
		},
		{
			value: "4550",
			label: "Yernée-Fraineux"
		},
		{
			value: "4557",
			label: "Abée"
		},
		{
			value: "4557",
			label: "Fraiture"
		},
		{
			value: "4557",
			label: "Ramelot"
		},
		{
			value: "4557",
			label: "Seny"
		},
		{
			value: "4557",
			label: "Soheit-Tinlot"
		},
		{
			value: "4557",
			label: "Tinlot"
		},
		{
			value: "4560",
			label: "Bois-et-Borsu"
		},
		{
			value: "4560",
			label: "Clavier"
		},
		{
			value: "4560",
			label: "Les Avins"
		},
		{
			value: "4560",
			label: "Ocquier"
		},
		{
			value: "4560",
			label: "Pailhe"
		},
		{
			value: "4560",
			label: "Terwagne"
		},
		{
			value: "4570",
			label: "Marchin"
		},
		{
			value: "4570",
			label: "Vyle-et-Tharoul"
		},
		{
			value: "4577",
			label: "Modave"
		},
		{
			value: "4577",
			label: "Outrelouxhe"
		},
		{
			value: "4577",
			label: "Strée-lez-Huy"
		},
		{
			value: "4577",
			label: "Vierset-Barse"
		},
		{
			value: "4590",
			label: "Ellemelle"
		},
		{
			value: "4590",
			label: "Ouffet"
		},
		{
			value: "4590",
			label: "Warzée"
		},
		{
			value: "4600",
			label: "Lanaye"
		},
		{
			value: "4600",
			label: "Lixhe"
		},
		{
			value: "4600",
			label: "Richelle"
		},
		{
			value: "4600",
			label: "Visé"
		},
		{
			value: "4601",
			label: "Argenteau"
		},
		{
			value: "4602",
			label: "Cheratte"
		},
		{
			value: "4606",
			label: "Saint-André"
		},
		{
			value: "4607",
			label: "Berneau"
		},
		{
			value: "4607",
			label: "Bombaye"
		},
		{
			value: "4607",
			label: "Dalhem"
		},
		{
			value: "4607",
			label: "Feneur"
		},
		{
			value: "4607",
			label: "Mortroux"
		},
		{
			value: "4608",
			label: "Neufchâteau (Lg.)"
		},
		{
			value: "4608",
			label: "Warsage"
		},
		{
			value: "4610",
			label: "Bellaire"
		},
		{
			value: "4610",
			label: "Beyne-Heusay"
		},
		{
			value: "4610",
			label: "Queue-du-Bois"
		},
		{
			value: "4620",
			label: "Fléron"
		},
		{
			value: "4621",
			label: "Retinne"
		},
		{
			value: "4623",
			label: "Magnée"
		},
		{
			value: "4624",
			label: "Romsée"
		},
		{
			value: "4630",
			label: "Ayeneux"
		},
		{
			value: "4630",
			label: "Micheroux"
		},
		{
			value: "4630",
			label: "Soumagne"
		},
		{
			value: "4630",
			label: "Tignée"
		},
		{
			value: "4631",
			label: "Evegnée"
		},
		{
			value: "4632",
			label: "Cérexhe-Heuseux"
		},
		{
			value: "4633",
			label: "Melen"
		},
		{
			value: "4650",
			label: "Chaineux"
		},
		{
			value: "4650",
			label: "Grand-Rechain"
		},
		{
			value: "4650",
			label: "Herve"
		},
		{
			value: "4650",
			label: "Julémont"
		},
		{
			value: "4651",
			label: "Battice"
		},
		{
			value: "4652",
			label: "Xhendelesse"
		},
		{
			value: "4653",
			label: "Bolland"
		},
		{
			value: "4654",
			label: "Charneux"
		},
		{
			value: "4670",
			label: "Blégny"
		},
		{
			value: "4670",
			label: "Mortier"
		},
		{
			value: "4670",
			label: "Trembleur"
		},
		{
			value: "4671",
			label: "Barchon"
		},
		{
			value: "4671",
			label: "Housse"
		},
		{
			value: "4671",
			label: "Saive"
		},
		{
			value: "4672",
			label: "Saint-Remy (Lg.)"
		},
		{
			value: "4680",
			label: "Hermée"
		},
		{
			value: "4680",
			label: "Oupeye"
		},
		{
			value: "4681",
			label: "Hermalle-sous-Argenteau"
		},
		{
			value: "4682",
			label: "Heure-le-Romain"
		},
		{
			value: "4682",
			label: "Houtain-Saint-Siméon"
		},
		{
			value: "4683",
			label: "Vivegnis"
		},
		{
			value: "4684",
			label: "Haccourt"
		},
		{
			value: "4690",
			label: "Bassenge"
		},
		{
			value: "4690",
			label: "Boirs"
		},
		{
			value: "4690",
			label: "Eben-Emael"
		},
		{
			value: "4690",
			label: "Glons"
		},
		{
			value: "4690",
			label: "Roclenge-sur-Geer"
		},
		{
			value: "4690",
			label: "Wonck"
		},
		{
			value: "4700",
			label: "Eupen"
		},
		{
			value: "4701",
			label: "Kettenis"
		},
		{
			value: "4710",
			label: "Lontzen"
		},
		{
			value: "4711",
			label: "Walhorn"
		},
		{
			value: "4720",
			label: "Kelmis/La Calamine"
		},
		{
			value: "4721",
			label: "Neu-Moresnet"
		},
		{
			value: "4728",
			label: "Hergenrath"
		},
		{
			value: "4730",
			label: "Hauset"
		},
		{
			value: "4730",
			label: "Raeren"
		},
		{
			value: "4731",
			label: "Eynatten"
		},
		{
			value: "4750",
			label: "Bütgenbach/Butgenbach"
		},
		{
			value: "4750",
			label: "Elsenborn"
		},
		{
			value: "4760",
			label: "Büllingen/Bullange"
		},
		{
			value: "4760",
			label: "Manderfeld"
		},
		{
			value: "4761",
			label: "Rocherath"
		},
		{
			value: "4770",
			label: "Amel/Amblève"
		},
		{
			value: "4770",
			label: "Meyerode"
		},
		{
			value: "4771",
			label: "Heppenbach"
		},
		{
			value: "4780",
			label: "Recht"
		},
		{
			value: "4780",
			label: "Sankt Vith/Saint-Vith"
		},
		{
			value: "4782",
			label: "Schönberg/Schoenberg"
		},
		{
			value: "4783",
			label: "Lommersweiler"
		},
		{
			value: "4784",
			label: "Crombach"
		},
		{
			value: "4790",
			label: "Burg-Reuland"
		},
		{
			value: "4790",
			label: "Reuland"
		},
		{
			value: "4791",
			label: "Thommen"
		},
		{
			value: "4800",
			label: "Ensival"
		},
		{
			value: "4800",
			label: "Lambermont"
		},
		{
			value: "4800",
			label: "Petit-Rechain"
		},
		{
			value: "4800",
			label: "Verviers"
		},
		{
			value: "4801",
			label: "Stembert"
		},
		{
			value: "4802",
			label: "Heusy"
		},
		{
			value: "4820",
			label: "Dison"
		},
		{
			value: "4821",
			label: "Andrimont"
		},
		{
			value: "4830",
			label: "Limbourg"
		},
		{
			value: "4831",
			label: "Bilstain"
		},
		{
			value: "4834",
			label: "Goé"
		},
		{
			value: "4837",
			label: "Baelen (Lg.)"
		},
		{
			value: "4837",
			label: "Membach"
		},
		{
			value: "4840",
			label: "Welkenraedt"
		},
		{
			value: "4841",
			label: "Henri-Chapelle"
		},
		{
			value: "4845",
			label: "Jalhay"
		},
		{
			value: "4845",
			label: "Sart-lez-Spa"
		},
		{
			value: "4850",
			label: "Montzen"
		},
		{
			value: "4850",
			label: "Moresnet"
		},
		{
			value: "4850",
			label: "Plombières"
		},
		{
			value: "4851",
			label: "Gemmenich"
		},
		{
			value: "4851",
			label: "Sippenaeken"
		},
		{
			value: "4852",
			label: "Hombourg"
		},
		{
			value: "4860",
			label: "Cornesse"
		},
		{
			value: "4860",
			label: "Pepinster"
		},
		{
			value: "4860",
			label: "Wegnez"
		},
		{
			value: "4861",
			label: "Soiron"
		},
		{
			value: "4870",
			label: "Forêt"
		},
		{
			value: "4870",
			label: "Fraipont"
		},
		{
			value: "4870",
			label: "Nessonvaux"
		},
		{
			value: "4870",
			label: "Trooz"
		},
		{
			value: "4877",
			label: "Olne"
		},
		{
			value: "4880",
			label: "Aubel"
		},
		{
			value: "4890",
			label: "Clermont (Lg.)"
		},
		{
			value: "4890",
			label: "Thimister"
		},
		{
			value: "4890",
			label: "Thimister-Clermont"
		},
		{
			value: "4900",
			label: "Spa"
		},
		{
			value: "4910",
			label: "La Reid"
		},
		{
			value: "4910",
			label: "Polleur"
		},
		{
			value: "4910",
			label: "Theux"
		},
		{
			value: "4920",
			label: "Aywaille"
		},
		{
			value: "4920",
			label: "Ernonheid"
		},
		{
			value: "4920",
			label: "Harzé"
		},
		{
			value: "4920",
			label: "Sougné-Remouchamps"
		},
		{
			value: "4950",
			label: "Faymonville"
		},
		{
			value: "4950",
			label: "Robertville"
		},
		{
			value: "4950",
			label: "Sourbrodt"
		},
		{
			value: "4950",
			label: "Waimes/Weismes"
		},
		{
			value: "4960",
			label: "Bellevaux-Ligneuville"
		},
		{
			value: "4960",
			label: "Bevercé"
		},
		{
			value: "4960",
			label: "Malmedy"
		},
		{
			value: "4970",
			label: "Francorchamps"
		},
		{
			value: "4970",
			label: "Stavelot"
		},
		{
			value: "4980",
			label: "Fosse (Lg.)"
		},
		{
			value: "4980",
			label: "Trois-Ponts"
		},
		{
			value: "4980",
			label: "Wanne"
		},
		{
			value: "4983",
			label: "Basse-Bodeux"
		},
		{
			value: "4987",
			label: "Chevron"
		},
		{
			value: "4987",
			label: "La Gleize"
		},
		{
			value: "4987",
			label: "Lorcé"
		},
		{
			value: "4987",
			label: "Rahier"
		},
		{
			value: "4987",
			label: "Stoumont"
		},
		{
			value: "4990",
			label: "Arbrefontaine"
		},
		{
			value: "4990",
			label: "Bra"
		},
		{
			value: "4990",
			label: "Lierneux"
		},
		{
			value: "5000",
			label: "Beez"
		},
		{
			value: "5000",
			label: "Namur"
		},
		{
			value: "5001",
			label: "Belgrade"
		},
		{
			value: "5002",
			label: "Saint-Servais"
		},
		{
			value: "5003",
			label: "Saint-Marc"
		},
		{
			value: "5004",
			label: "Bouge"
		},
		{
			value: "5020",
			label: "Champion"
		},
		{
			value: "5020",
			label: "Daussoulx"
		},
		{
			value: "5020",
			label: "Flawinne"
		},
		{
			value: "5020",
			label: "Malonne"
		},
		{
			value: "5020",
			label: "Suarlée"
		},
		{
			value: "5020",
			label: "Temploux"
		},
		{
			value: "5020",
			label: "Vedrin"
		},
		{
			value: "5021",
			label: "Boninne"
		},
		{
			value: "5022",
			label: "Cognelée"
		},
		{
			value: "5024",
			label: "Gelbressée"
		},
		{
			value: "5024",
			label: "Marche-les-Dames"
		},
		{
			value: "5030",
			label: "Beuzet"
		},
		{
			value: "5030",
			label: "Ernage"
		},
		{
			value: "5030",
			label: "Gembloux"
		},
		{
			value: "5030",
			label: "Grand-Manil"
		},
		{
			value: "5030",
			label: "Lonzée"
		},
		{
			value: "5030",
			label: "Sauvenière"
		},
		{
			value: "5031",
			label: "Grand-Leez"
		},
		{
			value: "5032",
			label: "Bossière"
		},
		{
			value: "5032",
			label: "Bothey"
		},
		{
			value: "5032",
			label: "Corroy-le-Château"
		},
		{
			value: "5032",
			label: "Isnes"
		},
		{
			value: "5032",
			label: "Mazy"
		},
		{
			value: "5060",
			label: "Arsimont"
		},
		{
			value: "5060",
			label: "Auvelais"
		},
		{
			value: "5060",
			label: "Falisolle"
		},
		{
			value: "5060",
			label: "Keumiée"
		},
		{
			value: "5060",
			label: "Moignelée"
		},
		{
			value: "5060",
			label: "Sambreville"
		},
		{
			value: "5060",
			label: "Tamines"
		},
		{
			value: "5060",
			label: "Velaine-sur-Sambre"
		},
		{
			value: "5070",
			label: "Aisemont"
		},
		{
			value: "5070",
			label: "Fosses-la-Ville"
		},
		{
			value: "5070",
			label: "Le Roux"
		},
		{
			value: "5070",
			label: "Sart-Eustache"
		},
		{
			value: "5070",
			label: "Sart-Saint-Laurent"
		},
		{
			value: "5070",
			label: "Vitrival"
		},
		{
			value: "5080",
			label: "Emines"
		},
		{
			value: "5080",
			label: "La Bruyère"
		},
		{
			value: "5080",
			label: "Rhisnes"
		},
		{
			value: "5080",
			label: "Villers-lez-Heest"
		},
		{
			value: "5080",
			label: "Warisoulx"
		},
		{
			value: "5081",
			label: "Bovesse"
		},
		{
			value: "5081",
			label: "Meux"
		},
		{
			value: "5081",
			label: "Saint-Denis-Bovesse"
		},
		{
			value: "5100",
			label: "Dave"
		},
		{
			value: "5100",
			label: "Jambes"
		},
		{
			value: "5100",
			label: "Naninne"
		},
		{
			value: "5100",
			label: "Wépion"
		},
		{
			value: "5100",
			label: "Wierde"
		},
		{
			value: "5101",
			label: "Erpent"
		},
		{
			value: "5101",
			label: "Lives-sur-Meuse"
		},
		{
			value: "5101",
			label: "Loyers"
		},
		{
			value: "5140",
			label: "Boignée"
		},
		{
			value: "5140",
			label: "Ligny"
		},
		{
			value: "5140",
			label: "Sombreffe"
		},
		{
			value: "5140",
			label: "Tongrinne"
		},
		{
			value: "5150",
			label: "Floreffe"
		},
		{
			value: "5150",
			label: "Floriffoux"
		},
		{
			value: "5150",
			label: "Franière"
		},
		{
			value: "5150",
			label: "Soye (Nam.)"
		},
		{
			value: "5170",
			label: "Arbre (Nam.)"
		},
		{
			value: "5170",
			label: "Bois-de-Villers"
		},
		{
			value: "5170",
			label: "Lesve"
		},
		{
			value: "5170",
			label: "Lustin"
		},
		{
			value: "5170",
			label: "Profondeville"
		},
		{
			value: "5170",
			label: "Rivière"
		},
		{
			value: "5190",
			label: "Balâtre"
		},
		{
			value: "5190",
			label: "Ham-sur-Sambre"
		},
		{
			value: "5190",
			label: "Jemeppe-sur-Sambre"
		},
		{
			value: "5190",
			label: "Mornimont"
		},
		{
			value: "5190",
			label: "Moustier-sur-Sambre"
		},
		{
			value: "5190",
			label: "Onoz"
		},
		{
			value: "5190",
			label: "Saint-Martin"
		},
		{
			value: "5190",
			label: "Spy"
		},
		{
			value: "5300",
			label: "Andenne"
		},
		{
			value: "5300",
			label: "Bonneville"
		},
		{
			value: "5300",
			label: "Coutisse"
		},
		{
			value: "5300",
			label: "Landenne"
		},
		{
			value: "5300",
			label: "Maizeret"
		},
		{
			value: "5300",
			label: "Namêche"
		},
		{
			value: "5300",
			label: "Sclayn"
		},
		{
			value: "5300",
			label: "Seilles"
		},
		{
			value: "5300",
			label: "Thon"
		},
		{
			value: "5300",
			label: "Vezin"
		},
		{
			value: "5310",
			label: "Aische-en-Refail"
		},
		{
			value: "5310",
			label: "Bolinne"
		},
		{
			value: "5310",
			label: "Boneffe"
		},
		{
			value: "5310",
			label: "Branchon"
		},
		{
			value: "5310",
			label: "Dhuy"
		},
		{
			value: "5310",
			label: "Eghezée"
		},
		{
			value: "5310",
			label: "Hanret"
		},
		{
			value: "5310",
			label: "Leuze (Nam.)"
		},
		{
			value: "5310",
			label: "Liernu"
		},
		{
			value: "5310",
			label: "Longchamps (Nam.)"
		},
		{
			value: "5310",
			label: "Mehaigne"
		},
		{
			value: "5310",
			label: "Noville-sur-Méhaigne"
		},
		{
			value: "5310",
			label: "Saint-Germain"
		},
		{
			value: "5310",
			label: "Taviers (Nam.)"
		},
		{
			value: "5310",
			label: "Upigny"
		},
		{
			value: "5310",
			label: "Waret-la-Chaussée"
		},
		{
			value: "5330",
			label: "Assesse"
		},
		{
			value: "5330",
			label: "Maillen"
		},
		{
			value: "5330",
			label: "Sart-Bernard"
		},
		{
			value: "5332",
			label: "Crupet"
		},
		{
			value: "5333",
			label: "Sorinne-la-Longue"
		},
		{
			value: "5334",
			label: "Florée"
		},
		{
			value: "5336",
			label: "Courrière"
		},
		{
			value: "5340",
			label: "Faulx-les-Tombes"
		},
		{
			value: "5340",
			label: "Gesves"
		},
		{
			value: "5340",
			label: "Haltinne"
		},
		{
			value: "5340",
			label: "Mozet"
		},
		{
			value: "5340",
			label: "Sorée"
		},
		{
			value: "5350",
			label: "Evelette"
		},
		{
			value: "5350",
			label: "Ohey"
		},
		{
			value: "5351",
			label: "Haillot"
		},
		{
			value: "5352",
			label: "Perwez-Haillot"
		},
		{
			value: "5353",
			label: "Goesnes"
		},
		{
			value: "5354",
			label: "Jallet"
		},
		{
			value: "5360",
			label: "Hamois"
		},
		{
			value: "5360",
			label: "Natoye"
		},
		{
			value: "5361",
			label: "Mohiville"
		},
		{
			value: "5361",
			label: "Scy"
		},
		{
			value: "5362",
			label: "Achet"
		},
		{
			value: "5363",
			label: "Emptinne"
		},
		{
			value: "5364",
			label: "Schaltin"
		},
		{
			value: "5370",
			label: "Barvaux-Condroz"
		},
		{
			value: "5370",
			label: "Flostoy"
		},
		{
			value: "5370",
			label: "Havelange"
		},
		{
			value: "5370",
			label: "Jeneffe (Nam.)"
		},
		{
			value: "5370",
			label: "Porcheresse (Nam.)"
		},
		{
			value: "5370",
			label: "Verlée"
		},
		{
			value: "5372",
			label: "Méan"
		},
		{
			value: "5374",
			label: "Maffe"
		},
		{
			value: "5376",
			label: "Miécret"
		},
		{
			value: "5377",
			label: "Baillonville"
		},
		{
			value: "5377",
			label: "Bonsin"
		},
		{
			value: "5377",
			label: "Heure (Nam.)"
		},
		{
			value: "5377",
			label: "Hogne"
		},
		{
			value: "5377",
			label: "Nettinne"
		},
		{
			value: "5377",
			label: "Noiseux"
		},
		{
			value: "5377",
			label: "Sinsin"
		},
		{
			value: "5377",
			label: "Somme-Leuze"
		},
		{
			value: "5377",
			label: "Waillet"
		},
		{
			value: "5380",
			label: "Bierwart"
		},
		{
			value: "5380",
			label: "Cortil-Wodon"
		},
		{
			value: "5380",
			label: "Fernelmont"
		},
		{
			value: "5380",
			label: "Forville"
		},
		{
			value: "5380",
			label: "Franc-Waret"
		},
		{
			value: "5380",
			label: "Hemptinne (Fernelmont)"
		},
		{
			value: "5380",
			label: "Hingeon"
		},
		{
			value: "5380",
			label: "Marchovelette"
		},
		{
			value: "5380",
			label: "Noville-les-Bois"
		},
		{
			value: "5380",
			label: "Pontillas"
		},
		{
			value: "5380",
			label: "Tillier"
		},
		{
			value: "5500",
			label: "Anseremme"
		},
		{
			value: "5500",
			label: "Bouvignes-sur-Meuse"
		},
		{
			value: "5500",
			label: "Dinant"
		},
		{
			value: "5500",
			label: "Dréhance"
		},
		{
			value: "5500",
			label: "Falmagne"
		},
		{
			value: "5500",
			label: "Falmignoul"
		},
		{
			value: "5500",
			label: "Furfooz"
		},
		{
			value: "5501",
			label: "Lisogne"
		},
		{
			value: "5502",
			label: "Thynes"
		},
		{
			value: "5503",
			label: "Sorinnes"
		},
		{
			value: "5504",
			label: "Foy-Notre-Dame"
		},
		{
			value: "5520",
			label: "Anthée"
		},
		{
			value: "5520",
			label: "Onhaye"
		},
		{
			value: "5521",
			label: "Serville"
		},
		{
			value: "5522",
			label: "Falaën"
		},
		{
			value: "5523",
			label: "Sommière"
		},
		{
			value: "5523",
			label: "Weillen"
		},
		{
			value: "5524",
			label: "Gerin"
		},
		{
			value: "5530",
			label: "Dorinne"
		},
		{
			value: "5530",
			label: "Durnal"
		},
		{
			value: "5530",
			label: "Evrehailles"
		},
		{
			value: "5530",
			label: "Godinne"
		},
		{
			value: "5530",
			label: "Houx"
		},
		{
			value: "5530",
			label: "Mont (Nam.)"
		},
		{
			value: "5530",
			label: "Purnode"
		},
		{
			value: "5530",
			label: "Spontin"
		},
		{
			value: "5530",
			label: "Yvoir"
		},
		{
			value: "5537",
			label: "Anhée"
		},
		{
			value: "5537",
			label: "Annevoie-Rouillon"
		},
		{
			value: "5537",
			label: "Bioul"
		},
		{
			value: "5537",
			label: "Denée"
		},
		{
			value: "5537",
			label: "Haut-le-Wastia"
		},
		{
			value: "5537",
			label: "Sosoye"
		},
		{
			value: "5537",
			label: "Warnant"
		},
		{
			value: "5540",
			label: "Hastière"
		},
		{
			value: "5540",
			label: "Hastière-Lavaux"
		},
		{
			value: "5540",
			label: "Hermeton-sur-Meuse"
		},
		{
			value: "5540",
			label: "Waulsort"
		},
		{
			value: "5541",
			label: "Hastière-par-Delà"
		},
		{
			value: "5542",
			label: "Blaimont"
		},
		{
			value: "5543",
			label: "Heer"
		},
		{
			value: "5544",
			label: "Agimont"
		},
		{
			value: "5550",
			label: "Alle"
		},
		{
			value: "5550",
			label: "Bagimont"
		},
		{
			value: "5550",
			label: "Bohan"
		},
		{
			value: "5550",
			label: "Chairière"
		},
		{
			value: "5550",
			label: "Laforêt"
		},
		{
			value: "5550",
			label: "Membre"
		},
		{
			value: "5550",
			label: "Mouzaive"
		},
		{
			value: "5550",
			label: "Nafraiture"
		},
		{
			value: "5550",
			label: "Orchimont"
		},
		{
			value: "5550",
			label: "Pussemange"
		},
		{
			value: "5550",
			label: "Sugny"
		},
		{
			value: "5550",
			label: "Vresse-sur-Semois"
		},
		{
			value: "5555",
			label: "Baillamont"
		},
		{
			value: "5555",
			label: "Bellefontaine (Nam.)"
		},
		{
			value: "5555",
			label: "Bièvre"
		},
		{
			value: "5555",
			label: "Cornimont"
		},
		{
			value: "5555",
			label: "Graide"
		},
		{
			value: "5555",
			label: "Gros-Fays"
		},
		{
			value: "5555",
			label: "Monceau-en-Ardenne"
		},
		{
			value: "5555",
			label: "Naomé"
		},
		{
			value: "5555",
			label: "Oizy"
		},
		{
			value: "5555",
			label: "Petit-Fays"
		},
		{
			value: "5560",
			label: "Ciergnon"
		},
		{
			value: "5560",
			label: "Finnevaux"
		},
		{
			value: "5560",
			label: "Houyet"
		},
		{
			value: "5560",
			label: "Hulsonniaux"
		},
		{
			value: "5560",
			label: "Mesnil-Eglise"
		},
		{
			value: "5560",
			label: "Mesnil-Saint-Blaise"
		},
		{
			value: "5561",
			label: "Celles (Nam.)"
		},
		{
			value: "5562",
			label: "Custinne"
		},
		{
			value: "5563",
			label: "Hour"
		},
		{
			value: "5564",
			label: "Wanlin"
		},
		{
			value: "5570",
			label: "Baronville"
		},
		{
			value: "5570",
			label: "Beauraing"
		},
		{
			value: "5570",
			label: "Dion"
		},
		{
			value: "5570",
			label: "Felenne"
		},
		{
			value: "5570",
			label: "Feschaux"
		},
		{
			value: "5570",
			label: "Honnay"
		},
		{
			value: "5570",
			label: "Javingue"
		},
		{
			value: "5570",
			label: "Vonêche"
		},
		{
			value: "5570",
			label: "Wancennes"
		},
		{
			value: "5570",
			label: "Winenne"
		},
		{
			value: "5571",
			label: "Wiesme"
		},
		{
			value: "5572",
			label: "Focant"
		},
		{
			value: "5573",
			label: "Martouzin-Neuville"
		},
		{
			value: "5574",
			label: "Pondrôme"
		},
		{
			value: "5575",
			label: "Bourseigne-Neuve"
		},
		{
			value: "5575",
			label: "Bourseigne-Vieille"
		},
		{
			value: "5575",
			label: "Gedinne"
		},
		{
			value: "5575",
			label: "Houdremont"
		},
		{
			value: "5575",
			label: "Louette-Saint-Denis"
		},
		{
			value: "5575",
			label: "Louette-Saint-Pierre"
		},
		{
			value: "5575",
			label: "Malvoisin"
		},
		{
			value: "5575",
			label: "Patignies"
		},
		{
			value: "5575",
			label: "Rienne"
		},
		{
			value: "5575",
			label: "Sart-Custinne"
		},
		{
			value: "5575",
			label: "Vencimont"
		},
		{
			value: "5575",
			label: "Willerzie"
		},
		{
			value: "5576",
			label: "Froidfontaine"
		},
		{
			value: "5580",
			label: "Ave-et-Auffe"
		},
		{
			value: "5580",
			label: "Buissonville"
		},
		{
			value: "5580",
			label: "Eprave"
		},
		{
			value: "5580",
			label: "Han-sur-Lesse"
		},
		{
			value: "5580",
			label: "Jemelle"
		},
		{
			value: "5580",
			label: "Lavaux-Sainte-Anne"
		},
		{
			value: "5580",
			label: "Lessive"
		},
		{
			value: "5580",
			label: "Mont-Gauthier"
		},
		{
			value: "5580",
			label: "Rochefort"
		},
		{
			value: "5580",
			label: "Villers-sur-Lesse"
		},
		{
			value: "5580",
			label: "Wavreille"
		},
		{
			value: "5590",
			label: "Achêne"
		},
		{
			value: "5590",
			label: "Braibant"
		},
		{
			value: "5590",
			label: "Chevetogne"
		},
		{
			value: "5590",
			label: "Ciney"
		},
		{
			value: "5590",
			label: "Conneux"
		},
		{
			value: "5590",
			label: "Haversin"
		},
		{
			value: "5590",
			label: "Leignon"
		},
		{
			value: "5590",
			label: "Pessoux"
		},
		{
			value: "5590",
			label: "Serinchamps"
		},
		{
			value: "5590",
			label: "Sovet"
		},
		{
			value: "5600",
			label: "Fagnolle"
		},
		{
			value: "5600",
			label: "Franchimont"
		},
		{
			value: "5600",
			label: "Jamagne"
		},
		{
			value: "5600",
			label: "Jamiolle"
		},
		{
			value: "5600",
			label: "Merlemont"
		},
		{
			value: "5600",
			label: "Neuville (Philippeville)"
		},
		{
			value: "5600",
			label: "Omezée"
		},
		{
			value: "5600",
			label: "Philippeville"
		},
		{
			value: "5600",
			label: "Roly"
		},
		{
			value: "5600",
			label: "Romedenne"
		},
		{
			value: "5600",
			label: "Samart"
		},
		{
			value: "5600",
			label: "Sart-en-Fagne"
		},
		{
			value: "5600",
			label: "Sautour"
		},
		{
			value: "5600",
			label: "Surice"
		},
		{
			value: "5600",
			label: "Villers-en-Fagne"
		},
		{
			value: "5600",
			label: "Villers-le-Gambon"
		},
		{
			value: "5600",
			label: "Vodecée"
		},
		{
			value: "5620",
			label: "Corenne"
		},
		{
			value: "5620",
			label: "Flavion"
		},
		{
			value: "5620",
			label: "Florennes"
		},
		{
			value: "5620",
			label: "Hemptinne-lez-Florennes"
		},
		{
			value: "5620",
			label: "Morville"
		},
		{
			value: "5620",
			label: "Rosée"
		},
		{
			value: "5620",
			label: "Saint-Aubin"
		},
		{
			value: "5621",
			label: "Hanzinelle"
		},
		{
			value: "5621",
			label: "Hanzinne"
		},
		{
			value: "5621",
			label: "Morialmé"
		},
		{
			value: "5621",
			label: "Thy-le-Bauduin"
		},
		{
			value: "5630",
			label: "Cerfontaine"
		},
		{
			value: "5630",
			label: "Daussois"
		},
		{
			value: "5630",
			label: "Senzeille"
		},
		{
			value: "5630",
			label: "Silenrieux"
		},
		{
			value: "5630",
			label: "Soumoy"
		},
		{
			value: "5630",
			label: "Villers-Deux-Eglises"
		},
		{
			value: "5640",
			label: "Biesme"
		},
		{
			value: "5640",
			label: "Biesmerée"
		},
		{
			value: "5640",
			label: "Graux"
		},
		{
			value: "5640",
			label: "Mettet"
		},
		{
			value: "5640",
			label: "Oret"
		},
		{
			value: "5640",
			label: "Saint-Gérard"
		},
		{
			value: "5641",
			label: "Furnaux"
		},
		{
			value: "5644",
			label: "Ermeton-sur-Biert"
		},
		{
			value: "5646",
			label: "Stave"
		},
		{
			value: "5650",
			label: "Castillon"
		},
		{
			value: "5650",
			label: "Chastrès"
		},
		{
			value: "5650",
			label: "Clermont (Nam.)"
		},
		{
			value: "5650",
			label: "Fontenelle"
		},
		{
			value: "5650",
			label: "Fraire"
		},
		{
			value: "5650",
			label: "Pry"
		},
		{
			value: "5650",
			label: "Vogenée"
		},
		{
			value: "5650",
			label: "Walcourt"
		},
		{
			value: "5650",
			label: "Yves-Gomezée"
		},
		{
			value: "5651",
			label: "Berzée"
		},
		{
			value: "5651",
			label: "Gourdinne"
		},
		{
			value: "5651",
			label: "Laneffe"
		},
		{
			value: "5651",
			label: "Rognée"
		},
		{
			value: "5651",
			label: "Somzée"
		},
		{
			value: "5651",
			label: "Tarcienne"
		},
		{
			value: "5651",
			label: "Thy-le-Château"
		},
		{
			value: "5660",
			label: "Aublain"
		},
		{
			value: "5660",
			label: "Boussu-en-Fagne"
		},
		{
			value: "5660",
			label: "Brûly"
		},
		{
			value: "5660",
			label: "Brûly-de-Pesche"
		},
		{
			value: "5660",
			label: "Couvin"
		},
		{
			value: "5660",
			label: "Cul-des-Sarts"
		},
		{
			value: "5660",
			label: "Dailly"
		},
		{
			value: "5660",
			label: "Frasnes (Nam.)"
		},
		{
			value: "5660",
			label: "Gonrieux"
		},
		{
			value: "5660",
			label: "Mariembourg"
		},
		{
			value: "5660",
			label: "Pesche"
		},
		{
			value: "5660",
			label: "Petigny"
		},
		{
			value: "5660",
			label: "Petite-Chapelle"
		},
		{
			value: "5660",
			label: "Presgaux"
		},
		{
			value: "5670",
			label: "Dourbes"
		},
		{
			value: "5670",
			label: "Le Mesnil"
		},
		{
			value: "5670",
			label: "Mazée"
		},
		{
			value: "5670",
			label: "Nismes"
		},
		{
			value: "5670",
			label: "Oignies-en-Thiérache"
		},
		{
			value: "5670",
			label: "Olloy-sur-Viroin"
		},
		{
			value: "5670",
			label: "Treignes"
		},
		{
			value: "5670",
			label: "Vierves-sur-Viroin"
		},
		{
			value: "5670",
			label: "Viroinval"
		},
		{
			value: "5680",
			label: "Doische"
		},
		{
			value: "5680",
			label: "Gimnée"
		},
		{
			value: "5680",
			label: "Gochenée"
		},
		{
			value: "5680",
			label: "Matagne-la-Grande"
		},
		{
			value: "5680",
			label: "Matagne-la-Petite"
		},
		{
			value: "5680",
			label: "Niverlée"
		},
		{
			value: "5680",
			label: "Romerée"
		},
		{
			value: "5680",
			label: "Soulme"
		},
		{
			value: "5680",
			label: "Vaucelles"
		},
		{
			value: "5680",
			label: "Vodelée"
		},
		{
			value: "6000",
			label: "Charleroi"
		},
		{
			value: "6001",
			label: "Marcinelle"
		},
		{
			value: "6010",
			label: "Couillet"
		},
		{
			value: "6020",
			label: "Dampremy"
		},
		{
			value: "6030",
			label: "Goutroux"
		},
		{
			value: "6030",
			label: "Marchienne-au-Pont"
		},
		{
			value: "6031",
			label: "Monceau-sur-Sambre"
		},
		{
			value: "6032",
			label: "Mont-sur-Marchienne"
		},
		{
			value: "6040",
			label: "Jumet"
		},
		{
			value: "6041",
			label: "Gosselies"
		},
		{
			value: "6042",
			label: "Lodelinsart"
		},
		{
			value: "6043",
			label: "Ransart"
		},
		{
			value: "6044",
			label: "Roux"
		},
		{
			value: "6060",
			label: "Gilly"
		},
		{
			value: "6061",
			label: "Montignies-sur-Sambre"
		},
		{
			value: "6110",
			label: "Montigny-le-Tilleul"
		},
		{
			value: "6111",
			label: "Landelies"
		},
		{
			value: "6120",
			label: "Cour-sur-Heure"
		},
		{
			value: "6120",
			label: "Ham-sur-Heure"
		},
		{
			value: "6120",
			label: "Ham-sur-Heure-Nalinnes"
		},
		{
			value: "6120",
			label: "Jamioulx"
		},
		{
			value: "6120",
			label: "Marbaix (Ht.)"
		},
		{
			value: "6120",
			label: "Nalinnes"
		},
		{
			value: "6140",
			label: "Fontaine-l'Evêque"
		},
		{
			value: "6141",
			label: "Forchies-la-Marche"
		},
		{
			value: "6142",
			label: "Leernes"
		},
		{
			value: "6150",
			label: "Anderlues"
		},
		{
			value: "6180",
			label: "Courcelles"
		},
		{
			value: "6181",
			label: "Gouy-lez-Piéton"
		},
		{
			value: "6182",
			label: "Souvret"
		},
		{
			value: "6183",
			label: "Trazegnies"
		},
		{
			value: "6200",
			label: "Bouffioulx"
		},
		{
			value: "6200",
			label: "Châtelet"
		},
		{
			value: "6200",
			label: "Châtelineau"
		},
		{
			value: "6210",
			label: "Frasnes-lez-Gosselies"
		},
		{
			value: "6210",
			label: "Les Bons Villers"
		},
		{
			value: "6210",
			label: "Rèves"
		},
		{
			value: "6210",
			label: "Villers-Perwin"
		},
		{
			value: "6210",
			label: "Wayaux"
		},
		{
			value: "6211",
			label: "Mellet"
		},
		{
			value: "6220",
			label: "Fleurus"
		},
		{
			value: "6220",
			label: "Heppignies"
		},
		{
			value: "6220",
			label: "Lambusart"
		},
		{
			value: "6220",
			label: "Wangenies"
		},
		{
			value: "6221",
			label: "Saint-Amand"
		},
		{
			value: "6222",
			label: "Brye"
		},
		{
			value: "6223",
			label: "Wagnelée"
		},
		{
			value: "6224",
			label: "Wanfercée-Baulet"
		},
		{
			value: "6230",
			label: "Buzet"
		},
		{
			value: "6230",
			label: "Obaix"
		},
		{
			value: "6230",
			label: "Pont-à-Celles"
		},
		{
			value: "6230",
			label: "Thiméon"
		},
		{
			value: "6230",
			label: "Viesville"
		},
		{
			value: "6238",
			label: "Liberchies"
		},
		{
			value: "6238",
			label: "Luttre"
		},
		{
			value: "6240",
			label: "Farciennes"
		},
		{
			value: "6240",
			label: "Pironchamps"
		},
		{
			value: "6250",
			label: "Aiseau"
		},
		{
			value: "6250",
			label: "Aiseau-Presles"
		},
		{
			value: "6250",
			label: "Pont-de-Loup"
		},
		{
			value: "6250",
			label: "Presles"
		},
		{
			value: "6250",
			label: "Roselies"
		},
		{
			value: "6280",
			label: "Acoz"
		},
		{
			value: "6280",
			label: "Gerpinnes"
		},
		{
			value: "6280",
			label: "Gougnies"
		},
		{
			value: "6280",
			label: "Joncret"
		},
		{
			value: "6280",
			label: "Loverval"
		},
		{
			value: "6280",
			label: "Villers-Poterie"
		},
		{
			value: "6440",
			label: "Boussu-lez-Walcourt"
		},
		{
			value: "6440",
			label: "Fourbechies"
		},
		{
			value: "6440",
			label: "Froidchapelle"
		},
		{
			value: "6440",
			label: "Vergnies"
		},
		{
			value: "6441",
			label: "Erpion"
		},
		{
			value: "6460",
			label: "Bailièvre"
		},
		{
			value: "6460",
			label: "Chimay"
		},
		{
			value: "6460",
			label: "Robechies"
		},
		{
			value: "6460",
			label: "Saint-Remy (Ht.)"
		},
		{
			value: "6460",
			label: "Salles"
		},
		{
			value: "6460",
			label: "Villers-la-Tour"
		},
		{
			value: "6461",
			label: "Virelles"
		},
		{
			value: "6462",
			label: "Vaulx-lez-Chimay"
		},
		{
			value: "6463",
			label: "Lompret"
		},
		{
			value: "6464",
			label: "Baileux"
		},
		{
			value: "6464",
			label: "Bourlers"
		},
		{
			value: "6464",
			label: "Forges"
		},
		{
			value: "6464",
			label: "l'Escaillère"
		},
		{
			value: "6464",
			label: "Rièzes"
		},
		{
			value: "6470",
			label: "Grandrieu"
		},
		{
			value: "6470",
			label: "Montbliart"
		},
		{
			value: "6470",
			label: "Rance"
		},
		{
			value: "6470",
			label: "Sautin"
		},
		{
			value: "6470",
			label: "Sivry"
		},
		{
			value: "6470",
			label: "Sivry-Rance"
		},
		{
			value: "6500",
			label: "Barbençon"
		},
		{
			value: "6500",
			label: "Beaumont"
		},
		{
			value: "6500",
			label: "Leugnies"
		},
		{
			value: "6500",
			label: "Leval-Chaudeville"
		},
		{
			value: "6500",
			label: "Renlies"
		},
		{
			value: "6500",
			label: "Solre-Saint-Géry"
		},
		{
			value: "6500",
			label: "Thirimont"
		},
		{
			value: "6511",
			label: "Strée (Ht.)"
		},
		{
			value: "6530",
			label: "Leers-et-Fosteau"
		},
		{
			value: "6530",
			label: "Thuin"
		},
		{
			value: "6531",
			label: "Biesme-sous-Thuin"
		},
		{
			value: "6532",
			label: "Ragnies"
		},
		{
			value: "6533",
			label: "Biercée"
		},
		{
			value: "6534",
			label: "Gozée"
		},
		{
			value: "6536",
			label: "Donstiennes"
		},
		{
			value: "6536",
			label: "Thuillies"
		},
		{
			value: "6540",
			label: "Lobbes"
		},
		{
			value: "6540",
			label: "Mont-Sainte-Geneviève"
		},
		{
			value: "6542",
			label: "Sars-la-Buissière"
		},
		{
			value: "6543",
			label: "Bienne-lez-Happart"
		},
		{
			value: "6560",
			label: "Bersillies-l'Abbaye"
		},
		{
			value: "6560",
			label: "Erquelinnes"
		},
		{
			value: "6560",
			label: "Grand-Reng"
		},
		{
			value: "6560",
			label: "Hantes-Wihéries"
		},
		{
			value: "6560",
			label: "Montignies-Saint-Christophe"
		},
		{
			value: "6560",
			label: "Solre-sur-Sambre"
		},
		{
			value: "6567",
			label: "Fontaine-Valmont"
		},
		{
			value: "6567",
			label: "Labuissière"
		},
		{
			value: "6567",
			label: "Merbes-le-Château"
		},
		{
			value: "6567",
			label: "Merbes-Sainte-Marie"
		},
		{
			value: "6590",
			label: "Momignies"
		},
		{
			value: "6591",
			label: "Macon"
		},
		{
			value: "6592",
			label: "Monceau-Imbrechies"
		},
		{
			value: "6593",
			label: "Macquenoise"
		},
		{
			value: "6594",
			label: "Beauwelz"
		},
		{
			value: "6596",
			label: "Forges-Philippe"
		},
		{
			value: "6596",
			label: "Seloignes"
		},
		{
			value: "6600",
			label: "Bastogne"
		},
		{
			value: "6600",
			label: "Longvilly"
		},
		{
			value: "6600",
			label: "Noville (Lux.)"
		},
		{
			value: "6600",
			label: "Villers-la-Bonne-Eau"
		},
		{
			value: "6600",
			label: "Wardin"
		},
		{
			value: "6630",
			label: "Martelange"
		},
		{
			value: "6637",
			label: "Fauvillers"
		},
		{
			value: "6637",
			label: "Hollange"
		},
		{
			value: "6637",
			label: "Tintange"
		},
		{
			value: "6640",
			label: "Hompré"
		},
		{
			value: "6640",
			label: "Morhet"
		},
		{
			value: "6640",
			label: "Nives"
		},
		{
			value: "6640",
			label: "Sibret"
		},
		{
			value: "6640",
			label: "Vaux-lez-Rosières"
		},
		{
			value: "6640",
			label: "Vaux-sur-Sûre"
		},
		{
			value: "6642",
			label: "Juseret"
		},
		{
			value: "6660",
			label: "Houffalize"
		},
		{
			value: "6660",
			label: "Nadrin"
		},
		{
			value: "6661",
			label: "Mont (Lux.)"
		},
		{
			value: "6661",
			label: "Tailles"
		},
		{
			value: "6662",
			label: "Tavigny"
		},
		{
			value: "6663",
			label: "Mabompré"
		},
		{
			value: "6666",
			label: "Wibrin"
		},
		{
			value: "6670",
			label: "Gouvy"
		},
		{
			value: "6670",
			label: "Limerlé"
		},
		{
			value: "6671",
			label: "Bovigny"
		},
		{
			value: "6672",
			label: "Beho"
		},
		{
			value: "6673",
			label: "Cherain"
		},
		{
			value: "6674",
			label: "Montleban"
		},
		{
			value: "6680",
			label: "Amberloup"
		},
		{
			value: "6680",
			label: "Sainte-Ode"
		},
		{
			value: "6680",
			label: "Tillet"
		},
		{
			value: "6681",
			label: "Lavacherie"
		},
		{
			value: "6686",
			label: "Flamierge"
		},
		{
			value: "6687",
			label: "Bertogne"
		},
		{
			value: "6688",
			label: "Longchamps (Lux.)"
		},
		{
			value: "6690",
			label: "Bihain"
		},
		{
			value: "6690",
			label: "Vielsalm"
		},
		{
			value: "6692",
			label: "Petit-Thier"
		},
		{
			value: "6698",
			label: "Grand-Halleux"
		},
		{
			value: "6700",
			label: "Arlon"
		},
		{
			value: "6700",
			label: "Bonnert"
		},
		{
			value: "6700",
			label: "Heinsch"
		},
		{
			value: "6700",
			label: "Toernich"
		},
		{
			value: "6704",
			label: "Guirsch"
		},
		{
			value: "6706",
			label: "Autelbas"
		},
		{
			value: "6717",
			label: "Attert"
		},
		{
			value: "6717",
			label: "Nobressart"
		},
		{
			value: "6717",
			label: "Nothomb"
		},
		{
			value: "6717",
			label: "Thiaumont"
		},
		{
			value: "6717",
			label: "Tontelange"
		},
		{
			value: "6720",
			label: "Habay"
		},
		{
			value: "6720",
			label: "Habay-la-Neuve"
		},
		{
			value: "6720",
			label: "Hachy"
		},
		{
			value: "6721",
			label: "Anlier"
		},
		{
			value: "6723",
			label: "Habay-la-Vieille"
		},
		{
			value: "6724",
			label: "Houdemont"
		},
		{
			value: "6724",
			label: "Marbehan (gehucht van Rulles)"
		},
		{
			value: "6724",
			label: "Rulles"
		},
		{
			value: "6730",
			label: "Bellefontaine (Lux.)"
		},
		{
			value: "6730",
			label: "Rossignol"
		},
		{
			value: "6730",
			label: "Saint-Vincent"
		},
		{
			value: "6730",
			label: "Tintigny"
		},
		{
			value: "6740",
			label: "Etalle"
		},
		{
			value: "6740",
			label: "Sainte-Marie-sur-Semois"
		},
		{
			value: "6740",
			label: "Villers-sur-Semois"
		},
		{
			value: "6741",
			label: "Vance"
		},
		{
			value: "6742",
			label: "Chantemelle"
		},
		{
			value: "6743",
			label: "Buzenol"
		},
		{
			value: "6747",
			label: "Châtillon"
		},
		{
			value: "6747",
			label: "Meix-le-Tige"
		},
		{
			value: "6747",
			label: "Saint-Léger (Lux.)"
		},
		{
			value: "6750",
			label: "Musson"
		},
		{
			value: "6750",
			label: "Mussy-la-Ville"
		},
		{
			value: "6750",
			label: "Signeulx"
		},
		{
			value: "6760",
			label: "Bleid"
		},
		{
			value: "6760",
			label: "Ethe"
		},
		{
			value: "6760",
			label: "Ruette"
		},
		{
			value: "6760",
			label: "Virton"
		},
		{
			value: "6761",
			label: "Latour"
		},
		{
			value: "6762",
			label: "Saint-Mard"
		},
		{
			value: "6767",
			label: "Dampicourt"
		},
		{
			value: "6767",
			label: "Harnoncourt"
		},
		{
			value: "6767",
			label: "Lamorteau"
		},
		{
			value: "6767",
			label: "Rouvroy"
		},
		{
			value: "6767",
			label: "Torgny"
		},
		{
			value: "6769",
			label: "Gérouville"
		},
		{
			value: "6769",
			label: "Meix-devant-Virton"
		},
		{
			value: "6769",
			label: "Robelmont"
		},
		{
			value: "6769",
			label: "Sommethonne"
		},
		{
			value: "6769",
			label: "Villers-la-Loue"
		},
		{
			value: "6780",
			label: "Hondelange"
		},
		{
			value: "6780",
			label: "Messancy"
		},
		{
			value: "6780",
			label: "Wolkrange"
		},
		{
			value: "6781",
			label: "Sélange"
		},
		{
			value: "6782",
			label: "Habergy"
		},
		{
			value: "6790",
			label: "Aubange"
		},
		{
			value: "6791",
			label: "Athus"
		},
		{
			value: "6792",
			label: "Halanzy"
		},
		{
			value: "6792",
			label: "Rachecourt"
		},
		{
			value: "6800",
			label: "Bras"
		},
		{
			value: "6800",
			label: "Freux"
		},
		{
			value: "6800",
			label: "Libramont"
		},
		{
			value: "6800",
			label: "Libramont-Chevigny"
		},
		{
			value: "6800",
			label: "Moircy"
		},
		{
			value: "6800",
			label: "Recogne"
		},
		{
			value: "6800",
			label: "Remagne"
		},
		{
			value: "6800",
			label: "Sainte-Marie-Chevigny"
		},
		{
			value: "6800",
			label: "Saint-Pierre"
		},
		{
			value: "6810",
			label: "Chiny"
		},
		{
			value: "6810",
			label: "Izel"
		},
		{
			value: "6810",
			label: "Jamoigne"
		},
		{
			value: "6811",
			label: "Les Bulles"
		},
		{
			value: "6812",
			label: "Suxy"
		},
		{
			value: "6813",
			label: "Termes"
		},
		{
			value: "6820",
			label: "Florenville"
		},
		{
			value: "6820",
			label: "Fontenoille"
		},
		{
			value: "6820",
			label: "Muno"
		},
		{
			value: "6820",
			label: "Sainte-Cécile"
		},
		{
			value: "6821",
			label: "Lacuisine"
		},
		{
			value: "6823",
			label: "Villers-devant-Orval"
		},
		{
			value: "6824",
			label: "Chassepierre"
		},
		{
			value: "6830",
			label: "Bouillon"
		},
		{
			value: "6830",
			label: "Les Hayons"
		},
		{
			value: "6830",
			label: "Poupehan"
		},
		{
			value: "6830",
			label: "Rochehaut"
		},
		{
			value: "6831",
			label: "Noirefontaine"
		},
		{
			value: "6832",
			label: "Sensenruth"
		},
		{
			value: "6833",
			label: "Ucimont"
		},
		{
			value: "6833",
			label: "Vivy"
		},
		{
			value: "6834",
			label: "Bellevaux"
		},
		{
			value: "6836",
			label: "Dohan"
		},
		{
			value: "6838",
			label: "Corbion"
		},
		{
			value: "6840",
			label: "Grandvoir"
		},
		{
			value: "6840",
			label: "Grapfontaine"
		},
		{
			value: "6840",
			label: "Hamipré"
		},
		{
			value: "6840",
			label: "Longlier"
		},
		{
			value: "6840",
			label: "Neufchâteau"
		},
		{
			value: "6840",
			label: "Tournay"
		},
		{
			value: "6850",
			label: "Carlsbourg"
		},
		{
			value: "6850",
			label: "Offagne"
		},
		{
			value: "6850",
			label: "Paliseul"
		},
		{
			value: "6851",
			label: "Nollevaux"
		},
		{
			value: "6852",
			label: "Maissin"
		},
		{
			value: "6852",
			label: "Opont"
		},
		{
			value: "6853",
			label: "Framont"
		},
		{
			value: "6856",
			label: "Fays-les-Veneurs"
		},
		{
			value: "6860",
			label: "Assenois"
		},
		{
			value: "6860",
			label: "Ebly"
		},
		{
			value: "6860",
			label: "Léglise"
		},
		{
			value: "6860",
			label: "Mellier"
		},
		{
			value: "6860",
			label: "Witry"
		},
		{
			value: "6870",
			label: "Arville"
		},
		{
			value: "6870",
			label: "Awenne"
		},
		{
			value: "6870",
			label: "Hatrival"
		},
		{
			value: "6870",
			label: "Mirwart"
		},
		{
			value: "6870",
			label: "Saint-Hubert"
		},
		{
			value: "6870",
			label: "Vesqueville"
		},
		{
			value: "6880",
			label: "Auby-sur-Semois"
		},
		{
			value: "6880",
			label: "Bertrix"
		},
		{
			value: "6880",
			label: "Cugnon"
		},
		{
			value: "6880",
			label: "Jehonville"
		},
		{
			value: "6880",
			label: "Orgeo"
		},
		{
			value: "6887",
			label: "Herbeumont"
		},
		{
			value: "6887",
			label: "Saint-Médard"
		},
		{
			value: "6887",
			label: "Straimont"
		},
		{
			value: "6890",
			label: "Anloy"
		},
		{
			value: "6890",
			label: "Libin"
		},
		{
			value: "6890",
			label: "Ochamps"
		},
		{
			value: "6890",
			label: "Redu"
		},
		{
			value: "6890",
			label: "Smuid"
		},
		{
			value: "6890",
			label: "Transinne"
		},
		{
			value: "6890",
			label: "Villance"
		},
		{
			value: "6900",
			label: "Aye"
		},
		{
			value: "6900",
			label: "Hargimont"
		},
		{
			value: "6900",
			label: "Humain"
		},
		{
			value: "6900",
			label: "Marche-en-Famenne"
		},
		{
			value: "6900",
			label: "On"
		},
		{
			value: "6900",
			label: "Roy"
		},
		{
			value: "6900",
			label: "Waha"
		},
		{
			value: "6920",
			label: "Sohier"
		},
		{
			value: "6920",
			label: "Wellin"
		},
		{
			value: "6921",
			label: "Chanly"
		},
		{
			value: "6922",
			label: "Halma"
		},
		{
			value: "6924",
			label: "Lomprez"
		},
		{
			value: "6927",
			label: "Bure"
		},
		{
			value: "6927",
			label: "Grupont"
		},
		{
			value: "6927",
			label: "Resteigne"
		},
		{
			value: "6927",
			label: "Tellin"
		},
		{
			value: "6929",
			label: "Daverdisse"
		},
		{
			value: "6929",
			label: "Gembes"
		},
		{
			value: "6929",
			label: "Haut-Fays"
		},
		{
			value: "6929",
			label: "Porcheresse (Lux.)"
		},
		{
			value: "6940",
			label: "Barvaux-sur-Ourthe"
		},
		{
			value: "6940",
			label: "Durbuy"
		},
		{
			value: "6940",
			label: "Grandhan"
		},
		{
			value: "6940",
			label: "Septon"
		},
		{
			value: "6940",
			label: "Wéris"
		},
		{
			value: "6941",
			label: "Bende"
		},
		{
			value: "6941",
			label: "Bomal-sur-Ourthe"
		},
		{
			value: "6941",
			label: "Borlon"
		},
		{
			value: "6941",
			label: "Heyd"
		},
		{
			value: "6941",
			label: "Izier"
		},
		{
			value: "6941",
			label: "Tohogne"
		},
		{
			value: "6941",
			label: "Villers-Sainte-Gertrude"
		},
		{
			value: "6950",
			label: "Harsin"
		},
		{
			value: "6950",
			label: "Nassogne"
		},
		{
			value: "6951",
			label: "Bande"
		},
		{
			value: "6952",
			label: "Grune"
		},
		{
			value: "6953",
			label: "Ambly"
		},
		{
			value: "6953",
			label: "Forrières"
		},
		{
			value: "6953",
			label: "Lesterny"
		},
		{
			value: "6953",
			label: "Masbourg"
		},
		{
			value: "6960",
			label: "Dochamps"
		},
		{
			value: "6960",
			label: "Grandmenil"
		},
		{
			value: "6960",
			label: "Harre"
		},
		{
			value: "6960",
			label: "Malempré"
		},
		{
			value: "6960",
			label: "Manhay"
		},
		{
			value: "6960",
			label: "Odeigne"
		},
		{
			value: "6960",
			label: "Vaux-Chavanne"
		},
		{
			value: "6970",
			label: "Tenneville"
		},
		{
			value: "6971",
			label: "Champlon"
		},
		{
			value: "6972",
			label: "Erneuville"
		},
		{
			value: "6980",
			label: "Beausaint"
		},
		{
			value: "6980",
			label: "La-Roche-en-Ardenne"
		},
		{
			value: "6982",
			label: "Samrée"
		},
		{
			value: "6983",
			label: "Ortho"
		},
		{
			value: "6984",
			label: "Hives"
		},
		{
			value: "6986",
			label: "Halleux"
		},
		{
			value: "6987",
			label: "Beffe"
		},
		{
			value: "6987",
			label: "Hodister"
		},
		{
			value: "6987",
			label: "Marcourt"
		},
		{
			value: "6987",
			label: "Rendeux"
		},
		{
			value: "6990",
			label: "Fronville"
		},
		{
			value: "6990",
			label: "Hampteau"
		},
		{
			value: "6990",
			label: "Hotton"
		},
		{
			value: "6990",
			label: "Marenne"
		},
		{
			value: "6997",
			label: "Amonines"
		},
		{
			value: "6997",
			label: "Erezée"
		},
		{
			value: "6997",
			label: "Mormont"
		},
		{
			value: "6997",
			label: "Soy"
		},
		{
			value: "7000",
			label: "Mons"
		},
		{
			value: "7011",
			label: "Ghlin"
		},
		{
			value: "7012",
			label: "Flénu"
		},
		{
			value: "7012",
			label: "Jemappes"
		},
		{
			value: "7020",
			label: "Maisières"
		},
		{
			value: "7020",
			label: "Nimy"
		},
		{
			value: "7021",
			label: "Havré"
		},
		{
			value: "7022",
			label: "Harmignies"
		},
		{
			value: "7022",
			label: "Harveng"
		},
		{
			value: "7022",
			label: "Hyon"
		},
		{
			value: "7022",
			label: "Mesvin"
		},
		{
			value: "7022",
			label: "Nouvelles"
		},
		{
			value: "7024",
			label: "Ciply"
		},
		{
			value: "7030",
			label: "Saint-Symphorien"
		},
		{
			value: "7031",
			label: "Villers-Saint-Ghislain"
		},
		{
			value: "7032",
			label: "Spiennes"
		},
		{
			value: "7033",
			label: "Cuesmes"
		},
		{
			value: "7034",
			label: "Obourg"
		},
		{
			value: "7034",
			label: "Saint-Denis (Ht.)"
		},
		{
			value: "7040",
			label: "Asquillies"
		},
		{
			value: "7040",
			label: "Aulnois"
		},
		{
			value: "7040",
			label: "Blaregnies"
		},
		{
			value: "7040",
			label: "Bougnies"
		},
		{
			value: "7040",
			label: "Genly"
		},
		{
			value: "7040",
			label: "Goegnies-Chaussée"
		},
		{
			value: "7040",
			label: "Quévy"
		},
		{
			value: "7040",
			label: "Quévy-le-Grand"
		},
		{
			value: "7040",
			label: "Quévy-le-Petit"
		},
		{
			value: "7041",
			label: "Givry"
		},
		{
			value: "7041",
			label: "Havay"
		},
		{
			value: "7050",
			label: "Erbaut"
		},
		{
			value: "7050",
			label: "Erbisoeul"
		},
		{
			value: "7050",
			label: "Herchies"
		},
		{
			value: "7050",
			label: "Jurbise"
		},
		{
			value: "7050",
			label: "Masnuy-Saint-Jean (Jurbise)"
		},
		{
			value: "7050",
			label: "Masnuy-Saint-Pierre"
		},
		{
			value: "7060",
			label: "Horrues"
		},
		{
			value: "7060",
			label: "Soignies"
		},
		{
			value: "7061",
			label: "Casteau (Soignies)"
		},
		{
			value: "7061",
			label: "Thieusies"
		},
		{
			value: "7062",
			label: "Naast"
		},
		{
			value: "7063",
			label: "Chaussée-Notre-Dame-Louvignies"
		},
		{
			value: "7063",
			label: "Neufvilles"
		},
		{
			value: "7070",
			label: "Gottignies"
		},
		{
			value: "7070",
			label: "Le Roeulx"
		},
		{
			value: "7070",
			label: "Mignault"
		},
		{
			value: "7070",
			label: "Thieu"
		},
		{
			value: "7070",
			label: "Ville-sur-Haine (Le Roeulx)"
		},
		{
			value: "7080",
			label: "Eugies (Frameries)"
		},
		{
			value: "7080",
			label: "Frameries"
		},
		{
			value: "7080",
			label: "La Bouverie"
		},
		{
			value: "7080",
			label: "Noirchain"
		},
		{
			value: "7080",
			label: "Sars-la-Bruyère"
		},
		{
			value: "7090",
			label: "Braine-le-Comte"
		},
		{
			value: "7090",
			label: "Hennuyères"
		},
		{
			value: "7090",
			label: "Henripont"
		},
		{
			value: "7090",
			label: "Petit-Roeulx-lez-Braine"
		},
		{
			value: "7090",
			label: "Ronquières"
		},
		{
			value: "7090",
			label: "Steenkerque (Ht.)"
		},
		{
			value: "7100",
			label: "Haine-Saint-Paul"
		},
		{
			value: "7100",
			label: "Haine-Saint-Pierre"
		},
		{
			value: "7100",
			label: "La Louvière"
		},
		{
			value: "7100",
			label: "Saint-Vaast"
		},
		{
			value: "7100",
			label: "Trivières"
		},
		{
			value: "7110",
			label: "Boussoit"
		},
		{
			value: "7110",
			label: "Houdeng-Aimeries"
		},
		{
			value: "7110",
			label: "Houdeng-Goegnies"
		},
		{
			value: "7110",
			label: "Maurage"
		},
		{
			value: "7110",
			label: "Strépy-Bracquegnies"
		},
		{
			value: "7120",
			label: "Croix-lez-Rouveroy"
		},
		{
			value: "7120",
			label: "Estinnes"
		},
		{
			value: "7120",
			label: "Estinnes-au-Mont"
		},
		{
			value: "7120",
			label: "Estinnes-au-Val"
		},
		{
			value: "7120",
			label: "Fauroeulx"
		},
		{
			value: "7120",
			label: "Haulchin"
		},
		{
			value: "7120",
			label: "Peissant"
		},
		{
			value: "7120",
			label: "Rouveroy (Ht.)"
		},
		{
			value: "7120",
			label: "Vellereille-les-Brayeux"
		},
		{
			value: "7120",
			label: "Vellereille-le-Sec"
		},
		{
			value: "7130",
			label: "Battignies"
		},
		{
			value: "7130",
			label: "Binche"
		},
		{
			value: "7130",
			label: "Bray"
		},
		{
			value: "7131",
			label: "Waudrez"
		},
		{
			value: "7133",
			label: "Buvrinnes"
		},
		{
			value: "7134",
			label: "Epinois"
		},
		{
			value: "7134",
			label: "Leval-Trahegnies"
		},
		{
			value: "7134",
			label: "Péronnes-lez-Binche"
		},
		{
			value: "7134",
			label: "Ressaix"
		},
		{
			value: "7140",
			label: "Morlanwelz"
		},
		{
			value: "7140",
			label: "Morlanwelz-Mariemont"
		},
		{
			value: "7141",
			label: "Carnières"
		},
		{
			value: "7141",
			label: "Mont-Sainte-Aldegonde"
		},
		{
			value: "7160",
			label: "Chapelle-lez-Herlaimont"
		},
		{
			value: "7160",
			label: "Godarville"
		},
		{
			value: "7160",
			label: "Piéton"
		},
		{
			value: "7170",
			label: "Bellecourt"
		},
		{
			value: "7170",
			label: "Bois-d'Haine"
		},
		{
			value: "7170",
			label: "Fayt-lez-Manage"
		},
		{
			value: "7170",
			label: "La Hestre"
		},
		{
			value: "7170",
			label: "Manage"
		},
		{
			value: "7180",
			label: "Seneffe"
		},
		{
			value: "7181",
			label: "Arquennes"
		},
		{
			value: "7181",
			label: "Familleureux"
		},
		{
			value: "7181",
			label: "Feluy"
		},
		{
			value: "7181",
			label: "Petit-Roeulx-lez-Nivelles"
		},
		{
			value: "7190",
			label: "Ecaussinnes"
		},
		{
			value: "7190",
			label: "Ecaussinnes-d'Enghien"
		},
		{
			value: "7190",
			label: "Marche-lez-Ecaussinnes"
		},
		{
			value: "7191",
			label: "Ecaussinnes-Lalaing"
		},
		{
			value: "7300",
			label: "Boussu"
		},
		{
			value: "7301",
			label: "Hornu"
		},
		{
			value: "7320",
			label: "Bernissart"
		},
		{
			value: "7321",
			label: "Blaton"
		},
		{
			value: "7321",
			label: "Harchies"
		},
		{
			value: "7322",
			label: "Pommeroeul"
		},
		{
			value: "7322",
			label: "Ville-Pommeroeul"
		},
		{
			value: "7330",
			label: "Saint-Ghislain"
		},
		{
			value: "7331",
			label: "Baudour"
		},
		{
			value: "7332",
			label: "Neufmaison"
		},
		{
			value: "7332",
			label: "Sirault"
		},
		{
			value: "7333",
			label: "Tertre"
		},
		{
			value: "7334",
			label: "Hautrage"
		},
		{
			value: "7334",
			label: "Villerot"
		},
		{
			value: "7340",
			label: "Colfontaine"
		},
		{
			value: "7340",
			label: "Paturages"
		},
		{
			value: "7340",
			label: "Warquignies"
		},
		{
			value: "7340",
			label: "Wasmes"
		},
		{
			value: "7350",
			label: "Hainin"
		},
		{
			value: "7350",
			label: "Hensies"
		},
		{
			value: "7350",
			label: "Montroeul-sur-Haine"
		},
		{
			value: "7350",
			label: "Thulin"
		},
		{
			value: "7370",
			label: "Blaugies"
		},
		{
			value: "7370",
			label: "Dour"
		},
		{
			value: "7370",
			label: "Elouges"
		},
		{
			value: "7370",
			label: "Wihéries"
		},
		{
			value: "7380",
			label: "Baisieux"
		},
		{
			value: "7380",
			label: "Quiévrain"
		},
		{
			value: "7382",
			label: "Audregnies"
		},
		{
			value: "7387",
			label: "Angre"
		},
		{
			value: "7387",
			label: "Angreau"
		},
		{
			value: "7387",
			label: "Athis"
		},
		{
			value: "7387",
			label: "Autreppe"
		},
		{
			value: "7387",
			label: "Erquennes"
		},
		{
			value: "7387",
			label: "Fayt-le-Franc"
		},
		{
			value: "7387",
			label: "Honnelles"
		},
		{
			value: "7387",
			label: "Marchipont"
		},
		{
			value: "7387",
			label: "Montignies-sur-Roc"
		},
		{
			value: "7387",
			label: "Onnezies"
		},
		{
			value: "7387",
			label: "Roisin"
		},
		{
			value: "7390",
			label: "Quaregnon"
		},
		{
			value: "7390",
			label: "Wasmuel"
		},
		{
			value: "7500",
			label: "Ere"
		},
		{
			value: "7500",
			label: "Saint-Maur"
		},
		{
			value: "7500",
			label: "Tournai"
		},
		{
			value: "7501",
			label: "Orcq"
		},
		{
			value: "7502",
			label: "Esplechin"
		},
		{
			value: "7503",
			label: "Froyennes"
		},
		{
			value: "7504",
			label: "Froidmont"
		},
		{
			value: "7506",
			label: "Willemeau"
		},
		{
			value: "7520",
			label: "Ramegnies-Chin"
		},
		{
			value: "7520",
			label: "Templeuve"
		},
		{
			value: "7521",
			label: "Chercq"
		},
		{
			value: "7522",
			label: "Blandain"
		},
		{
			value: "7522",
			label: "Hertain"
		},
		{
			value: "7522",
			label: "Lamain"
		},
		{
			value: "7522",
			label: "Marquain"
		},
		{
			value: "7530",
			label: "Gaurain-Ramecroix"
		},
		{
			value: "7531",
			label: "Havinnes"
		},
		{
			value: "7532",
			label: "Beclers"
		},
		{
			value: "7533",
			label: "Thimougies"
		},
		{
			value: "7534",
			label: "Barry"
		},
		{
			value: "7534",
			label: "Maulde"
		},
		{
			value: "7536",
			label: "Vaulx"
		},
		{
			value: "7538",
			label: "Vezon"
		},
		{
			value: "7540",
			label: "Kain"
		},
		{
			value: "7540",
			label: "Melles"
		},
		{
			value: "7540",
			label: "Quartes"
		},
		{
			value: "7540",
			label: "Rumillies"
		},
		{
			value: "7542",
			label: "Mont-Saint-Aubert"
		},
		{
			value: "7543",
			label: "Mourcourt"
		},
		{
			value: "7548",
			label: "Warchin"
		},
		{
			value: "7600",
			label: "Péruwelz"
		},
		{
			value: "7601",
			label: "Roucourt"
		},
		{
			value: "7602",
			label: "Bury"
		},
		{
			value: "7603",
			label: "Bon-Secours"
		},
		{
			value: "7604",
			label: "Baugnies"
		},
		{
			value: "7604",
			label: "Braffe"
		},
		{
			value: "7604",
			label: "Brasmenil"
		},
		{
			value: "7604",
			label: "Callenelle"
		},
		{
			value: "7604",
			label: "Wasmes-Audemez-Briffoeil"
		},
		{
			value: "7608",
			label: "Wiers"
		},
		{
			value: "7610",
			label: "Rumes"
		},
		{
			value: "7611",
			label: "La Glanerie"
		},
		{
			value: "7618",
			label: "Taintignies"
		},
		{
			value: "7620",
			label: "Bléharies"
		},
		{
			value: "7620",
			label: "Brunehaut"
		},
		{
			value: "7620",
			label: "Guignies"
		},
		{
			value: "7620",
			label: "Hollain"
		},
		{
			value: "7620",
			label: "Jollain-Merlin"
		},
		{
			value: "7620",
			label: "Wez-Velvain"
		},
		{
			value: "7621",
			label: "Lesdain"
		},
		{
			value: "7622",
			label: "Laplaigne"
		},
		{
			value: "7623",
			label: "Rongy"
		},
		{
			value: "7624",
			label: "Howardries"
		},
		{
			value: "7640",
			label: "Antoing"
		},
		{
			value: "7640",
			label: "Maubray"
		},
		{
			value: "7640",
			label: "Péronnes-lez-Antoing"
		},
		{
			value: "7641",
			label: "Bruyelle"
		},
		{
			value: "7642",
			label: "Calonne"
		},
		{
			value: "7643",
			label: "Fontenoy"
		},
		{
			value: "7700",
			label: "Luingne"
		},
		{
			value: "7700",
			label: "Mouscron/Moeskroen"
		},
		{
			value: "7711",
			label: "Dottignies/Dottenijs"
		},
		{
			value: "7712",
			label: "Herseaux"
		},
		{
			value: "7730",
			label: "Bailleul"
		},
		{
			value: "7730",
			label: "Estaimbourg"
		},
		{
			value: "7730",
			label: "Estaimpuis"
		},
		{
			value: "7730",
			label: "Evregnies"
		},
		{
			value: "7730",
			label: "Leers-Nord"
		},
		{
			value: "7730",
			label: "Néchin"
		},
		{
			value: "7730",
			label: "Saint-Léger (Ht.)"
		},
		{
			value: "7740",
			label: "Pecq"
		},
		{
			value: "7740",
			label: "Warcoing"
		},
		{
			value: "7742",
			label: "Hérinnes-lez-Pecq"
		},
		{
			value: "7743",
			label: "Esquelmes"
		},
		{
			value: "7743",
			label: "Obigies"
		},
		{
			value: "7750",
			label: "Amougies"
		},
		{
			value: "7750",
			label: "Anseroeul"
		},
		{
			value: "7750",
			label: "Mont-de-l'Enclus"
		},
		{
			value: "7750",
			label: "Orroir"
		},
		{
			value: "7750",
			label: "Russeignies"
		},
		{
			value: "7760",
			label: "Celles (Ht.)"
		},
		{
			value: "7760",
			label: "Escanaffles"
		},
		{
			value: "7760",
			label: "Molenbaix"
		},
		{
			value: "7760",
			label: "Popuelles"
		},
		{
			value: "7760",
			label: "Pottes"
		},
		{
			value: "7760",
			label: "Velaines"
		},
		{
			value: "7780",
			label: "Comines/Komen"
		},
		{
			value: "7780",
			label: "Comines-Warneton/Komen-Waasten"
		},
		{
			value: "7781",
			label: "Houthem (Comines/Komen)"
		},
		{
			value: "7782",
			label: "Ploegsteert"
		},
		{
			value: "7783",
			label: "Bizet"
		},
		{
			value: "7784",
			label: "Bas-Warneton/Neerwaasten"
		},
		{
			value: "7784",
			label: "Warneton/Waasten"
		},
		{
			value: "7800",
			label: "Ath"
		},
		{
			value: "7800",
			label: "Lanquesaint"
		},
		{
			value: "7801",
			label: "Irchonwelz"
		},
		{
			value: "7802",
			label: "Ormeignies"
		},
		{
			value: "7803",
			label: "Bouvignies"
		},
		{
			value: "7804",
			label: "Ostiches"
		},
		{
			value: "7804",
			label: "Rebaix"
		},
		{
			value: "7810",
			label: "Maffle"
		},
		{
			value: "7811",
			label: "Arbre (Ht.)"
		},
		{
			value: "7812",
			label: "Houtaing"
		},
		{
			value: "7812",
			label: "Ligne"
		},
		{
			value: "7812",
			label: "Mainvault"
		},
		{
			value: "7812",
			label: "Moulbaix"
		},
		{
			value: "7812",
			label: "Villers-Notre-Dame"
		},
		{
			value: "7812",
			label: "Villers-Saint-Amand"
		},
		{
			value: "7822",
			label: "Ghislenghien"
		},
		{
			value: "7822",
			label: "Isières"
		},
		{
			value: "7822",
			label: "Meslin-l'Evêque"
		},
		{
			value: "7823",
			label: "Gibecq"
		},
		{
			value: "7830",
			label: "Bassilly"
		},
		{
			value: "7830",
			label: "Fouleng"
		},
		{
			value: "7830",
			label: "Gondregnies"
		},
		{
			value: "7830",
			label: "Graty"
		},
		{
			value: "7830",
			label: "Hellebecq"
		},
		{
			value: "7830",
			label: "Hoves (Ht.)"
		},
		{
			value: "7830",
			label: "Silly"
		},
		{
			value: "7830",
			label: "Thoricourt"
		},
		{
			value: "7850",
			label: "Enghien/Edingen"
		},
		{
			value: "7850",
			label: "Marcq/Mark"
		},
		{
			value: "7850",
			label: "Petit-Enghien/Lettelingen"
		},
		{
			value: "7860",
			label: "Lessines"
		},
		{
			value: "7861",
			label: "Papignies"
		},
		{
			value: "7861",
			label: "Wannebecq"
		},
		{
			value: "7862",
			label: "Ogy"
		},
		{
			value: "7863",
			label: "Ghoy"
		},
		{
			value: "7864",
			label: "Deux-Acren"
		},
		{
			value: "7866",
			label: "Bois-de-Lessines"
		},
		{
			value: "7866",
			label: "Ollignies"
		},
		{
			value: "7870",
			label: "Bauffe"
		},
		{
			value: "7870",
			label: "Cambron-Saint-Vincent"
		},
		{
			value: "7870",
			label: "Lens"
		},
		{
			value: "7870",
			label: "Lombise"
		},
		{
			value: "7870",
			label: "Montignies-lez-Lens"
		},
		{
			value: "7880",
			label: "Flobecq/Vloesberg"
		},
		{
			value: "7890",
			label: "Ellezelles"
		},
		{
			value: "7890",
			label: "Lahamaide"
		},
		{
			value: "7890",
			label: "Wodecq"
		},
		{
			value: "7900",
			label: "Grandmetz"
		},
		{
			value: "7900",
			label: "Leuze-en-Hainaut"
		},
		{
			value: "7901",
			label: "Thieulain"
		},
		{
			value: "7903",
			label: "Blicquy"
		},
		{
			value: "7903",
			label: "Chapelle-à-Oie"
		},
		{
			value: "7903",
			label: "Chapelle-à-Wattines"
		},
		{
			value: "7904",
			label: "Pipaix"
		},
		{
			value: "7904",
			label: "Tourpes"
		},
		{
			value: "7904",
			label: "Willaupuis"
		},
		{
			value: "7906",
			label: "Gallaix"
		},
		{
			value: "7910",
			label: "Anvaing"
		},
		{
			value: "7910",
			label: "Arc-Ainières"
		},
		{
			value: "7910",
			label: "Arc-Wattripont"
		},
		{
			value: "7910",
			label: "Cordes"
		},
		{
			value: "7910",
			label: "Ellignies-lez-Frasnes"
		},
		{
			value: "7910",
			label: "Forest (Ht.)"
		},
		{
			value: "7910",
			label: "Frasnes-lez-Anvaing"
		},
		{
			value: "7910",
			label: "Wattripont"
		},
		{
			value: "7911",
			label: "Buissenal"
		},
		{
			value: "7911",
			label: "Frasnes-lez-Buissenal"
		},
		{
			value: "7911",
			label: "Hacquegnies"
		},
		{
			value: "7911",
			label: "Herquegies"
		},
		{
			value: "7911",
			label: "Montroeul-au-Bois"
		},
		{
			value: "7911",
			label: "Moustier (Ht.)"
		},
		{
			value: "7911",
			label: "Oeudeghien"
		},
		{
			value: "7912",
			label: "Dergneau"
		},
		{
			value: "7912",
			label: "Saint-Sauveur"
		},
		{
			value: "7940",
			label: "Brugelette"
		},
		{
			value: "7940",
			label: "Cambron-Casteau"
		},
		{
			value: "7941",
			label: "Attre"
		},
		{
			value: "7942",
			label: "Mévergnies-lez-Lens"
		},
		{
			value: "7943",
			label: "Gages"
		},
		{
			value: "7950",
			label: "Chièvres"
		},
		{
			value: "7950",
			label: "Grosage"
		},
		{
			value: "7950",
			label: "Huissignies"
		},
		{
			value: "7950",
			label: "Ladeuze"
		},
		{
			value: "7950",
			label: "Tongre-Saint-Martin"
		},
		{
			value: "7951",
			label: "Tongre-Notre-Dame"
		},
		{
			value: "7970",
			label: "Beloeil"
		},
		{
			value: "7971",
			label: "Basècles"
		},
		{
			value: "7971",
			label: "Ramegnies"
		},
		{
			value: "7971",
			label: "Thumaide"
		},
		{
			value: "7971",
			label: "Wadelincourt"
		},
		{
			value: "7972",
			label: "Aubechies"
		},
		{
			value: "7972",
			label: "Ellignies-Sainte-Anne"
		},
		{
			value: "7972",
			label: "Quevaucamps"
		},
		{
			value: "7973",
			label: "Grandglise"
		},
		{
			value: "7973",
			label: "Stambruges"
		},
		{
			value: "8000",
			label: "Brugge"
		},
		{
			value: "8000",
			label: "Koolkerke"
		},
		{
			value: "8020",
			label: "Hertsberge"
		},
		{
			value: "8020",
			label: "Oostkamp"
		},
		{
			value: "8020",
			label: "Ruddervoorde"
		},
		{
			value: "8020",
			label: "Waardamme"
		},
		{
			value: "8200",
			label: "Sint-Andries"
		},
		{
			value: "8200",
			label: "Sint-Michiels"
		},
		{
			value: "8210",
			label: "Loppem"
		},
		{
			value: "8210",
			label: "Veldegem"
		},
		{
			value: "8210",
			label: "Zedelgem"
		},
		{
			value: "8211",
			label: "Aartrijke"
		},
		{
			value: "8300",
			label: "Knokke"
		},
		{
			value: "8300",
			label: "Knokke-Heist"
		},
		{
			value: "8300",
			label: "Westkapelle"
		},
		{
			value: "8301",
			label: "Heist-aan-Zee"
		},
		{
			value: "8301",
			label: "Ramskapelle (Knokke-Heist)"
		},
		{
			value: "8310",
			label: "Assebroek"
		},
		{
			value: "8310",
			label: "Sint-Kruis"
		},
		{
			value: "8340",
			label: "Damme"
		},
		{
			value: "8340",
			label: "Hoeke"
		},
		{
			value: "8340",
			label: "Lapscheure"
		},
		{
			value: "8340",
			label: "Moerkerke"
		},
		{
			value: "8340",
			label: "Oostkerke (Damme)"
		},
		{
			value: "8340",
			label: "Sijsele"
		},
		{
			value: "8370",
			label: "Blankenberge"
		},
		{
			value: "8370",
			label: "Uitkerke"
		},
		{
			value: "8377",
			label: "Houtave"
		},
		{
			value: "8377",
			label: "Meetkerke"
		},
		{
			value: "8377",
			label: "Nieuwmunster"
		},
		{
			value: "8377",
			label: "Zuienkerke"
		},
		{
			value: "8380",
			label: "Dudzele"
		},
		{
			value: "8380",
			label: "Lissewege"
		},
		{
			value: "8380",
			label: "Zeebrugge"
		},
		{
			value: "8400",
			label: "Oostende"
		},
		{
			value: "8400",
			label: "Stene"
		},
		{
			value: "8400",
			label: "Zandvoorde (Oostende)"
		},
		{
			value: "8420",
			label: "De Haan"
		},
		{
			value: "8420",
			label: "Klemskerke"
		},
		{
			value: "8420",
			label: "Wenduine"
		},
		{
			value: "8421",
			label: "Vlissegem"
		},
		{
			value: "8430",
			label: "Middelkerke"
		},
		{
			value: "8431",
			label: "Wilskerke"
		},
		{
			value: "8432",
			label: "Leffinge"
		},
		{
			value: "8433",
			label: "Mannekensvere"
		},
		{
			value: "8433",
			label: "Schore"
		},
		{
			value: "8433",
			label: "Sint-Pieters-Kapelle (W.-Vl.)"
		},
		{
			value: "8433",
			label: "Slijpe"
		},
		{
			value: "8433",
			label: "Spermalie"
		},
		{
			value: "8434",
			label: "Lombardsijde"
		},
		{
			value: "8434",
			label: "Westende"
		},
		{
			value: "8450",
			label: "Bredene"
		},
		{
			value: "8460",
			label: "Ettelgem"
		},
		{
			value: "8460",
			label: "Oudenburg"
		},
		{
			value: "8460",
			label: "Roksem"
		},
		{
			value: "8460",
			label: "Westkerke"
		},
		{
			value: "8470",
			label: "Gistel"
		},
		{
			value: "8470",
			label: "Moere"
		},
		{
			value: "8470",
			label: "Snaaskerke"
		},
		{
			value: "8470",
			label: "Zevekote"
		},
		{
			value: "8480",
			label: "Bekegem"
		},
		{
			value: "8480",
			label: "Eernegem"
		},
		{
			value: "8480",
			label: "Ichtegem"
		},
		{
			value: "8490",
			label: "Jabbeke"
		},
		{
			value: "8490",
			label: "Snellegem"
		},
		{
			value: "8490",
			label: "Stalhille"
		},
		{
			value: "8490",
			label: "Varsenare"
		},
		{
			value: "8490",
			label: "Zerkegem"
		},
		{
			value: "8500",
			label: "Kortrijk"
		},
		{
			value: "8501",
			label: "Bissegem"
		},
		{
			value: "8501",
			label: "Heule"
		},
		{
			value: "8510",
			label: "Bellegem"
		},
		{
			value: "8510",
			label: "Kooigem"
		},
		{
			value: "8510",
			label: "Marke"
		},
		{
			value: "8510",
			label: "Rollegem"
		},
		{
			value: "8511",
			label: "Aalbeke"
		},
		{
			value: "8520",
			label: "Kuurne"
		},
		{
			value: "8530",
			label: "Harelbeke"
		},
		{
			value: "8531",
			label: "Bavikhove"
		},
		{
			value: "8531",
			label: "Hulste"
		},
		{
			value: "8540",
			label: "Deerlijk"
		},
		{
			value: "8550",
			label: "Zwevegem"
		},
		{
			value: "8551",
			label: "Heestert"
		},
		{
			value: "8552",
			label: "Moen"
		},
		{
			value: "8553",
			label: "Otegem"
		},
		{
			value: "8554",
			label: "Sint-Denijs"
		},
		{
			value: "8560",
			label: "Gullegem"
		},
		{
			value: "8560",
			label: "Moorsele"
		},
		{
			value: "8560",
			label: "Wevelgem"
		},
		{
			value: "8570",
			label: "Anzegem"
		},
		{
			value: "8570",
			label: "Gijzelbrechtegem"
		},
		{
			value: "8570",
			label: "Ingooigem"
		},
		{
			value: "8570",
			label: "Vichte"
		},
		{
			value: "8572",
			label: "Kaster"
		},
		{
			value: "8573",
			label: "Tiegem"
		},
		{
			value: "8580",
			label: "Avelgem"
		},
		{
			value: "8581",
			label: "Kerkhove"
		},
		{
			value: "8581",
			label: "Waarmaarde"
		},
		{
			value: "8582",
			label: "Outrijve"
		},
		{
			value: "8583",
			label: "Bossuit"
		},
		{
			value: "8587",
			label: "Helkijn/Helchin"
		},
		{
			value: "8587",
			label: "Spiere/Espierres"
		},
		{
			value: "8587",
			label: "Spiere-Helkijn/Espierres-Helchin"
		},
		{
			value: "8600",
			label: "Beerst"
		},
		{
			value: "8600",
			label: "Diksmuide"
		},
		{
			value: "8600",
			label: "Driekapellen"
		},
		{
			value: "8600",
			label: "Esen"
		},
		{
			value: "8600",
			label: "Kaaskerke"
		},
		{
			value: "8600",
			label: "Keiem"
		},
		{
			value: "8600",
			label: "Lampernisse"
		},
		{
			value: "8600",
			label: "Leke"
		},
		{
			value: "8600",
			label: "Nieuwkapelle"
		},
		{
			value: "8600",
			label: "Oostkerke (Diksmuide)"
		},
		{
			value: "8600",
			label: "Oudekapelle"
		},
		{
			value: "8600",
			label: "Pervijze"
		},
		{
			value: "8600",
			label: "Sint-Jacobs-Kapelle"
		},
		{
			value: "8600",
			label: "Stuivekenskerke"
		},
		{
			value: "8600",
			label: "Vladslo"
		},
		{
			value: "8600",
			label: "Woumen"
		},
		{
			value: "8610",
			label: "Handzame"
		},
		{
			value: "8610",
			label: "Kortemark"
		},
		{
			value: "8610",
			label: "Werken"
		},
		{
			value: "8610",
			label: "Zarren"
		},
		{
			value: "8620",
			label: "Nieuwpoort"
		},
		{
			value: "8620",
			label: "Ramskapelle (Nieuwpoort)"
		},
		{
			value: "8620",
			label: "Sint-Joris (Nieuwpoort)"
		},
		{
			value: "8630",
			label: "Avekapelle"
		},
		{
			value: "8630",
			label: "Beauvoorde"
		},
		{
			value: "8630",
			label: "Booitshoeke"
		},
		{
			value: "8630",
			label: "Bulskamp"
		},
		{
			value: "8630",
			label: "De Moeren"
		},
		{
			value: "8630",
			label: "Eggewaartskapelle"
		},
		{
			value: "8630",
			label: "Houtem (W.-Vl.)"
		},
		{
			value: "8630",
			label: "Steenkerke (W.-Vl.)"
		},
		{
			value: "8630",
			label: "Veurne"
		},
		{
			value: "8630",
			label: "Vinkem"
		},
		{
			value: "8630",
			label: "Wulveringem"
		},
		{
			value: "8630",
			label: "Zoutenaaie"
		},
		{
			value: "8640",
			label: "Oostvleteren"
		},
		{
			value: "8640",
			label: "Vleteren"
		},
		{
			value: "8640",
			label: "Westvleteren"
		},
		{
			value: "8640",
			label: "Woesten"
		},
		{
			value: "8647",
			label: "Lo"
		},
		{
			value: "8647",
			label: "Lo-Reninge"
		},
		{
			value: "8647",
			label: "Noordschote"
		},
		{
			value: "8647",
			label: "Pollinkhove"
		},
		{
			value: "8647",
			label: "Reninge"
		},
		{
			value: "8650",
			label: "Houthulst"
		},
		{
			value: "8650",
			label: "Klerken"
		},
		{
			value: "8650",
			label: "Merkem"
		},
		{
			value: "8660",
			label: "Adinkerke"
		},
		{
			value: "8660",
			label: "De Panne"
		},
		{
			value: "8670",
			label: "Koksijde"
		},
		{
			value: "8670",
			label: "Oostduinkerke"
		},
		{
			value: "8670",
			label: "Wulpen"
		},
		{
			value: "8680",
			label: "Bovekerke"
		},
		{
			value: "8680",
			label: "Koekelare"
		},
		{
			value: "8680",
			label: "Zande"
		},
		{
			value: "8690",
			label: "Alveringem"
		},
		{
			value: "8690",
			label: "Hoogstade"
		},
		{
			value: "8690",
			label: "Oeren"
		},
		{
			value: "8690",
			label: "Sint-Rijkers"
		},
		{
			value: "8691",
			label: "Beveren-aan-den-Ijzer"
		},
		{
			value: "8691",
			label: "Gijverinkhove"
		},
		{
			value: "8691",
			label: "Izenberge"
		},
		{
			value: "8691",
			label: "Leisele"
		},
		{
			value: "8691",
			label: "Stavele"
		},
		{
			value: "8700",
			label: "Aarsele"
		},
		{
			value: "8700",
			label: "Kanegem"
		},
		{
			value: "8700",
			label: "Schuiferskapelle"
		},
		{
			value: "8700",
			label: "Tielt"
		},
		{
			value: "8710",
			label: "Ooigem"
		},
		{
			value: "8710",
			label: "Sint-Baafs-Vijve"
		},
		{
			value: "8710",
			label: "Wielsbeke"
		},
		{
			value: "8720",
			label: "Dentergem"
		},
		{
			value: "8720",
			label: "Markegem"
		},
		{
			value: "8720",
			label: "Oeselgem"
		},
		{
			value: "8720",
			label: "Wakken"
		},
		{
			value: "8730",
			label: "Beernem"
		},
		{
			value: "8730",
			label: "Oedelem"
		},
		{
			value: "8730",
			label: "Sint-Joris (Beernem)"
		},
		{
			value: "8740",
			label: "Egem"
		},
		{
			value: "8740",
			label: "Pittem"
		},
		{
			value: "8750",
			label: "Wingene"
		},
		{
			value: "8750",
			label: "Zwevezele"
		},
		{
			value: "8755",
			label: "Ruiselede"
		},
		{
			value: "8760",
			label: "Meulebeke"
		},
		{
			value: "8770",
			label: "Ingelmunster"
		},
		{
			value: "8780",
			label: "Oostrozebeke"
		},
		{
			value: "8790",
			label: "Waregem"
		},
		{
			value: "8791",
			label: "Beveren (Leie)"
		},
		{
			value: "8792",
			label: "Desselgem"
		},
		{
			value: "8793",
			label: "Sint-Eloois-Vijve"
		},
		{
			value: "8800",
			label: "Beveren (Roeselare)"
		},
		{
			value: "8800",
			label: "Oekene"
		},
		{
			value: "8800",
			label: "Roeselare"
		},
		{
			value: "8800",
			label: "Rumbeke"
		},
		{
			value: "8810",
			label: "Lichtervelde"
		},
		{
			value: "8820",
			label: "Torhout"
		},
		{
			value: "8830",
			label: "Gits"
		},
		{
			value: "8830",
			label: "Hooglede"
		},
		{
			value: "8840",
			label: "Oostnieuwkerke"
		},
		{
			value: "8840",
			label: "Staden"
		},
		{
			value: "8840",
			label: "Westrozebeke"
		},
		{
			value: "8850",
			label: "Ardooie"
		},
		{
			value: "8851",
			label: "Koolskamp"
		},
		{
			value: "8860",
			label: "Lendelede"
		},
		{
			value: "8870",
			label: "Emelgem"
		},
		{
			value: "8870",
			label: "Izegem"
		},
		{
			value: "8870",
			label: "Kachtem"
		},
		{
			value: "8880",
			label: "Ledegem"
		},
		{
			value: "8880",
			label: "Rollegem-Kapelle"
		},
		{
			value: "8880",
			label: "Sint-Eloois-Winkel"
		},
		{
			value: "8890",
			label: "Dadizele"
		},
		{
			value: "8890",
			label: "Moorslede"
		},
		{
			value: "8900",
			label: "Brielen"
		},
		{
			value: "8900",
			label: "Dikkebus"
		},
		{
			value: "8900",
			label: "Ieper"
		},
		{
			value: "8900",
			label: "Sint-Jan"
		},
		{
			value: "8902",
			label: "Hollebeke"
		},
		{
			value: "8902",
			label: "Voormezele"
		},
		{
			value: "8902",
			label: "Zillebeke"
		},
		{
			value: "8904",
			label: "Boezinge"
		},
		{
			value: "8904",
			label: "Zuidschote"
		},
		{
			value: "8906",
			label: "Elverdinge"
		},
		{
			value: "8908",
			label: "Vlamertinge"
		},
		{
			value: "8920",
			label: "Bikschote"
		},
		{
			value: "8920",
			label: "Langemark"
		},
		{
			value: "8920",
			label: "Langemark-Poelkapelle"
		},
		{
			value: "8920",
			label: "Poelkapelle"
		},
		{
			value: "8930",
			label: "Lauwe"
		},
		{
			value: "8930",
			label: "Menen"
		},
		{
			value: "8930",
			label: "Rekkem"
		},
		{
			value: "8940",
			label: "Geluwe"
		},
		{
			value: "8940",
			label: "Wervik"
		},
		{
			value: "8950",
			label: "Heuvelland"
		},
		{
			value: "8950",
			label: "Nieuwkerke"
		},
		{
			value: "8951",
			label: "Dranouter"
		},
		{
			value: "8952",
			label: "Wulvergem"
		},
		{
			value: "8953",
			label: "Wijtschate"
		},
		{
			value: "8954",
			label: "Westouter"
		},
		{
			value: "8956",
			label: "Kemmel"
		},
		{
			value: "8957",
			label: "Mesen/Messines"
		},
		{
			value: "8958",
			label: "Loker"
		},
		{
			value: "8970",
			label: "Poperinge"
		},
		{
			value: "8970",
			label: "Reningelst"
		},
		{
			value: "8972",
			label: "Krombeke"
		},
		{
			value: "8972",
			label: "Proven"
		},
		{
			value: "8972",
			label: "Roesbrugge-Haringe"
		},
		{
			value: "8978",
			label: "Watou"
		},
		{
			value: "8980",
			label: "Beselare"
		},
		{
			value: "8980",
			label: "Geluveld"
		},
		{
			value: "8980",
			label: "Passendale"
		},
		{
			value: "8980",
			label: "Zandvoorde (Zonnebeke)"
		},
		{
			value: "8980",
			label: "Zonnebeke"
		},
		{
			value: "9000",
			label: "Gent"
		},
		{
			value: "9030",
			label: "Mariakerke"
		},
		{
			value: "9031",
			label: "Drongen"
		},
		{
			value: "9032",
			label: "Wondelgem"
		},
		{
			value: "9040",
			label: "Sint-Amandsberg"
		},
		{
			value: "9041",
			label: "Oostakker"
		},
		{
			value: "9042",
			label: "Desteldonk"
		},
		{
			value: "9042",
			label: "Mendonk"
		},
		{
			value: "9042",
			label: "Sint-Kruis-Winkel"
		},
		{
			value: "9050",
			label: "Gentbrugge"
		},
		{
			value: "9050",
			label: "Ledeberg"
		},
		{
			value: "9051",
			label: "Afsnee"
		},
		{
			value: "9051",
			label: "Sint-Denijs-Westrem"
		},
		{
			value: "9052",
			label: "Zwijnaarde"
		},
		{
			value: "9060",
			label: "Zelzate"
		},
		{
			value: "9070",
			label: "Destelbergen"
		},
		{
			value: "9070",
			label: "Heusden (O.Vl.)"
		},
		{
			value: "9080",
			label: "Beervelde"
		},
		{
			value: "9080",
			label: "Lochristi"
		},
		{
			value: "9080",
			label: "Zaffelare"
		},
		{
			value: "9080",
			label: "Zeveneken"
		},
		{
			value: "9090",
			label: "Gontrode"
		},
		{
			value: "9090",
			label: "Melle"
		},
		{
			value: "9100",
			label: "Nieuwkerken-Waas"
		},
		{
			value: "9100",
			label: "Sint-Niklaas"
		},
		{
			value: "9111",
			label: "Belsele"
		},
		{
			value: "9112",
			label: "Sinaai-Waas"
		},
		{
			value: "9120",
			label: "Beveren-Waas"
		},
		{
			value: "9120",
			label: "Haasdonk"
		},
		{
			value: "9120",
			label: "Kallo (Beveren-Waas)"
		},
		{
			value: "9120",
			label: "Melsele"
		},
		{
			value: "9120",
			label: "Vrasene"
		},
		{
			value: "9130",
			label: "Doel"
		},
		{
			value: "9130",
			label: "Kallo (Kieldrecht)"
		},
		{
			value: "9130",
			label: "Kieldrecht"
		},
		{
			value: "9130",
			label: "Verrebroek"
		},
		{
			value: "9140",
			label: "Elversele"
		},
		{
			value: "9140",
			label: "Steendorp"
		},
		{
			value: "9140",
			label: "Temse"
		},
		{
			value: "9140",
			label: "Tielrode"
		},
		{
			value: "9150",
			label: "Bazel"
		},
		{
			value: "9150",
			label: "Kruibeke"
		},
		{
			value: "9150",
			label: "Rupelmonde"
		},
		{
			value: "9160",
			label: "Daknam"
		},
		{
			value: "9160",
			label: "Eksaarde"
		},
		{
			value: "9160",
			label: "Lokeren"
		},
		{
			value: "9170",
			label: "De Klinge"
		},
		{
			value: "9170",
			label: "Meerdonk"
		},
		{
			value: "9170",
			label: "Sint-Gillis-Waas"
		},
		{
			value: "9170",
			label: "Sint-Pauwels"
		},
		{
			value: "9180",
			label: "Moerbeke-Waas"
		},
		{
			value: "9185",
			label: "Wachtebeke"
		},
		{
			value: "9190",
			label: "Kemzeke"
		},
		{
			value: "9190",
			label: "Stekene"
		},
		{
			value: "9200",
			label: "Appels"
		},
		{
			value: "9200",
			label: "Baasrode"
		},
		{
			value: "9200",
			label: "Dendermonde"
		},
		{
			value: "9200",
			label: "Grembergen"
		},
		{
			value: "9200",
			label: "Mespelare"
		},
		{
			value: "9200",
			label: "Oudegem"
		},
		{
			value: "9200",
			label: "Schoonaarde"
		},
		{
			value: "9200",
			label: "Sint-Gillis-bij-Dendermonde"
		},
		{
			value: "9220",
			label: "Hamme (O.-Vl.)"
		},
		{
			value: "9220",
			label: "Moerzeke"
		},
		{
			value: "9230",
			label: "Massemen"
		},
		{
			value: "9230",
			label: "Westrem"
		},
		{
			value: "9230",
			label: "Wetteren"
		},
		{
			value: "9240",
			label: "Zele"
		},
		{
			value: "9250",
			label: "Waasmunster"
		},
		{
			value: "9255",
			label: "Buggenhout"
		},
		{
			value: "9255",
			label: "Opdorp"
		},
		{
			value: "9260",
			label: "Schellebelle"
		},
		{
			value: "9260",
			label: "Serskamp"
		},
		{
			value: "9260",
			label: "Wichelen"
		},
		{
			value: "9270",
			label: "Kalken"
		},
		{
			value: "9270",
			label: "Laarne"
		},
		{
			value: "9280",
			label: "Denderbelle"
		},
		{
			value: "9280",
			label: "Lebbeke"
		},
		{
			value: "9280",
			label: "Wieze"
		},
		{
			value: "9290",
			label: "Berlare"
		},
		{
			value: "9290",
			label: "Overmere"
		},
		{
			value: "9290",
			label: "Uitbergen"
		},
		{
			value: "9300",
			label: "Aalst"
		},
		{
			value: "9308",
			label: "Gijzegem"
		},
		{
			value: "9308",
			label: "Hofstade (O.-Vl.)"
		},
		{
			value: "9310",
			label: "Baardegem"
		},
		{
			value: "9310",
			label: "Herdersem"
		},
		{
			value: "9310",
			label: "Meldert (O.-Vl.)"
		},
		{
			value: "9310",
			label: "Moorsel"
		},
		{
			value: "9320",
			label: "Erembodegem"
		},
		{
			value: "9320",
			label: "Nieuwerkerken"
		},
		{
			value: "9340",
			label: "Impe"
		},
		{
			value: "9340",
			label: "Lede"
		},
		{
			value: "9340",
			label: "Oordegem"
		},
		{
			value: "9340",
			label: "Smetlede"
		},
		{
			value: "9340",
			label: "Wanzele"
		},
		{
			value: "9400",
			label: "Appelterre-Eichem"
		},
		{
			value: "9400",
			label: "Denderwindeke"
		},
		{
			value: "9400",
			label: "Lieferinge"
		},
		{
			value: "9400",
			label: "Nederhasselt"
		},
		{
			value: "9400",
			label: "Ninove"
		},
		{
			value: "9400",
			label: "Okegem"
		},
		{
			value: "9400",
			label: "Voorde"
		},
		{
			value: "9401",
			label: "Pollare"
		},
		{
			value: "9402",
			label: "Meerbeke"
		},
		{
			value: "9403",
			label: "Neigem"
		},
		{
			value: "9404",
			label: "Aspelare"
		},
		{
			value: "9406",
			label: "Outer"
		},
		{
			value: "9420",
			label: "Aaigem"
		},
		{
			value: "9420",
			label: "Bambrugge"
		},
		{
			value: "9420",
			label: "Burst"
		},
		{
			value: "9420",
			label: "Erondegem"
		},
		{
			value: "9420",
			label: "Erpe"
		},
		{
			value: "9420",
			label: "Erpe-Mere"
		},
		{
			value: "9420",
			label: "Mere"
		},
		{
			value: "9420",
			label: "Ottergem"
		},
		{
			value: "9420",
			label: "Vlekkem"
		},
		{
			value: "9450",
			label: "Denderhoutem"
		},
		{
			value: "9450",
			label: "Haaltert"
		},
		{
			value: "9450",
			label: "Heldergem"
		},
		{
			value: "9451",
			label: "Kerksken"
		},
		{
			value: "9470",
			label: "Denderleeuw"
		},
		{
			value: "9472",
			label: "Iddergem"
		},
		{
			value: "9473",
			label: "Welle"
		},
		{
			value: "9500",
			label: "Geraardsbergen"
		},
		{
			value: "9500",
			label: "Goeferdinge"
		},
		{
			value: "9500",
			label: "Moerbeke"
		},
		{
			value: "9500",
			label: "Nederboelare"
		},
		{
			value: "9500",
			label: "Onkerzele"
		},
		{
			value: "9500",
			label: "Ophasselt"
		},
		{
			value: "9500",
			label: "Overboelare"
		},
		{
			value: "9500",
			label: "Viane"
		},
		{
			value: "9500",
			label: "Zarlardinge"
		},
		{
			value: "9506",
			label: "Grimminge"
		},
		{
			value: "9506",
			label: "Idegem"
		},
		{
			value: "9506",
			label: "Nieuwenhove"
		},
		{
			value: "9506",
			label: "Schendelbeke"
		},
		{
			value: "9506",
			label: "Smeerebbe-Vloerzegem"
		},
		{
			value: "9506",
			label: "Waarbeke"
		},
		{
			value: "9506",
			label: "Zandbergen"
		},
		{
			value: "9520",
			label: "Bavegem"
		},
		{
			value: "9520",
			label: "Sint-Lievens-Houtem"
		},
		{
			value: "9520",
			label: "Vlierzele"
		},
		{
			value: "9520",
			label: "Zonnegem"
		},
		{
			value: "9521",
			label: "Letterhoutem"
		},
		{
			value: "9550",
			label: "Herzele"
		},
		{
			value: "9550",
			label: "Hillegem"
		},
		{
			value: "9550",
			label: "Sint-Antelinks"
		},
		{
			value: "9550",
			label: "Sint-Lievens-Esse"
		},
		{
			value: "9550",
			label: "Steenhuize-Wijnhuize"
		},
		{
			value: "9550",
			label: "Woubrechtegem"
		},
		{
			value: "9551",
			label: "Ressegem"
		},
		{
			value: "9552",
			label: "Borsbeke"
		},
		{
			value: "9570",
			label: "Deftinge"
		},
		{
			value: "9570",
			label: "Lierde"
		},
		{
			value: "9570",
			label: "Sint-Maria-Lierde"
		},
		{
			value: "9571",
			label: "Hemelveerdegem"
		},
		{
			value: "9572",
			label: "Sint-Martens-Lierde"
		},
		{
			value: "9600",
			label: "Ronse/Renaix"
		},
		{
			value: "9620",
			label: "Elene"
		},
		{
			value: "9620",
			label: "Erwetegem"
		},
		{
			value: "9620",
			label: "Godveerdegem"
		},
		{
			value: "9620",
			label: "Grotenberge"
		},
		{
			value: "9620",
			label: "Leeuwergem"
		},
		{
			value: "9620",
			label: "Oombergen (Zottegem)"
		},
		{
			value: "9620",
			label: "Sint-Goriks-Oudenhove"
		},
		{
			value: "9620",
			label: "Sint-Maria-Oudenhove (Zottegem)"
		},
		{
			value: "9620",
			label: "Strijpen"
		},
		{
			value: "9620",
			label: "Velzeke-Ruddershove"
		},
		{
			value: "9620",
			label: "Zottegem"
		},
		{
			value: "9630",
			label: "Beerlegem"
		},
		{
			value: "9630",
			label: "Dikkele"
		},
		{
			value: "9630",
			label: "Hundelgem"
		},
		{
			value: "9630",
			label: "Meilegem"
		},
		{
			value: "9630",
			label: "Munkzwalm"
		},
		{
			value: "9630",
			label: "Paulatem"
		},
		{
			value: "9630",
			label: "Roborst"
		},
		{
			value: "9630",
			label: "Rozebeke"
		},
		{
			value: "9630",
			label: "Sint-Blasius-Boekel"
		},
		{
			value: "9630",
			label: "Sint-Denijs-Boekel"
		},
		{
			value: "9630",
			label: "Sint-Maria-Latem"
		},
		{
			value: "9630",
			label: "Zwalm"
		},
		{
			value: "9636",
			label: "Nederzwalm-Hermelgem"
		},
		{
			value: "9660",
			label: "Brakel"
		},
		{
			value: "9660",
			label: "Elst"
		},
		{
			value: "9660",
			label: "Everbeek"
		},
		{
			value: "9660",
			label: "Michelbeke"
		},
		{
			value: "9660",
			label: "Nederbrakel"
		},
		{
			value: "9660",
			label: "Opbrakel"
		},
		{
			value: "9660",
			label: "Sint-Maria-Oudenhove (Brakel)"
		},
		{
			value: "9660",
			label: "Zegelsem"
		},
		{
			value: "9661",
			label: "Parike"
		},
		{
			value: "9667",
			label: "Horebeke"
		},
		{
			value: "9667",
			label: "Sint-Kornelis-Horebeke"
		},
		{
			value: "9667",
			label: "Sint-Maria-Horebeke"
		},
		{
			value: "9680",
			label: "Etikhove"
		},
		{
			value: "9680",
			label: "Maarkedal"
		},
		{
			value: "9680",
			label: "Maarke-Kerkem"
		},
		{
			value: "9681",
			label: "Nukerke"
		},
		{
			value: "9688",
			label: "Schorisse"
		},
		{
			value: "9690",
			label: "Berchem (O.-Vl.)"
		},
		{
			value: "9690",
			label: "Kluisbergen"
		},
		{
			value: "9690",
			label: "Kwaremont"
		},
		{
			value: "9690",
			label: "Ruien"
		},
		{
			value: "9690",
			label: "Zulzeke"
		},
		{
			value: "9700",
			label: "Bevere"
		},
		{
			value: "9700",
			label: "Edelare"
		},
		{
			value: "9700",
			label: "Eine"
		},
		{
			value: "9700",
			label: "Ename"
		},
		{
			value: "9700",
			label: "Heurne"
		},
		{
			value: "9700",
			label: "Leupegem"
		},
		{
			value: "9700",
			label: "Mater"
		},
		{
			value: "9700",
			label: "Melden"
		},
		{
			value: "9700",
			label: "Mullem"
		},
		{
			value: "9700",
			label: "Nederename"
		},
		{
			value: "9700",
			label: "Oudenaarde"
		},
		{
			value: "9700",
			label: "Volkegem"
		},
		{
			value: "9700",
			label: "Welden"
		},
		{
			value: "9750",
			label: "Huise"
		},
		{
			value: "9750",
			label: "Ouwegem"
		},
		{
			value: "9750",
			label: "Zingem"
		},
		{
			value: "9770",
			label: "Kruishoutem"
		},
		{
			value: "9771",
			label: "Nokere"
		},
		{
			value: "9772",
			label: "Wannegem-Lede"
		},
		{
			value: "9790",
			label: "Elsegem"
		},
		{
			value: "9790",
			label: "Moregem"
		},
		{
			value: "9790",
			label: "Ooike (Wortegem-Petegem)"
		},
		{
			value: "9790",
			label: "Petegem-aan-de-Schelde"
		},
		{
			value: "9790",
			label: "Wortegem"
		},
		{
			value: "9790",
			label: "Wortegem-Petegem"
		},
		{
			value: "9800",
			label: "Astene"
		},
		{
			value: "9800",
			label: "Bachte-Maria-Leerne"
		},
		{
			value: "9800",
			label: "Deinze"
		},
		{
			value: "9800",
			label: "Gottem"
		},
		{
			value: "9800",
			label: "Grammene"
		},
		{
			value: "9800",
			label: "Meigem"
		},
		{
			value: "9800",
			label: "Petegem-aan-de-Leie"
		},
		{
			value: "9800",
			label: "Sint-Martens-Leerne"
		},
		{
			value: "9800",
			label: "Vinkt"
		},
		{
			value: "9800",
			label: "Wontergem"
		},
		{
			value: "9800",
			label: "Zeveren"
		},
		{
			value: "9810",
			label: "Eke"
		},
		{
			value: "9810",
			label: "Nazareth"
		},
		{
			value: "9820",
			label: "Bottelare"
		},
		{
			value: "9820",
			label: "Lemberge"
		},
		{
			value: "9820",
			label: "Melsen"
		},
		{
			value: "9820",
			label: "Merelbeke"
		},
		{
			value: "9820",
			label: "Munte"
		},
		{
			value: "9820",
			label: "Schelderode"
		},
		{
			value: "9830",
			label: "Sint-Martens-Latem"
		},
		{
			value: "9831",
			label: "Deurle"
		},
		{
			value: "9840",
			label: "De Pinte"
		},
		{
			value: "9840",
			label: "Zevergem"
		},
		{
			value: "9850",
			label: "Hansbeke"
		},
		{
			value: "9850",
			label: "Landegem"
		},
		{
			value: "9850",
			label: "Merendree"
		},
		{
			value: "9850",
			label: "Nevele"
		},
		{
			value: "9850",
			label: "Poesele"
		},
		{
			value: "9850",
			label: "Vosselare"
		},
		{
			value: "9860",
			label: "Balegem"
		},
		{
			value: "9860",
			label: "Gijzenzele"
		},
		{
			value: "9860",
			label: "Landskouter"
		},
		{
			value: "9860",
			label: "Moortsele"
		},
		{
			value: "9860",
			label: "Oosterzele"
		},
		{
			value: "9860",
			label: "Scheldewindeke"
		},
		{
			value: "9870",
			label: "Machelen (O.-Vl.)"
		},
		{
			value: "9870",
			label: "Olsene"
		},
		{
			value: "9870",
			label: "Zulte"
		},
		{
			value: "9880",
			label: "Aalter"
		},
		{
			value: "9880",
			label: "Lotenhulle"
		},
		{
			value: "9880",
			label: "Poeke"
		},
		{
			value: "9881",
			label: "Bellem"
		},
		{
			value: "9890",
			label: "Asper"
		},
		{
			value: "9890",
			label: "Baaigem"
		},
		{
			value: "9890",
			label: "Dikkelvenne"
		},
		{
			value: "9890",
			label: "Gavere"
		},
		{
			value: "9890",
			label: "Semmerzake"
		},
		{
			value: "9890",
			label: "Vurste"
		},
		{
			value: "9900",
			label: "Eeklo"
		},
		{
			value: "9910",
			label: "Knesselare"
		},
		{
			value: "9910",
			label: "Ursel"
		},
		{
			value: "9920",
			label: "Lovendegem"
		},
		{
			value: "9921",
			label: "Vinderhoute"
		},
		{
			value: "9930",
			label: "Zomergem"
		},
		{
			value: "9931",
			label: "Oostwinkel"
		},
		{
			value: "9932",
			label: "Ronsele"
		},
		{
			value: "9940",
			label: "Ertvelde"
		},
		{
			value: "9940",
			label: "Evergem"
		},
		{
			value: "9940",
			label: "Kluizen"
		},
		{
			value: "9940",
			label: "Sleidinge"
		},
		{
			value: "9950",
			label: "Waarschoot"
		},
		{
			value: "9960",
			label: "Assenede"
		},
		{
			value: "9961",
			label: "Boekhoute"
		},
		{
			value: "9968",
			label: "Bassevelde"
		},
		{
			value: "9968",
			label: "Oosteeklo"
		},
		{
			value: "9970",
			label: "Kaprijke"
		},
		{
			value: "9971",
			label: "Lembeke"
		},
		{
			value: "9980",
			label: "Sint-Laureins"
		},
		{
			value: "9981",
			label: "Sint-Margriete"
		},
		{
			value: "9982",
			label: "Sint-Jan-in-Eremo"
		},
		{
			value: "9988",
			label: "Waterland-Oudeman"
		},
		{
			value: "9988",
			label: "Watervliet"
		},
		{
			value: "9990",
			label: "Maldegem"
		},
		{
			value: "9991",
			label: "Adegem"
		},
		{
			value: "9992",
			label: "Middelburg"
		}
  ];
};
