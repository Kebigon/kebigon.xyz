// YuzuRSS server to connect to
var url = 'http://5.39.83.109:8091/feed/';

// Parameters of the request to send to the YuzuRSS server
var data = {
	urls: [
		// Politique / Société
		"https://www.youtube.com/feeds/videos.xml?user=AnalGenocide",                   // AnalGenocide
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCnIGrvSrQF7uCovnIm8LCSQ", // Demos Kratos
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC9NB2nXjNtRabu3YLPB16Hg", // J'suis pas content TV
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC9hHeywcPBnLglqnQRaNShQ", // Le Fil d'Actu - Officiel
		"https://www.youtube.com/feeds/videos.xml?user=LeStagirite",                    // le Stagirite
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC0cT8BZdFUmC0vgr1XS7aPA", // Tatiana Ventôse
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCynFUJ4zUVuh3GX7bABTjGQ", // Trouble Fait
		// Style de vie
		"https://www.youtube.com/feeds/videos.xml?user=blackboxfilmcompany",            // Matt D'Avella
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC1kk8pmQ3Rg5DZtwOrpFDMA", // しょっぴん / SHOPPIN
		// Science
		"https://www.youtube.com/feeds/videos.xml?user=dirtybiology",                   // DirtyBiology
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCcziTK2NKeWtWQ6kB5tmQ8Q", // e-penser
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCqYPhGiB9tkShZorfgcL2lA", // What I've Learned
		// Zetetique
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCU0FhLr6fr7U9GOn6OiQHpQ", // Officiel DEFAKATOR
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCq-8pBMM3I40QlrhM9ExXJQ", // La Tronche en Biais
		// MIA
		"https://www.youtube.com/feeds/videos.xml?user=MATTvsJapan",                    // Matt vs. Japan
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCciXXqGRO99KPhhrcaRfG-w", // BritVsJapan
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCQFe3x4WAgm7joN5daMm5Ew", // Yoga MIA
		// Technology / Linux
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCjr2bPAyPV7t35MvcgT3W8Q", // The Hated One
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC5UAwBUum7CPN5buc-_N1Fw", // The Linux Experiment

		"https://www.youtube.com/feeds/videos.xml?channel_id=UCnOuKKfBkvt2VsXcYSr8W2Q", // Trxns
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC4arQnli3ffEuCSrSgAD_Ug", // Osho Taigu’s Heart of Buddha
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCWGl1JQoX90LM8hRuRbdFDA", // 打首獄門同好会
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC59ZURfw529EQEE1gVUMSlw", // Learn Japanese with Manga
		"https://www.youtube.com/feeds/videos.xml?user=VICEjpch",                       // VICE Japan
		"https://www.youtube.com/feeds/videos.xml?channel_id=UC0NmMkOa4wmjAPllHk681Pw", // ちーたー.
		"https://www.youtube.com/feeds/videos.xml?user=ogawanarihisa48222",             // ナリヒサの趣味部屋はいぱー
		"https://www.youtube.com/feeds/videos.xml?user=kojikojibroadcast",              // コジコジのオタク文化 情報局
	],
	limit: 10
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