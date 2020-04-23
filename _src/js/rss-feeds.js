// YuzuRSS server to connect to
var url = 'https://yuzurss.kebigon.xyz';

var id = "videos-feed";

var options = { day: '2-digit' };

function loadFeeds(tag) {
	var request = new XMLHttpRequest();
	request.onload = function () {
		try {
			var feed = JSON.parse(request.responseText);

			document.getElementById(id).innerHTML = "";
			feed.items.forEach(function (x) {
				var published = new Date(x.date_published).toLocaleDateString("fr-FR", options);
				var author = shorten(x.author.name, isJapanese(x.author.name) ? 12 : 20);
				var title = shorten(x.title, isJapanese(x.title) ? 42 : 69);

				var newItemHtml = '<tr><td>' + published + '</td><td>' + author + '</td><td><a href="' + x.url + '">' + title + '</a></td></tr>';
				document.getElementById(id).innerHTML += newItemHtml;
			});
		} catch (e) {
			return;
		}
	}
	request.open('POST', url, true);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send(JSON.stringify({ urls: feedsByTag[tag], limit: 21 }));

	document.getElementById(id).innerHTML = "<tr><td colspan=\"3\">Chargement...</td></tr>";
}

function shorten(s, maxLength) {
	return s.length > maxLength ? s.substring(0, maxLength - 1) + '&#x2026;' : s;
}

// Hiragana ( 3040 - 309f)
// Katakana ( 30a0 - 30ff)
// CJK unified ideographs Extension A - Rare kanji ( 3400 - 4dbf)
// CJK unified ideographs - Common and uncommon kanji ( 4e00 - 9faf)
// (See http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml)
function isJapanese(s) {
	return s.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9faf]/);
}

var feedsByTag = {};

function addFeedToTag(feed, tag) {
	if (feedsByTag[tag] == undefined)
		feedsByTag[tag] = [feed];
	else
		feedsByTag[tag].push(feed);
}

function registerFeed(feed, tags) {
	addFeedToTag(feed, "all");

	if (tags != undefined)
		tags.forEach(function (tag) { addFeedToTag(feed, tag) });
}

var Tag = {
	Development: "Development",
	Gaming:      "Gaming",
	History:     "History",
	Japanese:    "Japanese",
	Lifestyle:   "Lifestyle",
	Politics:    "Politics",
	Science:     "Science",
	Technology:  "Technology"
};

