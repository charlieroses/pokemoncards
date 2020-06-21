BEGIN {
	FS=","
	
	types["D"]  = "Dark"
	types["Dr"] = "Dragon" 
	types["E"]  = "Energy"
	types["El"] = "Electric" 
	types["F"]  = "Fire"
	types["Fa"] = "Fairy" 
	types["Fg"] = "Fighting" 
	types["G"]  = "Grass"
	types["I"]  = "Item"
	types["N"]  = "Normal"
	types["P"]  = "Poison"
	types["S"]  = "Stadium"
	types["Sl"] = "Steel" 
	types["Su"] = "Supporter"
	types["T"]  = "Trainer"
	types["W"]  = "Water"

	print "<table>"
}

NR > 1{
	num_td  = "<td class=\"setnum\">" $7 "</td>"
	rar_td  = "<td class=\"rarity\">" $4 "</td>"
	pkmn_td = "<td class=\"name\">" $2 "</td>"
	holo_td = "<td class=\"holofoil\">" $5 "</td>"
	info_td = "<td class=\"extrainfo\">" $6 "</td>"
	art_td  = "<td class=\"artist\">" $9 "</td>"

	if( $1 == "T" )
	{
		dex_td = "<td class=\"dex\">Trainer</td>"
		type_td = "<td class=\"" types[$3] "\">" types[$3] "</td>"
	}
	else
	{
		dex_td  = "<td class=\"dex\">" $1 "</td>"
		img = "./images/trainer/e" types[$3] ".png"
		type_td = "<td class=\"" types[$3] "\"><img src=\"" img "\"></td>"

	}

	print "<tr>" num_td rar_td dex_td pkmn_td type_td holo_td info_td art_td "</tr>"
}

END {
	print "</table>"
}
