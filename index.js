var viewMenu = {
		"main"		: false,
		"sets"		: false,
		"halfdecks" : false,
		"promo"		: false,
		"pop"		: false,
		"blackstar" : false,
		"sort"		: false,
};

var viewMain = {
	start : true,
	setPage: false
};

function init()
{
    pass;
}

function toggleMenu()
{
	if (viewMenu["main"])
	{
		document.getElementById("menu").style.width = "80px";	
	}
	else
	{
		document.getElementById("menu").style.width = "460px";
	}
	
	viewMenu["main"] = !( viewMenu["main"] );
}

function toggleTab(tabID)
{
	if (viewMenu[tabID])
	{
		document.getElementById(tabID).style.height = "0";
		document.getElementById(tabID + "P").innerHTML = "&#9660;";
	}
	else
	{
		document.getElementById(tabID).style.height = "100%";
		document.getElementById(tabID + "P").innerHTML = "&#9650;";
	}

	viewMenu[tabID] = !( viewMenu[tabID] );
}

function viewSet(setName)
{
	var filename = setName.toLowerCase();
	filename = filename.replace(/ /g, "");
	filename = filename.replace("/", "");
	
	var jsonURL = "https://charlierosec.github.io/pokemoncards/jsonFiles/" + filename + ".json";

	if(viewMenu["main"])
		toggleMenu();

	if( !viewMain["setPage"] )
	{
		viewMain["start"] = false;
		document.getElementById("cards").style.display = "none";
		viewMain["setPage"] = true;
		document.getElementById("setTemplate").style.display = "block";
	}
	
	document.getElementById("setTitle").innerHTML = setName;
	document.getElementById("setImage").src = "images/sets/" + filename + ".png"
		
	var my_json = (function () {
			var json = null;
			$.ajax({
				'async': false,
				'global': false,
				'url': jsonURL,
				'dataType': "json",
				'success': function (data) {
					json = data;
				}
			});
			return json;
	})();

	window.alert(my_json[0]);
}	
	
function createHTML(json)
{
	window.alert(json);
}
