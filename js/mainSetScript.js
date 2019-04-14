function viewSet(setName)
{
	var filename = setName.toLowerCase();
	filename = filename.replace(/ /g, "");
	filename = filename.replace("/", "");
	
	var jsonURL = "https://charlierosec.github.io/pokemoncards/jsonFiles/" + filename + ".json";

	if(viewMenu["main"])
		toggleMenu();


	//////////////HEADER SETUP
	if( !viewMain["setPage"] )
	{
		viewMain["start"] = false;
		document.getElementById("cards").style.display = "none";
		viewMain["bsp"] = false;
		document.getElementById("bspTemplate").style.display = "none";	
		viewMain["setPage"] = true;
		document.getElementById("setTemplate").style.display = "block";
	}
	
	document.getElementById("setTitle").innerHTML = setName;
	
	document.getElementById("setImage").src = "images/sets/" + filename + ".png";


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

	
	var setinfo = (function () {
			var json = null;
			$.ajax({
				'async': false,
				'global': false,
				'url': "https://charlierosec.github.io/pokemoncards/jsonFiles/setsinfo.json",
				'dataType': "json",
				'success': function (data) {
					for( var i = 0; i < data.length; i++)
					{
						if(setName == data[i]["Name"])
						{
							json = data[i];
						}
					}
				}
			});
			return json;
	})();

	var titleImg = "images/sets/" + filename + "title.png";

	var titleExists = (function () {
		var theBool = false;
		$.ajax({
			'async': false,
			'global': false,
			'url': "https://charlierosec.github.io/pokemoncards/" + titleImg,
			'success': function () {
					theBool = true;
				}
		});
		return theBool;
	})();

	if (titleExists)
	{
		document.getElementById("setTitleImg").src = titleImg;
		document.getElementById("setTitleImg").style.display = "inline-block";
	}
	else
	{
		document.getElementById("setTitleImg").style.display = "none";
	}

	if (filename == "baseset1")
	{
		document.getElementById("setImage").style.display = "none";
	}
	else
	{
		document.getElementById("setImage").style.display = "inline-block";
	}

	var setInfoStr = "";
	setInfoStr += "<b>Series:</b> " + setinfo["Series"] + "<br>";
	setInfoStr += "<b>Year:</b> " + setinfo["Year"] + "<br>";
	setInfoStr += "<b>Set Number:</b> " + setinfo["Set Num"] + "<br>";
	setInfoStr += "<b>My Card Count:</b> " + my_json.length.toString() + "<br>";
	setInfoStr += "<b>Set Count:</b> " + setinfo["Set Count"] + "<br>";
	setInfoStr += "<b>Total Count:</b> " + setinfo["Total Cards"] + "<br>";
	var myperc = (my_json.length / parseFloat(setinfo["Total Cards"])) * 100;
	setInfoStr += "<b>Percentage Complete:</b> " + Math.trunc(myperc).toString() + "%";

	document.getElementById("setInfo").innerHTML = setInfoStr;


	//////////////////////TABLE SETUP
	var tableStr = "<table>";
	tableStr += "<tr id='tableheader'><th>Set Number</th><th>Rarity</th><th>Dex No</th><th>Pokemon</th><th>Type</th>";
	tableStr += "<th>HoloFoil</th><th>Extra Information</th><th>Artist</th><th>Price</th><th>Damaged</th><th>Date Recieved</th></tr>";

	for(var i = 0; i < my_json.length; i++)
	{
		tableStr += "<tr>";
		tableStr += "<td class='setnum'>" + my_json[i]["Set No."] + "</td>";
		tableStr += "<td class='rarity'>" + my_json[i]["Rarity"] + "</td>";
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

	if( my_json.length == 0)
	{
		tableStr = "<table>";
		tableStr += "<tr><th>Set Number</th><th>Dex No</th><th>Pokemon</th><th>Type</th>";
		tableStr += "<th>HoloFoil</th><th>Promo Source</th><th>Extra Information</th><th>Artist</th><th>Price</th><th>Damaged</th><th>Date Recieved</th></tr>";
		tableStr +="</table>";
	}

	document.getElementById("setTable").innerHTML = tableStr;
}


