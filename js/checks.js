function checklist_item_cross() {
	let i;
	let itemsList = document.getElementsByClassName('items');
	this.classList.add('items-done');
	this.querySelector(".state").classList.add('state-done');
	this.querySelector(".strike").style.opacity = "1";
		
	if(this.getBoundingClientRect().top > (screen.height *0.65)) { window.scroll({top: (this.getBoundingClientRect().top -10)  + window.scrollY, behavior: 'smooth'}); }
	
	for(i=0; i < itemsList.length; i++) { 
		itemsList[i].classList.remove('highlight');
	}

	let a = this.nextElementSibling;
	if(a !== null) { 
		if(this.nextElementSibling.classList.contains("items")) { 
			this.nextElementSibling.classList.add('highlight');
		} else { 
			this.nextElementSibling.nextElementSibling.classList.add('highlight'); 
		}
		if(this.nextElementSibling.classList.contains("comment")) { 
			this.nextElementSibling.classList.remove("highlight");
			this.nextElementSibling.classList.add("comment-strike");
		}
	}
	
	for(i=0; i < itemsList.length; i++) { 
		if(this.innerHTML == itemsList[i].innerHTML) { itemsList[i+1].classList.add('highlight'); break; } 
	}
}

function checklist_subcheckcross() { 
	let currentIndex = 0;
	let child = this.childNodes;
	let i;
		
	if(child.length > 0) { 
		for(i = 0; i < child.length; i++) {   
			if(child[i].classList.contains('items')) { 
				child[i].querySelector('.item').classList.add('items-done');
				child[i].querySelector('.state').classList.add('state-done');
				child[i].querySelector('.strike').style.opacity = "1";
				if(child[i].classList.contains('highlight')) { child[i].classList.remove('highlight'); }
			}
			if(i == child.length -1) { 
				window.scroll({top: (child[i].getBoundingClientRect().top -10)  + window.scrollY, behavior: 'smooth'});
			}
		}
		var itemList = document.querySelectorAll('.item');
	}
	
	for(i = 0; i < itemList.length; i++) { 
		if(!itemList[i].classList.contains('items-done')) { 
			itemList[i].parentNode.classList.add('highlight');
			break;
		}
	}
	
}

async function checklist_load_masterlist() { 
	const masterlist_obj = await fetch("lists/masterlist.json");
	let masterlist = await masterlist_obj.json();
	let i;
	for(i = 0; i < masterlist.checklist.length; i++) {
		checklist_display_title("checklists", masterlist.checklist[i].file, masterlist.checklist[i].name);
	}
}

function checklist_display_title(element_id, file, name) { 
	let element = document.getElementById(element_id);
	element.innerHTML += "- <a href='checklist.html?l=" + file + "' mode='dark'>" + name + "</a><br>";
}

function checklist_process() { 
	let touchstartX = 0;
	let touchendX = 0;
	let width = screen.width / 2;
	let itemsList = document.getElementsByClassName('items');
	let titlesList = document.getElementsByClassName('sublist');
	let itemHighlight = itemsList[0];
	itemHighlight.classList.add('highlight');

	for (var i = 0; i < itemsList.length; i++) {
		itemsList[i].addEventListener('click', checklist_item_cross, false);

		itemsList[i].addEventListener('touchstart', function(event) { touchstartX = event.changedTouches[0].screenX; });

		itemsList[i].addEventListener('touchend', function(event) { 
			touchendX = event.changedTouches[0].screenX;
			if(touchstartX > touchendX) {
				if( (touchstartX - touchendX) > width) { 
					this.querySelector(".state").classList.remove('state-done');
					this.querySelector(".strike").style.opacity = "0";
					for(i =0; i < itemsList.length; i++) { itemsList[i].classList.remove('highlight'); }
					this.classList.add('highlight');
					
					if(this.nextElementSibling.classList.contains("comment")) { 
						this.nextElementSibling.classList.add("highlight");
						this.nextElementSibling.classList.remove("comment-strike");
					}
				}
			}
		});
	}

	for (var i = 0; i < titlesList.length; i++) { titlesList[i].addEventListener('dblclick', checklist_subcheckcross, false); }
}

async function checklist_load_file(checklist_file) { 
	const checklist_obj = await fetch(checklist_file);
	let checklist = await checklist_obj.text();
  	let checklist_array = checklist.replace(/(\r\n|\n|\r)/gm, "|").split("|");
	checklist_load_items(checklist_array);
}

function checklist_load_items(array) {
	let i;
	let line_array;
	let c = 0;
	let l = array.length;
	let title_class = "title";
	let contentHTML = "";
	let title = "";
	let comment = "";
	
	for(i = 0; i < array.length; i++) { 
		line_array = array[i].split("=");
		if(!line_array[1]) {

			if(line_array[0].substring(0,2) !== "**") { 
				// Title / Subtitle / Credits // 
				title_class = "title";

				if(c > 0) { contentHTML += "</div>"; }
				if(c == 0) { title_class = "title green"; }
				if(c == (l-1)) { title_class = "title blue"; }
			
				title = line_array[0];
				title = title.split("--").join('');
			
				contentHTML += "<div class='sublist'>";
				contentHTML += "<div class='" + title_class + "' mode='dark'>" + title + "</div>";
			}

			if(line_array[0].substring(0,2) == "**") {
				// Comment // 
				comment = line_array[0];
				comment = comment.split("**").join('');
				contentHTML += "<div class='comment purple highlight' mode='dark'>" + comment + "</div>";
			}
			
		} else { 
			contentHTML += '<div class="items">';
			contentHTML += '<div class="strike" mode="dark"></div>';
			contentHTML += '<div class="item" mode="dark">' + line_array[0] +  '</div>';
			contentHTML += '<div class="state"mode="dark">'+ line_array[1] + '</div></div>';

		}
		c = c + 1;
	}
	content.innerHTML = contentHTML;
	checklist_process();
}

