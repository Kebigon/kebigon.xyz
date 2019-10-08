// YuzuRSS server to connect to
var url = 'http://5.39.83.109:8091/feed/';

// Parameters of the request to send to the YuzuRSS server
var data = {
	urls: [
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC0cT8BZdFUmC0vgr1XS7aPA", // Tatiana Ventôse
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC0NmMkOa4wmjAPllHk681Pw", // ちーたー.
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC1kk8pmQ3Rg5DZtwOrpFDMA", // しょっぴん / SHOPPIN
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC4arQnli3ffEuCSrSgAD_Ug", // Osho Taigu’s Heart of Buddha
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC59gHK7pW5W245V6ES9jQEQ", // コジコジのオタク文化 情報局
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC59ZURfw529EQEE1gVUMSlw", // Learn Japanese with Manga
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC5eOLQO5VUEFJukNg9cl5jg", // Histoire Brève
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC5UAwBUum7CPN5buc-_N1Fw", // The Linux Experiment
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC5X4e8ScZI2AFd_vkjSoyoQ", // AstronoGeek
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC6107grRI4m0o2-emgoDnAA", // SmarterEveryDay
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC7sXGI8p8PvKosLWagkK9wQ", // Heu?reka
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC9hHeywcPBnLglqnQRaNShQ", // Le Fil d'Actu - Officiel
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC9NB2nXjNtRabu3YLPB16Hg", // J'suis pas content TV
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCaNlbnghtwlsGF-KzAFThqA", // ScienceEtonnante
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCbq4WwLfbhRxvyVYOTYU25g", // UnDropDansLaMare
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCciXXqGRO99KPhhrcaRfG-w", // BritVsJapan
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCcziTK2NKeWtWQ6kB5tmQ8Q", // e-penser
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCeR8BYZS7IHYjk_9Mh5JgkA", // Scilabus
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCGeFgMJfWclTWuPw8Ok5FUQ", // horizon-gull
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCiaZZmZwBjKrcRv7aerHuyA", // KEYVAN KHOJANDI
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC_i-uMpN1lEyuoUGDq-dajQ", // Le Raptor
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCiZCX1R1F3xYGbeXq1JscKA", // VICE Japan
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCJ24N4O0bP7LGLBDvye7oCA", // Matt D'Avella
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCjr2bPAyPV7t35MvcgT3W8Q", // The Hated One
		"https://www.youtube.com/feeds/videos.xml?channel_id=UClaZ2KITbEWBjaUSELMwzvg", // Peno Tube
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCMFcMhePnH4onVHt2-ItPZw", // Hygiène Mentale
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCnOuKKfBkvt2VsXcYSr8W2Q", // Trxns
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCofQxJWd4qkqc7ZgaLkZfcw", // Linguisticae
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCP46_MXP_WG_auH88FnfS1A", // Nota Bene
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCpf4BknRWAjb_oYIHoMDGVg", // Matt vs. Japan
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCq-8pBMM3I40QlrhM9ExXJQ", // La Tronche en Biais
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCQFe3x4WAgm7joN5daMm5Ew", // Yoga MIA
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCQgWpmt02UtJkyO32HGUASQ", // Thinkerview
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCqYPhGiB9tkShZorfgcL2lA", // What I've Learned
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCt8ctlakIflnSG0ebFps7cw", // Histony
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCtqICqGbPSbTN09K1_7VZ3Q", // DirtyBiology
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC_tt6_ndhner0y2KXTJG1sg", // ナリヒサの趣味部屋はいぱー
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCtyONQLs6htK-wWiCAk4wVw", // le Stagirite
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCU0FhLr6fr7U9GOn6OiQHpQ", // Officiel DEFAKATOR
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCu34Tq5qMR-FiTYwLyy9U6w", // Webosaures
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCWGl1JQoX90LM8hRuRbdFDA", // 打首獄門同好会
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCyJDHgrsUKuWLe05GvC2lng", // Stupid Economics
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCynFUJ4zUVuh3GX7bABTjGQ", // Trouble Fait
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC_yP2DpIgs5Y1uWC0T03Chw", // Joueur Du Grenier

		"https://www.youtube.com/feeds/videos.xml?playlist_id=PL0H7ONNEUnnt59niYAZ07dFTi99u2L2n_", // Mediapart: Ouvrez les guillemets
		"https://www.youtube.com/feeds/videos.xml?playlist_id=PL43OynbWaTMLEbdAWr-DnAfveOonmhlT1", // France Inter: Guillaume Meurice
		"https://www.youtube.com/feeds/videos.xml?playlist_id=PLjwSYc73nX6ZJ1awW55THqUd-mcC0ghJR", // Switched to Linux: Reclaiming Privacy
	],
	limit: 21
}

var id = "videos-feed";

var options = { day: '2-digit' };

var request = new XMLHttpRequest();
request.onload = function () {
	try {
		var items = JSON.parse(request.responseText);

		document.getElementById(id).innerHTML = "";
		items.forEach(function (x) {
			var published = new Date(x.published).toLocaleDateString("fr-FR", options);
			var author = shorten(x.author, isJapanese(x.author) ? 12 : 20);
			var title = shorten(x.title, isJapanese(x.title) ? 42 : 69);

			var newItemHtml = '<tr><td>' + published + '</td><td>' + author + '</td><td><a href="' + x.link + '">' + title + '</a></td></tr>';
			document.getElementById(id).innerHTML += newItemHtml;
		});
	} catch (e) {
		return;
	}
}
request.open('POST', url, true);
request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
request.send(JSON.stringify(data));

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