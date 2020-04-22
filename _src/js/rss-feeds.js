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

	console.log("addFeedToTag " + tag + " " + feed)

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

registerFeed("https://github.com/twbs/bootstrap/tags.atom", ["Software releases"]);
registerFeed("https://github.com/beemdevelopment/Aegis/tags.atom", ["Software releases"]);
registerFeed("https://github.com/metrodroid/metrodroid/tags.atom", ["Software releases"]);

registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC0NmMkOa4wmjAPllHk681Pw", ["Japonais"]); // ちーたー.
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC1kk8pmQ3Rg5DZtwOrpFDMA", ["Japonais"]); // しょっぴん / SHOPPIN
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC4arQnli3ffEuCSrSgAD_Ug", ["Japonais"]); // Osho Taigu’s Heart of Buddha
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC59gHK7pW5W245V6ES9jQEQ", ["Japonais"]); // コジコジのオタク文化 情報局
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC_tt6_ndhner0y2KXTJG1sg", ["Japonais"]); // ナリヒサの趣味部屋はいぱー
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCWGl1JQoX90LM8hRuRbdFDA", ["Japonais"]); // 打首獄門同好会

registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC0cT8BZdFUmC0vgr1XS7aPA", ["Politique"]); // Tatiana Ventôse
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC3jSNmKWYA04R47fDcc1ImA", ["Technologie"]); // InfinitelyGalactic
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC59ZURfw529EQEE1gVUMSlw", ["Japonais"]); // Learn Japanese with Manga
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC5eOLQO5VUEFJukNg9cl5jg", ["Histoire"]); // Histoire Brève
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC5UAwBUum7CPN5buc-_N1Fw", ["Technologie"]); // The Linux Experiment
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC5X4e8ScZI2AFd_vkjSoyoQ", ["Science"]); // AstronoGeek
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC6107grRI4m0o2-emgoDnAA", ["Science"]); // SmarterEveryDay
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC7sXGI8p8PvKosLWagkK9wQ", ["Science"]); // Heu?reka
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC9hHeywcPBnLglqnQRaNShQ", ["Politique"]); // Le Fil d'Actu - Officiel
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC9NB2nXjNtRabu3YLPB16Hg", ["Politique"]); // J'suis pas content TV
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCaNlbnghtwlsGF-KzAFThqA", ["Science"]); // ScienceEtonnante
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCBa659QWEk1AI4Tg--mrJ2A", ["Science"]); // Tom Scott
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCbq4WwLfbhRxvyVYOTYU25g", ["Gaming"]); // UnDropDansLaMare
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCciXXqGRO99KPhhrcaRfG-w", ["Japonais"]); // BritVsJapan
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCcziTK2NKeWtWQ6kB5tmQ8Q", ["Science"]); // e-penser
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCeR8BYZS7IHYjk_9Mh5JgkA", ["Science"]); // Scilabus
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCGeFgMJfWclTWuPw8Ok5FUQ", ["Science"]); // horizon-gull
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCiaZZmZwBjKrcRv7aerHuyA"); // KEYVAN KHOJANDI
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC_i-uMpN1lEyuoUGDq-dajQ", ["Politique"]); // Le Raptor
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCiZCX1R1F3xYGbeXq1JscKA", ["Japonais"]); // VICE Japan
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCJ24N4O0bP7LGLBDvye7oCA", ["Japonais"]); // Matt D'Avella
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCjr2bPAyPV7t35MvcgT3W8Q", ["Technologie"]); // The Hated One
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UClaZ2KITbEWBjaUSELMwzvg", ["Politique"]); // Peno Tube
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCMFcMhePnH4onVHt2-ItPZw", ["Science"]); // Hygiène Mentale
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCnOuKKfBkvt2VsXcYSr8W2Q", ["Gaming"]); // Trxns
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCOchT7ZJ4TXe3stdLW1Sfxw", ["Science"]); // Dans Ton Corps
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCofQxJWd4qkqc7ZgaLkZfcw", ["Science"]); // Linguisticae
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCOuIgj0CYCXCvjWywjDbauw", ["Science"]); // Chat Sceptique
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCP46_MXP_WG_auH88FnfS1A", ["Histoire"]); // Nota Bene
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCpf4BknRWAjb_oYIHoMDGVg", ["Japonais"]); // Matt vs. Japan
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCq-8pBMM3I40QlrhM9ExXJQ", ["Science"]); // La Tronche en Biais
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCQFe3x4WAgm7joN5daMm5Ew", ["Japonais"]); // Yoga MIA
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCQgWpmt02UtJkyO32HGUASQ", ["Politique"]); // Thinkerview
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCqYPhGiB9tkShZorfgcL2lA", ["Science"]); // What I've Learned
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCsnGwSIHyoYN0kiINAGUKxg", ["Technologie"]); // Wolfgang's Channel
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCt8ctlakIflnSG0ebFps7cw", ["Histoire"]); // Histony
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCtqICqGbPSbTN09K1_7VZ3Q", ["Science"]); // DirtyBiology
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCtyONQLs6htK-wWiCAk4wVw", ["Politique"]); // le Stagirite
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCU0FhLr6fr7U9GOn6OiQHpQ", ["Science"]); // Officiel DEFAKATOR
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCu34Tq5qMR-FiTYwLyy9U6w", ["Technologie"]); // Webosaures
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCWYxQt9Y3y2CDzXLf2K7xCA", ["Science"]); // Lanterne Cosmique
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCyJDHgrsUKuWLe05GvC2lng", ["Science"]); // Stupid Economics
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCynFUJ4zUVuh3GX7bABTjGQ", ["Politique"]); // Trouble Fait
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UC_yP2DpIgs5Y1uWC0T03Chw", ["Gaming"]); // Joueur Du Grenier
registerFeed("https://www.youtube.com/feeds/videos.xml?channel_id=UCZxLew-WXWm5dhRZBgEFl-Q", ["Science"]); // Le Vortex

registerFeed("https://www.youtube.com/feeds/videos.xml?playlist_id=PL0H7ONNEUnnt59niYAZ07dFTi99u2L2n_", ["Politique"]); // Mediapart: Ouvrez les guillemets
registerFeed("https://www.youtube.com/feeds/videos.xml?playlist_id=PL43OynbWaTMLEbdAWr-DnAfveOonmhlT1", ["Politique"]); // France Inter: Guillaume Meurice
registerFeed("https://www.youtube.com/feeds/videos.xml?playlist_id=PLjwSYc73nX6ZJ1awW55THqUd-mcC0ghJR", ["Technologie"]); // Switched to Linux: Reclaiming Privacy

console.log("Loaded", JSON.stringify(feedsByTag));


for (var tag in feedsByTag) {
	console.log("link to tag " + tag)
	document.getElementById("tags").innerHTML += '<a onClick="loadFeeds(\'' + tag + '\')">' + tag + '</a>\n';
}
