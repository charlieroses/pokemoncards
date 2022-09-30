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

	rarity[0] = "norarity.ong"
	rarity[1] = "common.png"
	rarity[2] = "uncommon.png"
	rarity[3] = "rare.png"
	rarity[4] = "promo.png"
	rarity[5] = "superrare.png"
	rarity[6] = "amazing.png"

	print "<table>"
	print "<tr><th>Year</th><th>Set</th><th>Set Number</th><th>Dex</th><th>Pokemon</th><th>Type</th><th>Holo</th><th>Other</th><th>Artist</th></tr>"
}

NR > 1{
	year_td = "<td>" substr($8, 3, 4) "</td>"
	set_td  = "<td class=\"set\"><img src=\"images/mcdonalds/" $8 ".png\"></td>"
	num_td  = "<td class=\"setnum\">" $7 "</td>"
	pkmn_td = "<td class=\"name\">" $2 "</td>"
	holo_td = "<td class=\"holofoil\">" $5 "</td>"
	info_td = "<td class=\"extrainfo\">" gensub("/", "<br>", "g", $6) "</td>"
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
		type_td = "<td class=\"" types[$3] "\"><img src=\"" img "\" alt=\"" types[$3] "\"></td>"

	}

	print "<tr>" year_td set_td num_td dex_td pkmn_td type_td holo_td info_td art_td "</tr>"
}

END {
	print "</table>"
}
