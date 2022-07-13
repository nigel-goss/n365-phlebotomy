const style = document.createElement("style");
document.head.appendChild(style);
style.textContent = `
	body { font-family:Arial; margin:0; color:#231F20; }
	table { border-collapse:collapse; width:100%; }
	tr { border-top:1px solid #768692; }
	tr:nth-child(odd) { background-color:#E8EDEE; }
	td { padding:1rem; }
`;

const d = {};
let slots = {};
	
$d.forEach(($v) => {

	if ($v.body.includes("Customer Info") === false) {
		return;
	}

	const dt = new Date($v.start).toLocaleString("en-GB", {day:"numeric", month:"short", year:"numeric", hour:"numeric", minute:"numeric"}).replace(",", "");

	if (d[dt] === undefined) {
		d[dt] = {};
	}

	const slot = $v.requiredAttendees.replace("thhPhlebotomyBloodTest+", "").replace("@nhs.onmicrosoft.com;", "");
	slots[slot] = null;
	
	const body = $v.body.replaceAll("\r\n", "").split("<br>");

	d[dt][slot] = body.find(($x) => { return $x.includes("Name:"); }).replace("Name: ", "");

});
	
const table = document.createElement("table");
document.body.appendChild(table);

slots = Object.keys(slots).sort();

Object.keys(d).forEach(($v) => {

	const tr = document.createElement("tr");
	table.appendChild(tr);

	let td = document.createElement("td");
	tr.appendChild(td);
	td.textContent = $v;

	slots.forEach(($v2) => {
		const td = document.createElement("td");
		tr.appendChild(td);
		td.textContent = d[$v][$v2];
	});
		
});
