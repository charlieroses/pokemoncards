function viewOther(setName)
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
	var my_json = (function () {
			var json = [];
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

	var bspinfo = (function () {
			var json = null;
			$.ajax({
				'async': false,
				'global': false,
				'url': "https://charlierosec.github.io/pokemoncards/jsonFiles/otherinfo.json",
				'dataType': "json",
				'success': function (data) {
					for( var i = 0; i < data.length; i++)
					{
						if(setName == data[i]["Set"])
						{
							json = data[i];
						}
					}
				},
				"error": function() {
					window.alert("HALP");
				}
			});
			return json;
	})();

	var bspInfoStr = "";
	bspInfoStr += "<b>Year:</b> " + bspinfo["Year"] + "<br>";
	bspInfoStr += "<b>My Card Count:</b> " + my_json.length + "<br>";
	bspInfoStr += "<b>Card Count:</b> " + bspinfo["Total Cards"] + "<br>";
	var myperc = (my_json.length / parseFloat(bspinfo["Total Cards"])) * 100;
	bspInfoStr += "<b>Percentage Complete:</b> " + Math.trunc(myperc).toString() + "%<br>";
	bspInfoStr += bspinfo["About"];


	document.getElementById("setInfo").innerHTML = bspInfoStr;
	document.getElementById("setImage").style.display = "none";
	document.getElementById("setTitleImg").style.display = "none";


	if(setName == "PokeTrivia")
		makeTriviaTable(my_json);
	else if(setName == "Topps Chrome")
		makeTCTable(my_json);
}

function makeTriviaTable(my_json)
{
	var tableStr = "<table>";
	tableStr += "<tr id='tableheader'><th>Dex No</th><th>Pokemon</th><th>Movie Scene</th>";
	tableStr += "<th colspan='2'>Trivia</th><th>Price</th></tr>";

	for(var i = 0; i < my_json.length; i++)
	{
		tableStr += "<tr>";
		tableStr += "<td class='dex'>" + my_json[i]["Pokedex"] + "</td>";
		tableStr += "<td class='name'>" + my_json[i]["Pokemon"] + "</td>";
		tableStr += "<td class='movie'>" + my_json[i]["Movie Scene"] + "</td>";
		tableStr += "<td class='xtrainfo'>" + my_json[i]["Question"] + "</td>";
		tableStr += "<td class='xtrainfo'>" + my_json[i]["Answer"] + "</td>";
		tableStr += "<td class='price'>" + my_json[i]["Price"] + "</td>";
		tableStr += "</tr>";

	}
	tableStr += "</table>"

	document.getElementById("setTable").innerHTML = tableStr;

}

function makeTCTable(my_json)
{
	var tableStr = "<table>";
	tableStr += "<tr id='tableheader'><th>Dex No</th><th>Pokemon</th>";
	tableStr += "<th>Series</th><th>Price</th></tr>";

	for(var i = 0; i < my_json.length; i++)
	{
		tableStr += "<tr>";
		tableStr += "<td class='dex'>" + my_json[i]["Pokedex"] + "</td>";
		tableStr += "<td class='name'>" + my_json[i]["Pokemon"] + "</td>";
		tableStr += "<td class='xtrainfo'>" + my_json[i]["Series"] + "</td>";
		tableStr += "<td class='price'>" + my_json[i]["Price"] + "</td>";
		tableStr += "</tr>";

	}
	tableStr += "</table>"

	document.getElementById("setTable").innerHTML = tableStr;

}
