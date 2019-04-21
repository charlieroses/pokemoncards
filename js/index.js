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
	"start"  : true,
	"setPage": false,
};

var types = {
	"D"  : "Dark",
	"Dr" : "Dragon",
	"E"  : "Energy",
	"El" : "Electric",
	"F"  : "Fire",
	"Fa" : "Fairy",
	"Fg" : "Fighting",
	"G"  : "Grass",
	"I"  : "Item",
	"N"  : "Normal",
	"P"  : "Poison",
	"S"  : "Stadium",
	"Sl" : "Steel",
	"Su" : "Supporter",
	"T"  : "Trainer",
	"W"  : "Water",
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
		document.getElementById(tabID).style.display = "none";
		document.getElementById(tabID + "P").innerHTML = "&#9660;";
	}
	else
	{
		document.getElementById(tabID).style.display = "block";
		document.getElementById(tabID + "P").innerHTML = "&#9650;";
	}

	viewMenu[tabID] = !( viewMenu[tabID] );
}

