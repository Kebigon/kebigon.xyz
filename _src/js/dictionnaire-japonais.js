var data = [];
var idx = [];

function loadDataBuildIndex() {
	loadData(buildIndex);
}

function loadDataIndex() {
	loadData(loadIndex);
}

function loadData(callback) {
	disableLoadButtons();
	loadFile("dictionnaire-japonais.zz", function (result) { data = result; callback(); });
}

function loadIndex() {
	loadFile("dictionnaire-japonais-index.zz", function (result) {
		printStatus("Chargement de l'index...");
		idx = lunr.Index.load(result)
		enableSearch();
		printStatus("Prêt.");
	});
}

function buildIndex() {
	printStatus("Construction de l'index...");
	idx = lunr(function () {
		this.use(lunr.multiLanguage('fr', 'ja'))
		this.ref('id')
		this.field('j')
		this.field('k')
		this.field('f')

		data.forEach(function (doc) {
			this.add(doc)
		}, this)
	});
	enableSearch();
	printStatus("Prêt.");
}

function disableLoadButtons() {
	document.getElementById("btn-loadDataBuildIndex").disabled = true;
	document.getElementById("btn-loadDataLoadIndex").disabled = true;
}

function enableSearch() {
	document.getElementById("keywords").disabled = false;
	document.getElementById("submit").disabled = false;
}


function enableButton(button) {
	button.disabled = false;
}

function printStatus(message) {
	document.getElementById("status").innerHTML = message; // TODO: use web workers to avoid DOM not rendering...
}

function loadFile(file, callback) {
	var req = new XMLHttpRequest();
	req.overrideMimeType("application/octet-stream");
	req.responseType = "arraybuffer";
	req.open("GET", baseurl + "/generated/" + file, true);
	req.onload = function () {
		printStatus(file + " téléchargé.");
		callback(JSON.parse(new TextDecoder("utf-8").decode(pako.inflate(new Uint8Array(req.response)))));
	}
	req.send();
	printStatus("Téléchargement de " + file + "...");
}


function search() {
	// Clear previous results
	var searchResults = document.getElementById("search-results");
	searchResults.innerHTML = "";

	var keywords = document.getElementById("keywords").value;
	var results = idx.search(keywords);

	// No results
	if (results.length == 0) {
		searchResults.innerHTML = '<tr><td colspan="4">Aucun resultat</td></tr>';
		return;
	}

	var refs = results.map(function (result) { return parseInt(result.ref) });

	var found = data.filter(function (word) {
		return refs.indexOf(word.id) != -1;
	});

	found.forEach(function (word) {
		word.score = results.find(function (result) { return result.ref == word.id }).score;
	});

	// Sort by (score, length, id)
	found.sort(function (a, b) {
		if (b.score != a.score) return b.score - a.score; // Highest score
		else if (b.j.length != a.j.length) return a.j.length - b.j.length; // Shortest Japanese word
		else return a.id - b.id; // Smallest id
	});

	found.forEach(function (word) {
		var tr = searchResults.appendChild(document.createElement("tr"));

		var a = tr.appendChild(document.createElement("td")).appendChild(document.createElement("a"));
		a.setAttribute("href", "http://www.dictionnaire-japonais.com/w/" + word.id + "/" + word.jp);
		a.innerHTML = "#";

		tr.appendChild(document.createElement("td")).innerHTML = "<ruby><rb>" + word.j + "</rb><rt>" + word.k + "</rt></ruby>";
		tr.appendChild(document.createElement("td")).innerHTML = word.f;
	});
}
