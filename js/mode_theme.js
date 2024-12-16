let mode = "dark";

async function mode_load() {
	let modeIcon = document.getElementById("mode_icon");

	mode_switch_buttons = document.querySelectorAll('.mode_switch');
	mode_switch_buttons.forEach(function(btn) { btn.addEventListener('click', modeSwitchClick, false); });
	
	if(sessionStorage.getItem("mode") !== null) { 
	    mode = sessionStorage.getItem("mode"); 
	    let modeItems = document.querySelectorAll('[mode]');
	    for(i = 0; i < modeItems.length;i++) { 
		    modeItems[i].setAttribute("mode", mode);
		    sessionStorage.setItem("mode", mode);
	    }
		mode_buttons = document.querySelectorAll('.mode_icon');
		mode_buttons.forEach(function(btn) { 
			btn.setAttribute("icon", mode);
			btn.innerHTML = iconRender(mode);
		});
		
    }
}
		
function modeSwitchClick() {
	let modeItems = document.querySelectorAll('[mode]');
	let i = 0;
	modeIconList = document.querySelectorAll('.mode_icon');
		
	if(mode == "dark") { 
		mode = "light";
	} else { 
		mode = "dark";
	}
			
	for(i = 0; i < modeItems.length;i++) { 
		modeItems[i].setAttribute("mode", mode);
		sessionStorage.setItem("mode", mode);
	}
	
	modeIconList.forEach(function(btn) { 
		btn.setAttribute("icon", mode);
		btn.innerHTML = iconRender(mode);
	});
}