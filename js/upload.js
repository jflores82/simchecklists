async function upload_load() { 
	await head_load();
	await include_file();
	await config_load();
	await upload_load_file();
	icao_load();
	scratch_load();
	writer_load();
	chrono_load();
}

function upload_load_file() { 
    let checklist = sessionStorage.getItem("form-data");
	//let checklist_array = checklist.split("\r\n");
	let checklist_array = checklist.replace(/(\r\n|\n|\r)/gm, "|").split("|");
    checklist_load_items(checklist_array);
}