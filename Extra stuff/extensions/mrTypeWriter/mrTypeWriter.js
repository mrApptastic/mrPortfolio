var mrTypeWriter = function (elem, text, settings) {
	var type = this;
	type.elem = document.getElementById(elem);
	type.text = (typeof text === "object") ? text : new Array(text.toString());
	type.settings = {
		"Time" : (settings && settings.Time ? settings.Time : 2000),
		"ElementType" : settings && settings.ElementType ? settings.ElementType : "div"		
	} 
	type.stringIndex = 0;
	type.bo = setInterval(function() {
		if (type.stringIndex < type.text.length) {
			type.writeToIb(type.text[type.stringIndex], type.stringIndex, (type.settings.Time / type.text.length));
			type.stringIndex++;
		}
		else {
			clearInterval(type.bo);
		}
	}, (type.settings.Time / type.text.length));
	type.writeToIb = function (theString, strIndex, strTime) {
		var index = 0;
		var time = strTime / theString.length;
		type.elem.innerHTML += "<" + type.settings.ElementType + " class='typeBandit'></" + type.settings.ElementType + ">";
		var ib = setInterval(function () {
			if (index < theString.length) {
				type.elem.getElementsByClassName("typeBandit")[strIndex].innerHTML += theString.charAt(index);
				index++;
			}
			else {
				clearInterval(ib);
			}
		}, time);	
	}
};