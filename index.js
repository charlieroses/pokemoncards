var viewMenu = {
		"main"		: false,
		"sets"		: false,
		"halfdecks" : false,
		"promo"		: false,
		"pop"		: false,
		"blackstar" : false,
		"sort"		: false,
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
	document.getElementById("cardTitle").innerHTML = setName;
	if(viewMenu["main"])
		toggleMenu();

}
