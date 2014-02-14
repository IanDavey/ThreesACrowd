var domain = document.domain.match(/[^\.]+\.[^\.]+$/)[0];

function fromDomain(url) {
	return url.match(new RegExp("http://.+" + domain + "$")) ||
		!url.match(new RegExp("^(http:)?//"));
}

var attributes = [ "src", "code", "data" ];

var removeHref = [
	"a", "link"
].join(',');

var removeTextOnly = [
	"address", "article", "aside", "audio",
	"b", "bdi", "bdo", "big", "blockquote",
	"canvas", "caption", "center", "cite", "code", "col", "colgroup",
	"datalist", "dd", "del", "details", "dfn", "dir", "div", "dl", "dt",
	"em",
	"fieldset", "figcaption", "figure", "font", "footer", "frameset",
	"h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr",
	"i", "ins",
	"label", "legend", "li",
	"main", "map", "mark", "menu",
	"nav", "noframes", "noscript",
	"ol", "optgroup",
	"p", "pre",
	"q",
	"rp", "rt", "ruby",
	"s", "samp", "section", "small", "span", "strike", "strong", "sub", "summary", "sup",
	"table", "tbody", "td", "tfoot", "th", "thead", "time", "tr", "tt",
	"u", "ul",
	"var", "video"
].join(',') + "," + removeHref;

var removeExternal = [
	"applet", "embed", "frame", "img", "object", "source", "track"
].join(',');

var removeAll = [
	"abbr", "acronym", "area",
	"base" /* Maybe come back to this one */, "basefont", "br", "button",
	"command",
	"dialog",
	"form",
	"input",
	"keygen",
	"meta", "meter",
	"option",
	"progress",
	"select", "style",
	"textarea", "title",
	"wbr"
].join(',');

$(removeTextOnly).contents().filter(function() {
	return this.nodeType === 8;
}).remove();

$(removeTextOnly).contents().filter(function() {
	return this.nodeType === 3;
}).remove();

var empties = null;
while ((empties = $(removeTextOnly).filter(function() { return this.innerHTML.match(/^\s*$/); })).length) {
	empties.remove();
}

for (var idx in attributes) {
	$("[" + attributes[idx] + "]").filter(function() {
		return fromDomain(this.getAttribute(attributes[idx]));
	}).remove();
	$(removeExternal).not("[src]").remove();
}

$("[href]").filter(function() {
	return fromDomain(this.getAttribute("href"));
}).remove();

$(removeAll).remove();

$("[style]").each(function() {
	this.removeAttribute("style");
});
