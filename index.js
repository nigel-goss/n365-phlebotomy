const style = document.createElement("style");
document.head.appendChild(style);
style.textContent = `
	body { font-family:Arial; }
	table { border-collapse:collapse; }
	tr:nth-child(odd) { background-color:lightgrey; border-top:1px solid grey;}
	td { padding:1rem; }

`;

const d = {};
	
$d.forEach(($v) => {

	if ($v.body.includes("Customer Info") === false) {
		return;
	}

	const dt = new Date($v.start).toLocaleString("en-GB", {day:"numeric", month:"short", year:"numeric", hour:"numeric", minute:"numeric"}).replace(",", "");

	if (d[dt] === undefined) {
		d[dt] = {};
	}

	const slot = $v.requiredAttendees.replace("thhPhlebotomyBloodTest+", "").replace("@nhs.onmicrosoft.com;", "")
	const body = $v.body.replaceAll("\r\n", "").split("<br>");

	d[dt][slot] = body.find(($x) => { return $x.includes("Name:"); }).replace("Name: ", "");

});
	
const table = document.createElement("table");
document.body.appendChild(table);

Object.keys(d).forEach(($v) => {

	const tr = document.createElement("tr");
	table.appendChild(tr);

	let td = document.createElement("td");
	tr.appendChild(td);
	td.textContent = $v;

	["01", "02", "03", "04", "05", "06", "07", "08"].forEach(($v2) => {
		const td = document.createElement("td");
		tr.appendChild(td);
		td.textContent = d[$v][$v2];
	});
		
});
