const style = document.createElement("style");
document.head.appendChild(style);
style.textContent = `
	body { font-family:Arial; margin:0; color:#231F20; }
	table { border-collapse:collapse; width:100%; table-layout:fixed; }
	tr { border-top:1px solid #768692; }
	tr:nth-child(odd) { background-color:#E8EDEE; }
	th, td { padding:0.3rem; text-align:left; }
	td div:first-of-type { font-weight:bold; }
	div { padding:0.2rem; }
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

	let body = $v.body.replaceAll("Question 1- Who sent you for a blood test<br>\r\nAnswer-", "Referrer:");
	body = body.split("<br>\r\n");

	d[dt][slot] = [
		body.find(($x) => { return $x.includes("Name:"); }),
		body.find(($x) => { return $x.includes("Email:"); }),
		body.find(($x) => { return $x.includes("Referrer:"); }),
	];
	
});

slots = Object.keys(slots).sort();
	
const table = document.createElement("table");
document.body.appendChild(table);

const tr = document.createElement("tr");
table.appendChild(tr);

const th = document.createElement("th");
tr.appendChild(th);
th.textContent = "DateTime";

slots.forEach(($v) => {
	const th = document.createElement("th");
	tr.appendChild(th);
	th.textContent = $v;
});

Object.keys(d).forEach(($v) => {

	const tr = document.createElement("tr");
	table.appendChild(tr);

	const td = document.createElement("td");
	tr.appendChild(td);
	td.textContent = $v;

	slots.forEach(($v2) => {
		
		const td = document.createElement("td");
		tr.appendChild(td);

		d[$v][$v2].forEach(($v3) => {
			const div = document.createElement("div");
			td.appendChild(div);
			div.textContent = $v3;
		});
		
	});
		
});
