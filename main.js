// Because someone told me that people could actually abuse this (but why?), so you'll have to use your own.
// Don't know how to get one? You probably shouldn't be using this either.
// Kidding, follow the carefully written instructions here:
// https://developers.google.com/youtube/v3/getting-started#before-you-start
// Then console this:
// localStorage.setItem('APIKey', 'Your API key here');

// Throttle
(function(window, undefined) {
	'$:nomunge';
	var $ = window.jQuery || window.Cowboy || (window.Cowboy = {}),
		jq_throttle;
	$.throttle = jq_throttle = function(delay, no_trailing, callback, debounce_mode) {
		var timeout_id,
			last_exec = 0;
		if (typeof no_trailing !== 'boolean') {
			debounce_mode = callback;
			callback = no_trailing;
			no_trailing = undefined;
		}

		function wrapper() {
			var that = this,
				elapsed = +new Date() - last_exec,
				args = arguments;

			function exec() {
				last_exec = +new Date();
				callback.apply(that, args);
			}

			function clear() {
				timeout_id = undefined;
			}
			if (debounce_mode && !timeout_id) {
				exec();
			}
			timeout_id && clearTimeout(timeout_id);
			if (debounce_mode === undefined && elapsed > delay) {
				exec();
			} else if (no_trailing !== true) {
				timeout_id = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay);
			}
		}
		if ($.guid) {
			wrapper.guid = callback.guid = callback.guid || $.guid++;
		}
		return wrapper;
	};
	$.debounce = function(delay, at_begin, callback) {
		return callback === undefined ? jq_throttle(delay, at_begin, false) : jq_throttle(delay, callback, at_begin !== false);
	};
})(this);
$('head').append($('<link>', {
	rel: 'stylesheet',
	type: 'text/css',
	href: 'https://raw.githack.com/GameModerator/YouTubeRail/master/main.css',
	load: function() {
		$('<div class="arrow-holder-clickable">').append('<span class="arrow">').appendTo('body').after('<div class="right-rail">').click($.throttle(200, function() {
			$('body').toggleClass('right-rail-open');
			if ($('body').hasClass('right-rail-open')) {
				$('.right-rail').animate({
					'left': '0'
				});
				$('.arrow-holder-clickable').animate({
					'left': '400px'
				});
			} else {
				$('.right-rail').animate({
					'left': '-400px'
				});
				$('.arrow-holder-clickable').animate({
					'left': '0'
				});
			}
		}));
		$('.right-rail').append($('<div>', {
			id: 'right-rail-BG',
			css: {
				width: '100%',
				height: '100%',
				position: 'absolute',
				'z-index': '-1',
			}
		}), $('<section>', {
			id: 'SideRail',
			css: {
				width: '100%',
				position: 'absolute',
				bottom: 0,
				top: 0,
				'overflow-y': 'auto'
			},
			append: [
				$('<table>', {
					css: {
						'width': '100%'
					},
					append: [
						$('<tbody>', {
							append: [
								$('<tr>', {
									append: [
										$('<td>', {
											append: [
												$('<input>', {
													css: {
														'width': '99%'
													},
													id: 'video',
													type: 'text'
												})
											]
										}),
									]
								}),
								$('<tr>', {
									append: [
										$('<td>', {
											append: [
												$('<button>', {
													css: {
														'width': '100%'
													},
													id: 'video',
													click: addvideo,
													text: 'Play'
												})
											]
										}),
									]
								}),
								$('<tr>', {
									append: [
										$('<td>', {
											append: [
												$('<input>', {
													css: {
														'width': '80%',
														'margin-right': '5px'
													},
													id: 'copyvideourl',
													type: 'text'
												}),
												$('<button>', {
													css: {
														'width': '17%'
													},
													id: 'copybutton',
													text: 'Copy',
													click: copy
												})
											]
										}),
									]
								}),
								$('<tr>', {
									append: [
										$('<td>', {
											append: [
												$('<hr>'),
												$('<iframe>', {
													width: '100%',
													height: '200',
													name: 'videourl',
													id: 'video1',
													allowfullscreen: 'allowfullscreen',
													frameborder: '0',
													allow: 'autoplay'
												}),
											]
										}),
									]
								}),
								$('<tr>', {
									append: [
										$('<td>', {
											append: [
												$('<hr>'),
												$('<input>', {
													css: {
														'width': '80%',
														'margin-right': '5px'
													},
													id: 'searchquery',
													type: 'text'
												}),
												$('<button>', {
													css: {
														'width': '17%'
													},
													id: 'searchbutton',
													text: 'Search',
													click: search
												})
											]
										}),
									]
								}),
								$('<tr>', {
									append: [
										$('<td>', {
											append: [
												$('<hr>'),
												$('<div>', {
													css: {
														'width': '100%'
													},
													id: 'results',
												})
											]
										}),
									]
								})
							]
						})
					]
				}),
			]
		}));
		//Thanks to RansomTime, with some modifications
		function exist(variable) {
			if (variable == "") {
				return false;
			}
			return true;
		}

		function addvideo() {
			$('#video1').show();
			var url = $('#video').val().slice(-11);
			var open = 'https://www.youtube.com/embed/' + url + '?autoplay=1';
			var other = 'https://www.youtube.com/embed/Yq0zBXN1o2A?autoplay=1'; // Online Game Addicts Sprechchor
			if (exist(url)) {
				window.open(open, 'videourl');
				$('#copyvideourl').val('https://youtu.be/' + url);
			} else {
				window.open(other, 'videourl');
				$('#copyvideourl').val('https://youtu.be/Yq0zBXN1o2A');
			}
		}
		$('#searchquery').keydown(function(e) {
			var keyCode = e.keyCode;
			if (keyCode === 13) {
				search();
			}
		});

		function search() {
			$('#results').empty();
			var q = $('#searchquery').val().trim();
			var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet';
			var key = localStorage.getItem('APIKey');
			url = url + '&key=' + key;
			url = url + '&type=video';
			url = url + '&max-results=2';
			url = url + '&q=' + q;
			fetch(url, {
				method: 'GET',
			}).then(e => e.json()).then(arr => arr.items.map(video => ({
				id: video.id.videoId,
				title: video.snippet.title,
				description: video.snippet.description,
				thumbnail: video.snippet.thumbnails.high.url
			})).forEach(function(video) {
				$('#results').append($('<li>', {
					append: $('<div>', {
						class: 'result-list',
						append: [
							$('<div>', {
								class: 'result-img',
								css: {
									background: 'url(' + video.thumbnail + ') center center / cover'
								}
							}),
							$('<div>', {
								html: video.title,
								css: {
									width: '60%'
								}
							})
						]
					}).click(function() {
						window.open('https://www.youtube.com/embed/' + video.id + '?autoplay=1', 'videourl');
						$('#copyvideourl').val('https://youtu.be/' + video.id);
					})
				}));
			})).catch(function(err) {
				$('#results').append($('<li>', {
					append: $('<div>', {
						class: 'error',
						append: [
							$('<div>', {
								css: {
									width: '100%'
								},
								text: 'Error...',
								append: [
									$('<br>'),
									$('<span>', {
										css: {
											'font-size': '12px'
										},
										text: err
									})
								]
							})
						]
					})
				}));
			});
			$('#searchquery').val('');
		}

		function copy() {
  			var videoURL = $('#copyvideourl');
  			videoURL.select();
  			document.execCommand('copy');
		}
	}
}));
