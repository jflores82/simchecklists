async function include_file() {
	let include_elements = document.getElementsByTagName("include");
	let include_filename = "";
	let include_obj;
	let i;
	for(i = 0; i < include_elements.length; i++) {
		include_filename = include_elements[i].getAttribute("file");
		include_obj = await fetch(include_filename);
		include_html = await include_obj.text();
		include_elements[i].innerHTML = include_html;
		iconProcess();
	}
}

async function head_load() {
	const head_obj = await fetch("inc/_head.html");
	let include_head = await head_obj.text();
	document.head.innerHTML = include_head;
}

function getVariable(varname) {
	let params = new URLSearchParams(window.location.search);
	let value = params.get(varname);
	return value;
}

function iconRender(icon) { 
	let svg;
	switch(icon) { 
		case "refresh":
			svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon" mode="dark"><path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"/></svg>';
			break;
		case "back":
			svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon" mode="dark"><path d="M760-200v-160q0-50-35-85t-85-35H273l144 144-57 56-240-240 240-240 57 56-144 144h367q83 0 141.5 58.5T840-360v160h-80Z"/></svg>';
			break;
		case "icao":
			svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon" mode="dark"><path d="M120-120v-80h720v80H120Zm74-200L80-514l62-12 70 62 192-52-162-274 78-24 274 246 200-54q32-9 58 12t26 56q0 22-13.5 39T830-492L194-320Z"/></svg>';
			break;
		case "canvas":
			svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon" mode="dark"><path d="m499-287 335-335-52-52-335 335 52 52Zm-261 87q-100-5-149-42T40-349q0-65 53.5-105.5T242-503q39-3 58.5-12.5T320-542q0-26-29.5-39T193-600l7-80q103 8 151.5 41.5T400-542q0 53-38.5 83T248-423q-64 5-96 23.5T120-349q0 35 28 50.5t94 18.5l-4 80Zm280 7L353-358l382-382q20-20 47.5-20t47.5 20l70 70q20 20 20 47.5T900-575L518-193Zm-159 33q-17 4-30-9t-9-30l33-159 165 165-159 33Z"/></svg>';
			break;
		case "close":
			svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon-inner" mode="dark"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';
			break;
		case "writer":
			svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon" mode="dark"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h440l200 200v440q0 33-23.5 56.5T760-120H200Zm0-80h560v-400H600v-160H200v560Zm80-80h400v-80H280v80Zm0-320h200v-80H280v80Zm0 160h400v-80H280v80Zm-80-320v160-160 560-560Z"/></svg>';
			break;
		case "chrono":
			svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon" mode="dark"><path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z"/></svg>';
			break;
		case "light":
			svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>';
			break;
		case "dark":
			svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>';
			break;
	}
	return svg;
}

function iconProcess() {
	let insList = document.getElementsByTagName("ins");
	let i;
	let iconName;
	let icon;
					
	for(i = 0; i < insList.length; i++) {
		iconName = insList[i].getAttribute("icon");
		icon = iconRender(iconName);
		insList[i].innerHTML = icon;
	}
}

async function first_load() { 
	await head_load();
	await include_file();
	await config_load();
	await checklist_load_file(checklist_file);
	icao_load();
	scratch_load();
	writer_load();
	chrono_load();
	mode_load();
}

async function index_load() {
	await head_load();
	await checklist_load_masterlist();
	await include_file();
	await config_load();
}

async function config_load() {
	let config_elements = [...document.getElementsByTagName("config")];
	let config_filename = "inc/config.json";
	let config_obj = await fetch(config_filename);
	
	let config_json = await config_obj.json();
		
	for(var i = 0; i < config_elements.length ; i++) {
		config_attr = config_elements[i].getAttribute("param");
		config_elements[i].innerHTML = config_json[config_attr];
		document.title = config_json['title'];
	}
}

async function index_upload_load() { 
	const form = document.querySelector('form');
	form.addEventListener('submit', handleSubmit, false);

	function handleSubmit(event) {
  		const [file] = document.querySelector("input[type=file]").files;
  		const reader = new FileReader();

  		reader.addEventListener( "load",
    		() => { sessionStorage.setItem("form-data", reader.result);	}, false,
  		);

  		if (file) { reader.readAsText(file); }
	}
}