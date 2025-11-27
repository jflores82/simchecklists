function toggleItemState(item, markDone) {
	let itemEl = item.querySelector('.item');
	let stateEl = item.querySelector('.state');
	let strikeEl = item.querySelector('.strike');
	
	item.classList.toggle('items-done', markDone);
	itemEl.classList.toggle('items-done', markDone);
	stateEl.classList.toggle('state-done', markDone);
	strikeEl.style.opacity = markDone ? "1" : "0";
}

function checklist_item_cross() {
	let itemsList = document.getElementsByClassName('items');
	let isDone = this.classList.contains('items-done');
	
	// Clear all highlights
	Array.from(itemsList).forEach(item => item.classList.remove('highlight'));
	
	// Toggle this item
	toggleItemState(this, !isDone);
	
	// If unchecking, highlight this item and return
	if(isDone) {
		this.classList.add('highlight');
		return;
	}
	
	// Scroll if needed
	if(this.getBoundingClientRect().top > screen.height * 0.65) {
		window.scroll({top: this.getBoundingClientRect().top - 10 + window.scrollY, behavior: 'smooth'});
	}
	
	// Highlight next item
	let next = this.nextElementSibling;
	if(next) {
		if(next.classList.contains('items')) {
			next.classList.add('highlight');
		} else if(next.classList.contains('comment')) {
			next.classList.add('comment-strike');
			if(next.nextElementSibling) next.nextElementSibling.classList.add('highlight');
		}
	}
}

function checklist_subcheckcross(event) {
	// Only trigger if double-clicking on the title itself, not child items
	if(event.target.classList.contains('items') || event.target.closest('.items')) {
		return;
	}
	
	// Get all item children
	let items = Array.from(this.querySelectorAll('.items'));
	if(items.length === 0) return;
	
	// Determine if we should mark done (if ANY are unchecked)
	let shouldMarkDone = items.some(item => !item.classList.contains('items-done'));
	
	// Toggle all items
	items.forEach(item => {
		item.classList.remove('highlight');
		toggleItemState(item, shouldMarkDone);
	});
	
	// Scroll to appropriate position
	let scrollTarget = shouldMarkDone ? items[items.length - 1] : items[0];
	window.scroll({top: scrollTarget.getBoundingClientRect().top - 10 + window.scrollY, behavior: 'smooth'});
	
	// Highlight first unchecked item
	let allItems = document.querySelectorAll('.item');
	for(let item of allItems) {
		if(!item.classList.contains('items-done')) {
			item.parentNode.classList.add('highlight');
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
					
					if(this.nextElementSibling && this.nextElementSibling.classList.contains("comment")) { 
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

