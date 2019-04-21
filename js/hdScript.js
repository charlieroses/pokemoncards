//Half Decks uses the same template as Black Star Promo

var hdNames = {
	"AR"   : "Alolan Raichu",
	"B"    : "Bisharp",
	"E"    : "Excadrill",
	"G"    : "Gyarados",
	"La"   : "Latias",
	"Lo"   : "Latios",
	"L"    : "Lucario",
	"Ly"   : "Lycanroc",
	"Ma"   : "Manaphy",
	"M"    : "Minun",
	"N"    : "Noivern",
	"PL"   : "Pikachu Libre",
	"P"    : "Plusle",
	"R"    : "Raichu",
	"Su"   : "Suicune",
	"S"    : "Sylveon",
	"W"    : "Wigglytuff",
	"XYLa" : "XY Latias",
	"XYLo" : "XY Latios",
	"Z"    : "Zoroark"
};



function viewHD(deckName)
{
	
	if(viewMenu["main"])
		toggleMenu();

	if( !viewMain["setPage"] )
	{
		viewMain["start"] = false;
		document.getElementById("cards").style.display = "none";
		viewMain["setPage"] = true;
		document.getElementById("setTemplate").style.display = "block";
	}
	
	document.getElementById("setTitle").innerHTML = hdNames[deckName];
	
	var my_json = (function () {
			var json = [];
			$.ajax({
				'async': false,
				'global': false,
				'url': "https://charlierosec.github.io/pokemoncards/jsonFiles/halfdecks.json",
				'dataType': "json",
				'success': function (data) {
					for( var i = 0; i < data.length; i++)
					{
						if(deckName == data[i]["Set"])
						{
							json.push(data[i]);
						}
					}
				}
			});
			return json;
	})();

	var bspinfo = (function () {
			var json = null;
			$.ajax({
				'async': false,
				'global': false,
				'url': "https://charlierosec.github.io/pokemoncards/jsonFiles/halfdeckinfo.json",
				'dataType': "json",
				'success': function (data) {
					for( var i = 0; i < data.length; i++)
					{
						if(hdNames[deckName] == data[i]["Half Deck"])
						{
							json = data[i];
						}
					}
				}
			});
			return json;
	})();

	var bspInfoStr = "";
	bspInfoStr += "<b>Kit:</b> " + bspinfo["Kit"] + "<br>";
	bspInfoStr += "<b>Year:</b> " + bspinfo["Year"] + "<br>";
	bspInfoStr += "<b>My Card Count:</b> " + my_json.length + "<br>";
	bspInfoStr += "<b>Card Count:</b> " + bspinfo["Total Cards"] + "<br>";
	var myperc = (my_json.length / parseFloat(bspinfo["Total Cards"])) * 100;
	bspInfoStr += "<b>Percentage Complete:</b> " + Math.trunc(myperc).toString() + "%";

	document.getElementById("setInfo").innerHTML = bspInfoStr;

	var imgUrl = "./images/halfdecks/" + hdNames[deckName].replace(/ /g,"").toLowerCase() + "halfdeck.png";
	document.getElementById("setImage").src = imgUrl; 
	document.getElementById("setTitleImg").style.display = "none";

	//////////////////////TABLE SETUP		
	var tableStr = "<table>";
	tableStr += "<tr id='tableheader'><th>Set Number</th><th>Dex No</th><th>Pokemon</th><th>Type</th>";
	tableStr += "<th>HoloFoil</th><th>Extra Information</th><th>Artist</th><th>Price</th><th>Damaged</th><th>Date Recieved</th></tr>";

	for(var i = 0; i < my_json.length; i++)
	{
		tableStr += "<tr>";
		tableStr += "<td class='setnum'>" + my_json[i]["Set No."] + "</td>";
		tableStr += "<td class='dex'>" + my_json[i]["Pokedex"] + "</td>";
		tableStr += "<td class='name'>" + my_json[i]["Pokemon"] + "</td>";
	
		cardType = my_json[i]["Type"];

		if( my_json[i]["Pokedex"] == "T" )
		{
			tableStr += "<td class=" + types[cardType] + ">" + types[cardType] + "</td>";
		}
		else
		{
			imgSRC = "./images/trainer/e" + types[cardType] + ".png"
			tableStr += "<td class=\"" + types[cardType] + "\"><img src='" + imgSRC + "'></td>";
		}

		tableStr += "<td class='holofoil'>" + my_json[i]["HoloFoil"] + "</td>";
		tableStr += "<td class='xtrainfo'>" + my_json[i]["Rarity Extra"] + "</td>";
		tableStr += "<td class='artist'>" + my_json[i]["Artist"] + "</td>";
		tableStr += "<td class='price'>" + my_json[i]["Price"] + "</td>";
		tableStr += "<td class='damage'>" + my_json[i]["Damaged"] + "</td>";
		tableStr += "<td class='date'>" + my_json[i]["Date"] + "</td>";
		tableStr += "</tr>";

	}
	tableStr += "</table>";

	document.getElementById("setTable").innerHTML = tableStr;
}
