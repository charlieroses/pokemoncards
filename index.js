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

	var tableStr = "<table>";
	tableStr += "<tr><th>Set Number</th><th>Rarity</th><th>Dex No</th><th>Pokemon</th><th>Type</th>";
	tableStr += "<th>HoloFoil</th><th>Extra Information</th><th>Artist</th><th>Price</th><th>Damaged</th></tr>";

	for(var i = 0; i < my_json.length; i++)
	{
		tableStr += "<tr>";
		tableStr += "<td>" + my_json[i]["Set No."] + "</td>";
		tableStr += "<td>" + my_json[i]["Rarity"] + "</td>";
		tableStr += "<td>" + my_json[i]["Pokedex"] + "</td>";
		tableStr += "<td>" + my_json[i]["Pokemon"] + "</td>";
		tableStr += "<td>" + my_json[i]["Type"] + "</td>";
		tableStr += "<td>" + my_json[i]["HoloFoil"] + "</td>";
		tableStr += "<td>" + my_json[i]["Rarity Extra"] + "</td>";
		tableStr += "<td>" + my_json[i]["Artist"] + "</td>";
		tableStr += "<td>" + my_json[i]["Price"] + "</td>";
		tableStr += "<td>" + my_json[i]["Damaged"] + "</td>";
		tableStr += "</tr>";
	}

	document.getElementById("setTable").innerHTML = tableStr;
}	