// -----------------------------------------------------------------------------------------------------[           Podcasts            ]------------------------------------------------------- //
registerFeed("http://feeds.soundcloud.com/users/soundcloud:users:261098918/sounds.rss",                 [ Tag.Technology                ]); // The Privacy, Security, & OSINT Show
// -----------------------------------------------------------------------------------------------------[            Github             ]------------------------------------------------------- //
registerFeed("https://github.com/beemdevelopment/Aegis/tags.atom",                                      [ Tag.Development               ]); // Aegis
registerFeed("https://github.com/twbs/bootstrap/tags.atom",                                             [ Tag.Development               ]); // bootstrap
registerFeed("https://github.com/metrodroid/metrodroid/tags.atom",                                      [ Tag.Development               ]); // metrodroid
// -----------------------------------------------------------------------------------------------------[            Youtube            ]------------------------------------------------------- //
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCciXXqGRO99KPhhrcaRfG-w",            [ Tag.Japanese                  ]); // BritVsJapan
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCOuIgj0CYCXCvjWywjDbauw",            [ Tag.Science                   ]); // Chat Sceptique
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCOchT7ZJ4TXe3stdLW1Sfxw",            [ Tag.Science                   ]); // Dans Ton Corps
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCtqICqGbPSbTN09K1_7VZ3Q",            [ Tag.Science                   ]); // DirtyBiology
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCcziTK2NKeWtWQ6kB5tmQ8Q",            [ Tag.Science                   ]); // e-penser
registerFeed("https://www.youtube.com/feeds/videos.xml?playlist_id=PL43OynbWaTMLEbdAWr-DnAfveOonmhlT1", [ Tag.Politics                  ]); // France Inter: Guillaume Meurice
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC7sXGI8p8PvKosLWagkK9wQ",            [ Tag.Science                   ]); // Heu?reka
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC5eOLQO5VUEFJukNg9cl5jg",            [ Tag.History                   ]); // Histoire Brève
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCt8ctlakIflnSG0ebFps7cw",            [ Tag.History                   ]); // Histony
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCGeFgMJfWclTWuPw8Ok5FUQ",            [ Tag.Science                   ]); // horizon-gull
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCMFcMhePnH4onVHt2-ItPZw",            [ Tag.Science                   ]); // Hygiène Mentale
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC9NB2nXjNtRabu3YLPB16Hg",            [ Tag.Politics                  ]); // J'suis pas content TV
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC_yP2DpIgs5Y1uWC0T03Chw",            [ Tag.Gaming                    ]); // Joueur Du Grenier
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCiaZZmZwBjKrcRv7aerHuyA",            [ Tag.Lifestyle                 ]); // KEYVAN KHOJANDI
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCq-8pBMM3I40QlrhM9ExXJQ",            [ Tag.Science                   ]); // La Tronche en Biais
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCWYxQt9Y3y2CDzXLf2K7xCA",            [ Tag.Science                   ]); // Lanterne Cosmique
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC9hHeywcPBnLglqnQRaNShQ",            [ Tag.Politics                  ]); // Le Fil d'Actu - Officiel
registerFeed("https://www.youtube.com/feeds/videos.xml?playlist_id=PLXJa1eyN_t2kesrfEyseS0WyPVZDCDzM0", [ Tag.Politics                  ]); // Le Média: ON SORT LES DOSSIERS ft. LE STAGIRITE
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC_i-uMpN1lEyuoUGDq-dajQ",            [ Tag.Politics                  ]); // Le Raptor
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCtyONQLs6htK-wWiCAk4wVw",            [ Tag.Politics                  ]); // le Stagirite
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCZxLew-WXWm5dhRZBgEFl-Q",            [ Tag.Science                   ]); // Le Vortex
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC59ZURfw529EQEE1gVUMSlw",            [ Tag.Japanese                  ]); // Learn Japanese with Manga
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCofQxJWd4qkqc7ZgaLkZfcw",            [ Tag.Science                   ]); // Linguisticae
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC2eYFnH61tmytImy1mTYvhA",            [ Tag.Lifestyle, Tag.Technology ]); // Luke Smith
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCJ24N4O0bP7LGLBDvye7oCA",            [ Tag.Lifestyle                 ]); // Matt D'Avella
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCpf4BknRWAjb_oYIHoMDGVg",            [ Tag.Japanese                  ]); // Matt vs. Japan
registerFeed("https://www.youtube.com/feeds/videos.xml?playlist_id=PL0H7ONNEUnnt59niYAZ07dFTi99u2L2n_", [ Tag.Politics                  ]); // Mediapart: Ouvrez les guillemets
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCjFaPUcJU1vwk193mnW_w1w",            [ Tag.Gaming, Tag.Technology    ]); // Modern Vintage Gamer
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCP46_MXP_WG_auH88FnfS1A",            [ Tag.History                   ]); // Nota Bene
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCU0FhLr6fr7U9GOn6OiQHpQ",            [ Tag.Science                   ]); // Officiel DEFAKATOR
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC29GiGDjU6N53gNatKn7SkA",            [ Tag.Politics                  ]); // OLG Bonus
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UClaZ2KITbEWBjaUSELMwzvg",            [ Tag.Politics                  ]); // Peno Tube
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCaNlbnghtwlsGF-KzAFThqA",            [ Tag.Science                   ]); // ScienceEtonnante
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCeR8BYZS7IHYjk_9Mh5JgkA",            [ Tag.Science                   ]); // Scilabus
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC6107grRI4m0o2-emgoDnAA",            [ Tag.Science                   ]); // SmarterEveryDay
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCyJDHgrsUKuWLe05GvC2lng",            [ Tag.Science                   ]); // Stupid Economics
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC0cT8BZdFUmC0vgr1XS7aPA",            [ Tag.Politics                  ]); // Tatiana Ventôse
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCjr2bPAyPV7t35MvcgT3W8Q",            [ Tag.Technology                ]); // The Hated One
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC5UAwBUum7CPN5buc-_N1Fw",            [ Tag.Technology                ]); // The Linux Experiment
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCQgWpmt02UtJkyO32HGUASQ",            [ Tag.Politics                  ]); // Thinkerview
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCBa659QWEk1AI4Tg--mrJ2A",            [ Tag.Science                   ]); // Tom Scott
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCynFUJ4zUVuh3GX7bABTjGQ",            [ Tag.Politics                  ]); // Trouble Fait
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCnOuKKfBkvt2VsXcYSr8W2Q",            [ Tag.Gaming                    ]); // Trxns
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCbq4WwLfbhRxvyVYOTYU25g",            [ Tag.Gaming                    ]); // UnDropDansLaMare
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCqYPhGiB9tkShZorfgcL2lA",            [ Tag.Science                   ]); // What I've Learned
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCu34Tq5qMR-FiTYwLyy9U6w",            [ Tag.Technology                ]); // Webosaures
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCsnGwSIHyoYN0kiINAGUKxg",            [ Tag.Technology                ]); // Wolfgang's Channel
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCQFe3x4WAgm7joN5daMm5Ew",            [ Tag.Japanese                  ]); // Yoga MIA
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC1kk8pmQ3Rg5DZtwOrpFDMA",            [ Tag.Japanese, Tag.Lifestyle   ]); // しょっぴん / SHOPPIN
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC4arQnli3ffEuCSrSgAD_Ug",            [ Tag.Japanese, Tag.Lifestyle   ]); // Osho Taigu’s Heart of Buddha
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC59gHK7pW5W245V6ES9jQEQ",            [ Tag.Gaming, Tag.Japanese      ]); // コジコジのオタク文化 情報局
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCWGl1JQoX90LM8hRuRbdFDA",            [ Tag.Japanese                  ]); // 打首獄門同好会

for (var tag in feedsByTag) {
	document.getElementById("tags").innerHTML += '<a onClick="loadFeeds(\'' + tag + '\')">' + tag + '</a>\n';
}
